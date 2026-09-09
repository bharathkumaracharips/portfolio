"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { blockchainExperienceBlocks, BlockchainExperienceBlock } from "@/data/experience";

export interface BlockchainCanvasInspectionState {
  blockIndex: number;
  stageIndex: number; // 1: Block/Time, 2: Org/Role, 3: Duration/Location, 4: Narrative, 5: Stack
  isFinalized: boolean;
  isOverview: boolean;
  stageProgress: number;
}

interface BlockchainExperienceCanvasProps {
  scrollProgress?: number;
  onInspectionChange?: (state: BlockchainCanvasInspectionState) => void;
}

export function BlockchainExperienceCanvas({
  scrollProgress = 0,
  onInspectionChange,
}: BlockchainExperienceCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<number>(0);
  const onInspectionChangeRef = useRef(onInspectionChange);

  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    onInspectionChangeRef.current = onInspectionChange;
  }, [onInspectionChange]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let reqId: number;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. THREE.JS SCENE SETUP
    const scene = new THREE.Scene();

    const isMobile = width < 768;
    const camera = new THREE.PerspectiveCamera(isMobile ? 48 : 36, width / height, 0.1, 1000);
    camera.position.set(0, 0.2, 7.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    container.appendChild(renderer.domElement);

    // 2. STUDIO LIGHTING RIG
    const ambientLight = new THREE.AmbientLight(0xe2e8f0, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.4);
    keyLight.position.set(10, 18, 14);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 2.0);
    fillLight.position.set(-12, 10, 12);
    scene.add(fillLight);

    const cyanGlowLight = new THREE.DirectionalLight(0x00f0ff, 2.2);
    cyanGlowLight.position.set(0, -8, 12);
    scene.add(cyanGlowLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 2.8);
    rimLight.position.set(0, 20, -18);
    scene.add(rimLight);

    // Subtle background cyber grid plane (atmospheric ground depth)
    const gridHelper = new THREE.GridHelper(80, 40, 0x00f0ff, 0x1e293b);
    gridHelper.position.set(15, -4.5, -4);
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.18;
    scene.add(gridHelper);

    // 3. MASTER MATERIALS
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x0d131f,
      roughness: 0.28,
      metalness: 0.92,
      envMapIntensity: 1.5,
    });

    const activePinnacleChassisMat = new THREE.MeshStandardMaterial({
      color: 0x0c1a2e,
      roughness: 0.22,
      metalness: 0.95,
      emissive: 0x003b5c,
      emissiveIntensity: 0.35,
    });

    const strataPlateMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.35,
      metalness: 0.85,
    });

    const titaniumConduitMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.15,
      metalness: 0.95,
    });

    const cyanLaserMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
    });

    const pulseEnergyMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.9,
    });

    // 4. BLOCK CONFIG & DIMENSIONS
    const BLOCK_SPACING = 7.5;
    const NUM_BLOCKS = blockchainExperienceBlocks.length; // 5
    const BLOCK_WIDTH = 2.8;
    const BLOCK_HEIGHT = 2.0;
    const BLOCK_DEPTH = 0.8;

    // Helper: Rounded Box Extrusion for Precision Hardware Chassis
    function createBeveledBlockGeometry(w: number, h: number, d: number, radius: number = 0.16): THREE.BufferGeometry {
      const shape = new THREE.Shape();
      const halfW = w / 2 - radius;
      const halfH = h / 2 - radius;
      shape.absarc(halfW, halfH, radius, 0, Math.PI / 2, false);
      shape.absarc(-halfW, halfH, radius, Math.PI / 2, Math.PI, false);
      shape.absarc(-halfW, -halfH, radius, Math.PI, Math.PI * (3 / 2), false);
      shape.absarc(halfW, -halfH, radius, Math.PI * (3 / 2), Math.PI * 2, false);

      const extrudeSettings = {
        depth: d - radius * 2,
        bevelEnabled: true,
        bevelSegments: 6,
        steps: 1,
        bevelSize: radius,
        bevelThickness: radius,
      };

      const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geo.center();
      geo.computeVertexNormals();
      return geo;
    }

    const blockChassisGeo = createBeveledBlockGeometry(BLOCK_WIDTH, BLOCK_HEIGHT, BLOCK_DEPTH, 0.14);

    // Helper: Front Silicon/Sapphire Computational Face Texture
    function createApertureTexture(block: BlockchainExperienceBlock): THREE.CanvasTexture {
      const canvas = document.createElement("canvas");
      canvas.width = 1024;
      canvas.height = 720;
      const ctx = canvas.getContext("2d")!;

      // Deep dark mirror background
      ctx.fillStyle = block.isActivePinnacle ? "#07111e" : "#080c14";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Micro grid matrix pattern
      ctx.strokeStyle = block.isActivePinnacle ? "rgba(0, 240, 255, 0.08)" : "rgba(56, 189, 248, 0.05)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Border frame & corner registration markers
      ctx.strokeStyle = block.isActivePinnacle ? "#00F0FF" : "rgba(0, 240, 255, 0.4)";
      ctx.lineWidth = 3;
      ctx.strokeRect(28, 28, canvas.width - 56, canvas.height - 56);

      // Top Status Bar
      ctx.fillStyle = block.isActivePinnacle ? "#00F0FF" : "#38BDF8";
      ctx.font = "bold 28px monospace";
      ctx.fillText(`BLOCK 0${block.blockNumber}`, 60, 85);

      ctx.fillStyle = "#64748B";
      ctx.font = "22px monospace";
      ctx.fillText(`DATA HASH: ${block.blockHex}`, 480, 85);

      // Divider line
      ctx.strokeStyle = "rgba(100, 116, 139, 0.35)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(60, 115);
      ctx.lineTo(canvas.width - 60, 115);
      ctx.stroke();

      // Organization & Role Header
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 44px sans-serif";
      ctx.fillText(block.organization.toUpperCase(), 60, 195);

      ctx.fillStyle = block.isActivePinnacle ? "#00F0FF" : "#38BDF8";
      ctx.font = "bold 30px monospace";
      ctx.fillText(block.position, 60, 250);

      // Timestamp & Duration Pill
      ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
      ctx.fillRect(60, 290, 420, 52);
      ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
      ctx.strokeRect(60, 290, 420, 52);

      ctx.fillStyle = "#F8FAFC";
      ctx.font = "bold 20px monospace";
      ctx.fillText(`● ${block.period}`, 85, 324);

      // Core Architecture Badge
      if (block.isActivePinnacle) {
        ctx.fillStyle = "rgba(0, 240, 255, 0.15)";
        ctx.fillRect(60, 375, 460, 50);
        ctx.strokeStyle = "#00F0FF";
        ctx.strokeRect(60, 375, 460, 50);

        ctx.fillStyle = "#00F0FF";
        ctx.font = "bold 20px monospace";
        ctx.fillText("★ ACTIVE SOVEREIGN L1 RUNTIME", 85, 408);
      } else {
        ctx.fillStyle = "rgba(16, 185, 129, 0.15)";
        ctx.fillRect(60, 375, 340, 50);
        ctx.strokeStyle = "rgba(16, 185, 129, 0.5)";
        ctx.strokeRect(60, 375, 340, 50);

        ctx.fillStyle = "#34D399";
        ctx.font = "bold 20px monospace";
        ctx.fillText("✓ RECORDED LEDGER NODE", 85, 408);
      }

      // Bottom Hardware Ledger Stamp
      ctx.fillStyle = "rgba(2, 6, 23, 0.95)";
      ctx.fillRect(40, canvas.height - 110, canvas.width - 80, 65);
      ctx.strokeStyle = block.isActivePinnacle ? "rgba(0, 240, 255, 0.6)" : "rgba(30, 41, 59, 0.9)";
      ctx.strokeRect(40, canvas.height - 110, canvas.width - 80, 65);

      ctx.fillStyle = block.isActivePinnacle ? "#00F0FF" : "#94A3B8";
      ctx.font = "bold 20px monospace";
      ctx.fillText(
        block.isActivePinnacle
          ? "SUBSTRATE FRAMEWORK // STATE RUNTIME ACTIVE"
          : "IMMUTABLE BLOCK STATE // ARCHIVED IN LEDGER",
        70,
        canvas.height - 68
      );

      const texture = new THREE.CanvasTexture(canvas);
      texture.anisotropy = 8;
      return texture;
    }

    // 5. BUILD 3D WORLD: BLOCKS & ARCHITECTURAL PROTOCOL CONNECTORS
    const blockchainWorld = new THREE.Group();
    scene.add(blockchainWorld);

    interface BlockMeshItem {
      group: THREE.Group;
      chassis: THREE.Mesh;
      strataTop: THREE.Mesh;
      strataBottom: THREE.Mesh;
      aperture: THREE.Mesh;
      activeCoreGlow?: THREE.Mesh;
      baseX: number;
    }

    interface ConnectorItem {
      group: THREE.Group;
      rails: THREE.Mesh;
      centerLaser: THREE.Mesh;
      pulseNode: THREE.Mesh;
      dockLeft: THREE.Mesh;
      dockRight: THREE.Mesh;
      startX: number;
      endX: number;
      length: number;
    }

    const blockItems: BlockMeshItem[] = [];
    const connectorItems: ConnectorItem[] = [];

    // Create 5 Physical Layered Data Blocks
    blockchainExperienceBlocks.forEach((bData, idx) => {
      const blockGroup = new THREE.Group();
      const posX = idx * BLOCK_SPACING;
      blockGroup.position.set(posX, 0, 0);

      // Chassis Body
      const chassis = new THREE.Mesh(
        blockChassisGeo,
        bData.isActivePinnacle ? activePinnacleChassisMat : chassisMat
      );
      chassis.castShadow = true;
      chassis.receiveShadow = true;
      blockGroup.add(chassis);

      // Internal Physical Computational Strata (Upper & Lower Plates)
      const strataGeo = new THREE.BoxGeometry(BLOCK_WIDTH - 0.2, 0.12, BLOCK_DEPTH - 0.1);
      const strataTop = new THREE.Mesh(strataGeo, strataPlateMat);
      strataTop.position.set(0, 0.45, 0);
      blockGroup.add(strataTop);

      const strataBottom = new THREE.Mesh(strataGeo, strataPlateMat);
      strataBottom.position.set(0, -0.45, 0);
      blockGroup.add(strataBottom);

      // Front Aperture Plate
      const apertureGeo = new THREE.PlaneGeometry(BLOCK_WIDTH - 0.26, BLOCK_HEIGHT - 0.26);
      const apertureTexture = createApertureTexture(bData);
      const apertureMat = new THREE.MeshStandardMaterial({
        map: apertureTexture,
        roughness: 0.18,
        metalness: 0.35,
        emissive: new THREE.Color(0x00f0ff),
        emissiveIntensity: 0.0,
      });
      const aperture = new THREE.Mesh(apertureGeo, apertureMat);
      aperture.position.set(0, 0, BLOCK_DEPTH / 2 + 0.01);
      blockGroup.add(aperture);

      // Active Sovereign Core Accent (For Block 004 Climax)
      let activeCoreGlow: THREE.Mesh | undefined;
      if (bData.isActivePinnacle) {
        const ringGeo = new THREE.RingGeometry(0.3, 0.45, 32);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0x00f0ff,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.6,
        });
        activeCoreGlow = new THREE.Mesh(ringGeo, ringMat);
        activeCoreGlow.position.set(0, 0, BLOCK_DEPTH / 2 + 0.02);
        blockGroup.add(activeCoreGlow);
      }

      // Start initially hidden for blocks 1..4 (Progressive emergence)
      if (idx > 0) {
        blockGroup.visible = false;
        blockGroup.scale.set(0.9, 0.9, 0.9);
      }

      blockchainWorld.add(blockGroup);
      blockItems.push({
        group: blockGroup,
        chassis,
        strataTop,
        strataBottom,
        aperture,
        activeCoreGlow,
        baseX: posX,
      });
    });

    // Create 4 Architectural Protocol Connectors between blocks
    for (let i = 0; i < NUM_BLOCKS - 1; i++) {
      const connGroup = new THREE.Group();
      const startX = i * BLOCK_SPACING + BLOCK_WIDTH / 2;
      const endX = (i + 1) * BLOCK_SPACING - BLOCK_WIDTH / 2;
      const length = endX - startX;
      const midX = (startX + endX) / 2;

      connGroup.position.set(midX, 0, 0);

      // Dual High-Tensile Structural Rails
      const railGeo = new THREE.CylinderGeometry(0.04, 0.04, length, 16);
      railGeo.rotateZ(Math.PI / 2);

      const topRail = new THREE.Mesh(railGeo, titaniumConduitMat);
      topRail.position.set(0, 0.35, 0);
      connGroup.add(topRail);

      const bottomRail = new THREE.Mesh(railGeo, titaniumConduitMat);
      bottomRail.position.set(0, -0.35, 0);
      connGroup.add(bottomRail);

      // Central Optical State Channel
      const centerLaserGeo = new THREE.CylinderGeometry(0.02, 0.02, length, 12);
      centerLaserGeo.rotateZ(Math.PI / 2);
      const centerLaser = new THREE.Mesh(centerLaserGeo, cyanLaserMat);
      connGroup.add(centerLaser);

      // Docking Collars on both sides
      const collarGeo = new THREE.BoxGeometry(0.2, 0.9, 0.4);
      const dockLeft = new THREE.Mesh(collarGeo, titaniumConduitMat);
      dockLeft.position.set(-length / 2 + 0.1, 0, 0);
      connGroup.add(dockLeft);

      const dockRight = new THREE.Mesh(collarGeo, titaniumConduitMat);
      dockRight.position.set(length / 2 - 0.1, 0, 0);
      connGroup.add(dockRight);

      // Animated Glowing Data Pulse Node
      const pulseNodeGeo = new THREE.SphereGeometry(0.08, 16, 16);
      const pulseNode = new THREE.Mesh(pulseNodeGeo, pulseEnergyMat);
      pulseNode.position.set(-length / 2, 0, 0);
      connGroup.add(pulseNode);

      // Start initially hidden
      connGroup.visible = false;
      connGroup.scale.set(0.001, 1, 1);

      blockchainWorld.add(connGroup);
      connectorItems.push({
        group: connGroup,
        rails: topRail,
        centerLaser,
        pulseNode,
        dockLeft,
        dockRight,
        startX,
        endX,
        length,
      });
    }

    // 6. GSAP SCROLL ANIMATION TIMELINE
    interface AnimState {
      camX: number;
      camY: number;
      camZ: number;
      lookX: number;
      lookY: number;
      lookZ: number;
      activeBlockIndex: number;
      activeStageIndex: number;
      isFinalized: boolean;
      isOverview: boolean;
      stageProgress: number;
      blockExpansion: number[];
      blockPulse: number[];
      connectorDeploy: number[];
      continuityWave: number; // 0..5
    }

    const animState: AnimState = {
      camX: 0,
      camY: 0.2,
      camZ: 7.2,
      lookX: 0,
      lookY: 0,
      lookZ: 0,
      activeBlockIndex: 0,
      activeStageIndex: 1,
      isFinalized: false,
      isOverview: false,
      stageProgress: 0,
      blockExpansion: [0, 0, 0, 0, 0],
      blockPulse: [0, 0, 0, 0, 0],
      connectorDeploy: [0, 0, 0, 0],
      continuityWave: 0,
    };

    const masterTimeline = gsap.timeline({ paused: true });

    // Helper to build a clean block inspection segment
    // Scroll budgets:
    // Block 001: 0.00 -> 0.16
    // Block 002: 0.16 -> 0.32
    // Block 003: 0.32 -> 0.48
    // Block 004 (Active Climax): 0.48 -> 0.70 (Extra 6% budget for deep inspection)
    // Block 005: 0.70 -> 0.84
    // Final Continuity Climax: 0.84 -> 1.00

    // ---- BLOCK 001 (0.00 -> 0.16) ----
    masterTimeline.to(
      animState,
      {
        camX: 0,
        camY: 0.2,
        camZ: 7.2,
        lookX: 0,
        lookY: 0,
        lookZ: 0,
        activeBlockIndex: 0,
        activeStageIndex: 1,
        isFinalized: false,
        isOverview: false,
        duration: 0.02,
        onUpdate: () => {
          animState.blockExpansion[0] = 0.2;
        },
      },
      0.0
    );

    // Stage 2 to 5 reveal progression
    masterTimeline.to(
      animState,
      {
        activeStageIndex: 5,
        stageProgress: 1.0,
        duration: 0.08,
        onUpdate: () => {
          animState.blockExpansion[0] = 0.8;
        },
      },
      0.02
    );

    // Finalize Block 001
    masterTimeline.to(
      animState,
      {
        isFinalized: true,
        duration: 0.03,
        onUpdate: () => {
          animState.blockExpansion[0] = 0.0;
          animState.blockPulse[0] = 1.0;
        },
      },
      0.1
    );

    // Deploy Protocol Connector 1 (0.13 -> 0.16)
    masterTimeline.to(
      animState,
      {
        camX: BLOCK_SPACING * 0.5,
        camZ: 8.5,
        lookX: BLOCK_SPACING * 0.5,
        duration: 0.03,
        onUpdate: () => {
          animState.connectorDeploy[0] = 1.0;
        },
      },
      0.13
    );

    // ---- BLOCK 002 (0.16 -> 0.32) ----
    masterTimeline.to(
      animState,
      {
        camX: BLOCK_SPACING * 1.0,
        camZ: 7.2,
        lookX: BLOCK_SPACING * 1.0,
        activeBlockIndex: 1,
        activeStageIndex: 1,
        isFinalized: false,
        duration: 0.03,
        onUpdate: () => {
          animState.blockExpansion[1] = 0.2;
        },
      },
      0.16
    );

    masterTimeline.to(
      animState,
      {
        activeStageIndex: 5,
        stageProgress: 1.0,
        duration: 0.07,
        onUpdate: () => {
          animState.blockExpansion[1] = 0.8;
        },
      },
      0.19
    );

    masterTimeline.to(
      animState,
      {
        isFinalized: true,
        duration: 0.03,
        onUpdate: () => {
          animState.blockExpansion[1] = 0.0;
          animState.blockPulse[1] = 1.0;
        },
      },
      0.26
    );

    masterTimeline.to(
      animState,
      {
        camX: BLOCK_SPACING * 1.5,
        camZ: 8.5,
        lookX: BLOCK_SPACING * 1.5,
        duration: 0.03,
        onUpdate: () => {
          animState.connectorDeploy[1] = 1.0;
        },
      },
      0.29
    );

    // ---- BLOCK 003 (0.32 -> 0.48) ----
    masterTimeline.to(
      animState,
      {
        camX: BLOCK_SPACING * 2.0,
        camZ: 7.2,
        lookX: BLOCK_SPACING * 2.0,
        activeBlockIndex: 2,
        activeStageIndex: 1,
        isFinalized: false,
        duration: 0.03,
        onUpdate: () => {
          animState.blockExpansion[2] = 0.2;
        },
      },
      0.32
    );

    masterTimeline.to(
      animState,
      {
        activeStageIndex: 5,
        stageProgress: 1.0,
        duration: 0.07,
        onUpdate: () => {
          animState.blockExpansion[2] = 0.8;
        },
      },
      0.35
    );

    masterTimeline.to(
      animState,
      {
        isFinalized: true,
        duration: 0.03,
        onUpdate: () => {
          animState.blockExpansion[2] = 0.0;
          animState.blockPulse[2] = 1.0;
        },
      },
      0.42
    );

    masterTimeline.to(
      animState,
      {
        camX: BLOCK_SPACING * 2.5,
        camZ: 8.5,
        lookX: BLOCK_SPACING * 2.5,
        duration: 0.03,
        onUpdate: () => {
          animState.connectorDeploy[2] = 1.0;
        },
      },
      0.45
    );

    // ---- BLOCK 004: ONE DEV (0.48 -> 0.64) ----
    masterTimeline.to(
      animState,
      {
        camX: BLOCK_SPACING * 3.0,
        camZ: 7.2,
        lookX: BLOCK_SPACING * 3.0,
        activeBlockIndex: 3,
        activeStageIndex: 1,
        isFinalized: false,
        duration: 0.03,
        onUpdate: () => {
          animState.blockExpansion[3] = 0.2;
        },
      },
      0.48
    );

    masterTimeline.to(
      animState,
      {
        activeStageIndex: 5,
        stageProgress: 1.0,
        duration: 0.07,
        onUpdate: () => {
          animState.blockExpansion[3] = 0.8;
        },
      },
      0.51
    );

    masterTimeline.to(
      animState,
      {
        isFinalized: true,
        duration: 0.03,
        onUpdate: () => {
          animState.blockExpansion[3] = 0.0;
          animState.blockPulse[3] = 1.0;
        },
      },
      0.58
    );

    masterTimeline.to(
      animState,
      {
        camX: BLOCK_SPACING * 3.5,
        camZ: 8.5,
        lookX: BLOCK_SPACING * 3.5,
        duration: 0.03,
        onUpdate: () => {
          animState.connectorDeploy[3] = 1.0;
        },
      },
      0.61
    );

    // ---- BLOCK 005: CAERULEAN BYTECHINS L1 (ACTIVE PINNACLE CLIMAX) (0.64 -> 0.84) ----
    masterTimeline.to(
      animState,
      {
        camX: BLOCK_SPACING * 4.0,
        camZ: 7.0, // Closer inspection for L1 Sovereign Runtime
        lookX: BLOCK_SPACING * 4.0,
        activeBlockIndex: 4,
        activeStageIndex: 1,
        isFinalized: false,
        duration: 0.04,
        onUpdate: () => {
          animState.blockExpansion[4] = 0.3;
        },
      },
      0.64
    );

    masterTimeline.to(
      animState,
      {
        activeStageIndex: 5,
        stageProgress: 1.0,
        duration: 0.11,
        onUpdate: () => {
          animState.blockExpansion[4] = 1.0;
        },
      },
      0.68
    );

    masterTimeline.to(
      animState,
      {
        isFinalized: true,
        duration: 0.04,
        onUpdate: () => {
          animState.blockExpansion[4] = 0.0;
          animState.blockPulse[4] = 1.0;
        },
      },
      0.79
    );

    // ---- STEP 6: FULL CAREER BLOCKCHAIN CONTINUITY OVERVIEW (0.84 -> 1.00) ----
    masterTimeline.to(
      animState,
      {
        camX: (BLOCK_SPACING * 4) / 2,
        camY: 3.2,
        camZ: 25.0,
        lookX: (BLOCK_SPACING * 4) / 2,
        lookY: 0,
        lookZ: 0,
        isOverview: true,
        duration: 0.08,
      },
      0.84
    );

    masterTimeline.to(
      animState,
      {
        continuityWave: 5.0, // Waves through 001 -> 002 -> 003 -> 004 -> 005
        duration: 0.08,
      },
      0.92
    );

    // 7. MOUSE PARALLAX
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = x * 0.4;
      mouseY = y * 0.3;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 8. RENDER LOOP
    let clock = new THREE.Clock();

    const renderLoop = () => {
      reqId = requestAnimationFrame(renderLoop);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Progressively update GSAP timeline based on scroll
      masterTimeline.progress(scrollProgressRef.current);

      // Camera position interpolation with parallax
      camera.position.x += (animState.camX + mouseX - camera.position.x) * 0.08;
      camera.position.y += (animState.camY - mouseY - camera.position.y) * 0.08;
      camera.position.z += (animState.camZ - camera.position.z) * 0.08;
      camera.lookAt(animState.lookX, animState.lookY, animState.lookZ);

      // Update 3D Blocks (Visibility, Strata separation, and Pulse)
      blockItems.forEach((item, idx) => {
        // Progressive emergence: visible if current or already reached/connected
        const isReached = idx <= animState.activeBlockIndex || (idx > 0 && animState.connectorDeploy[idx - 1] > 0.1);
        item.group.visible = isReached;
        if (isReached) {
          item.group.scale.set(1, 1, 1);
        }

        // Strata expansion
        const expansion = animState.blockExpansion[idx] || 0;
        item.strataTop.position.y = 0.45 + expansion * 0.18;
        item.strataBottom.position.y = -0.45 - expansion * 0.18;

        // Block Finalization Flash / Pulse via Material Emissive
        const pulse = animState.blockPulse[idx] || 0;
        let activeGlowAmt = 0;
        if (pulse > 0) {
          activeGlowAmt = pulse * 0.8;
          animState.blockPulse[idx] = Math.max(0, pulse - delta * 2.5);
        }

        // Active Pinnacle core rotation
        if (item.activeCoreGlow) {
          item.activeCoreGlow.rotation.z = time * 0.6;
          const scaleOsc = 1 + Math.sin(time * 3) * 0.06;
          item.activeCoreGlow.scale.set(scaleOsc, scaleOsc, 1);
        }

        // Climax Continuity Pulse Wave (001 -> 002 -> 003 -> 004 -> 005)
        if (animState.isOverview && animState.continuityWave > 0) {
          const waveDist = Math.abs(animState.continuityWave - idx);
          if (waveDist < 0.8) {
            const waveGlow = (1 - waveDist / 0.8) * 0.9;
            activeGlowAmt = Math.max(activeGlowAmt, waveGlow);
          }
        }

        // Apply smooth emissive glow to aperture material
        const apMat = item.aperture.material as THREE.MeshStandardMaterial;
        apMat.emissiveIntensity = activeGlowAmt;
      });

      // Update Protocol Connectors
      connectorItems.forEach((cItem, cIdx) => {
        const deploy = animState.connectorDeploy[cIdx] || 0;
        cItem.group.visible = deploy > 0.01;
        cItem.group.scale.x = Math.max(0.001, deploy);

        // Data packet pulse traveling along the channel
        if (deploy > 0.8) {
          const pulseT = (time * 1.8 + cIdx * 0.4) % 1.0;
          cItem.pulseNode.position.x = -cItem.length / 2 + pulseT * cItem.length;
        }
      });

      // Notify React state for HTML Overlay synchronization
      if (onInspectionChangeRef.current) {
        onInspectionChangeRef.current({
          blockIndex: animState.activeBlockIndex,
          stageIndex: Math.round(animState.activeStageIndex),
          isFinalized: animState.isFinalized,
          isOverview: animState.isOverview,
          stageProgress: animState.stageProgress,
        });
      }

      renderer.render(scene, camera);
    };

    renderLoop();

    // 9. WINDOW RESIZE HANDLER
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      const isMob = width < 768;
      camera.fov = isMob ? 48 : 36;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(reqId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full relative cursor-grab active:cursor-grabbing" />;
}
