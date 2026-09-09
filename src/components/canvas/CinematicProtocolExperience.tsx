"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  { id: 1, range: [0.0, 0.08], name: "01 RAW SILICA GRANULES", subtitle: "High-Purity Quartzite & Granular Silicon Sand (Extreme Macro)" },
  { id: 2, range: [0.08, 0.16], name: "02 INDUCTION MELTING", subtitle: "Thermal Fluid Fusion into Molten Silicon Pool" },
  { id: 3, range: [0.16, 0.25], name: "03 MONOCRYSTALLINE WAFER", subtitle: "Precision-Sliced Photolithographic Silicon Disk" },
  { id: 4, range: [0.25, 0.35], name: "04 FLIP-CHIP MICROPROCESSOR", subtitle: "NEXUS-M3 3nm Consensus Processor & Colorful Architecture Die" },
  { id: 5, range: [0.35, 0.45], name: "05 UNIBODY COMPUTE NODE", subtitle: "Silver Anodized Aluminum Squircle Chassis, Copper Thermal Core & Precision IO" },
  { id: 6, range: [0.45, 0.55], name: "06 ARCHITECTURAL REPLICATION", subtitle: "8 Homogeneous Compute Nodes in Parallel" },
  { id: 7, range: [0.55, 0.65], name: "07 DISTRIBUTED RING TOPOLOGY", subtitle: "P2P Mesh Network & Sovereign Interconnects" },
  { id: 8, range: [0.65, 0.72], name: "08 GOSSIP & NETWORK TRAFFIC", subtitle: "Bi-directional Peer Protocol Packets" },
  { id: 9, range: [0.72, 0.8], name: "09 SIGNED TRANSACTION ORIGIN", subtitle: "Node 0 Generates Cryptographically Signed Message Packet (Ed25519 Seal)" },
  { id: 10, range: [0.8, 0.86], name: "10 NETWORK-WIDE GOSSIP BROADCAST", subtitle: "Node 0 Floods Transaction Packets Along All Edges to All 8 Nodes" },
  { id: 11, range: [0.86, 0.9], name: "11 PARALLEL MULTI-NODE VALIDATION", subtitle: "All 8 Nodes Simultaneously Receive, Verify & Validate Cryptographic Proofs" },
  { id: 12, range: [0.9, 0.93], name: "12 TRANSACTION ACCEPTED", subtitle: "Green Checkmark Approval Badges on All 8 Compute Nodes" },
  { id: 13, range: [0.93, 0.96], name: "13 BLOCK #10 SYNTHESIS", subtitle: "Transaction Assembles into Single Validated Block Cube #10 at Center" },
  { id: 14, range: [0.96, 0.98], name: "14 EXISTING BLOCKCHAIN", subtitle: "Historical Blocks 07, 08, 09 Linked Below (Zero Overlap)" },
  { id: 15, range: [0.98, 0.995], name: "15 BLOCK #10 ATTACHED", subtitle: "New 3rd Chain Link Locks Block #10 onto Immutable Blockchain" },
  { id: 16, range: [0.995, 1.0], name: "16 COMPLETE SYSTEM REVEAL", subtitle: "8-Node Network Above · 4-Block Immutable Chain Below" },
];

export function CinematicProtocolExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasHolderRef = useRef<HTMLDivElement>(null);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [activeStage, setActiveStage] = useState(STAGES[0]);

  useEffect(() => {
    const holder = canvasHolderRef.current;
    if (!holder) return;

    let width = holder.clientWidth || window.innerWidth;
    let height = holder.clientHeight || window.innerHeight;

    // 1. THREE.JS SCENE SETUP
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x030304);
    scene.fog = new THREE.FogExp2(0x030304, 0.015);

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
    camera.position.set(1.0, 1.8, 4.8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    holder.appendChild(renderer.domElement);

    // 2. LIGHTING RIG
    const ambientLight = new THREE.AmbientLight(0xfff7ee, 1.25); // Warm ambient light
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffaea, 3.4); // Warm studio key
    keyLight.position.set(15, 25, 18);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const silverFillLight = new THREE.DirectionalLight(0xffffff, 1.8); // Dedicated silver studio fill
    silverFillLight.position.set(-14, 14, 16);
    scene.add(silverFillLight);

    const warmFillLight = new THREE.DirectionalLight(0xffe6c2, 1.3); // Warm sand fill
    warmFillLight.position.set(-15, 12, 10);
    scene.add(warmFillLight);

    const cyanFillLight = new THREE.DirectionalLight(0x61e7ff, 0.9); // Tech accent fill
    cyanFillLight.position.set(-18, -12, -12);
    scene.add(cyanFillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 2.2); // Crisp metallic rim light
    rimLight.position.set(0, 30, -25);
    scene.add(rimLight);

    const inductionHeatLight = new THREE.PointLight(0xff5511, 0, 15);
    inductionHeatLight.position.set(0, 0.5, 0);
    scene.add(inductionHeatLight);

    // 3. MASTER MATERIALS
    const brushedSilverMat = new THREE.MeshStandardMaterial({
      color: 0xd8dae2,
      roughness: 0.24,
      metalness: 0.9,
    });

    const goldPinMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.18,
      metalness: 0.95,
    });

    const cyanGlowMat = new THREE.MeshBasicMaterial({
      color: 0x61e7ff,
    });

    const cyanLineMat = new THREE.LineBasicMaterial({
      color: 0x61e7ff,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const subtleLineMat = new THREE.LineBasicMaterial({
      color: 0x383940,
      transparent: true,
      opacity: 0.55,
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x14161d,
      metalness: 0.1,
      roughness: 0.08,
      transparent: true,
      opacity: 0.7,
      transmission: 0.6,
    });

    const masterWorld = new THREE.Group();
    masterWorld.scale.set(0.52, 0.52, 0.52);
    scene.add(masterWorld);

    // =========================================================================
    // STAGE 01 & 02: HIGH-PURITY SILICA SAND & GRANULAR QUARTZ CLUSTER (650 GRAINS)
    // =========================================================================
    const granularSystemGroup = new THREE.Group();
    masterWorld.add(granularSystemGroup);

    const GRANULE_COUNT = 650;
    const granuleData: {
      initialPos: THREE.Vector3;
      currentPos: THREE.Vector3;
      targetMoltenPos: THREE.Vector3;
      rotation: THREE.Euler;
      rotSpeed: THREE.Vector3;
      scale: number;
      baseColor: THREE.Color;
    }[] = [];

    const granuleGeo = new THREE.DodecahedronGeometry(0.12, 0);
    const granuleMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.52,
      metalness: 0.04,
      flatShading: true,
    });
    const granuleInstancedMesh = new THREE.InstancedMesh(granuleGeo, granuleMat, GRANULE_COUNT);
    granuleInstancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    granularSystemGroup.add(granuleInstancedMesh);

    // Natural quartz silica sand color palette
    const sandPalette = [
      new THREE.Color(0xe5a65d), // Golden desert silica
      new THREE.Color(0xdf9843), // Warm amber sand
      new THREE.Color(0xf3ca88), // Sunlight golden grain
      new THREE.Color(0xd98e32), // Rich ochre quartz
      new THREE.Color(0xedba74), // Radiant dunes quartz
      new THREE.Color(0xcca878), // Natural raw silica crystal
      new THREE.Color(0xf5d69d), // Pure translucent quartzite
      new THREE.Color(0xde9b47), // Deep golden sand
    ];

    const dummy = new THREE.Object3D();
    const colorDummy = new THREE.Color();

    for (let g = 0; g < GRANULE_COUNT; g++) {
      const r = Math.pow(Math.random(), 0.6) * 1.45;
      const theta = Math.random() * Math.PI * 2;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      const y = Math.max(0, (1 - (r / 1.55) * (r / 1.55)) * 0.72 + (Math.random() - 0.5) * 0.15);

      const initPos = new THREE.Vector3(x, y, z);
      const moltenRadius = Math.sqrt(Math.random()) * 1.45;
      const moltenTheta = Math.random() * Math.PI * 2;
      const targetMolten = new THREE.Vector3(
        Math.cos(moltenTheta) * moltenRadius,
        0.05 + Math.sin(moltenRadius * 4) * 0.02,
        Math.sin(moltenTheta) * moltenRadius
      );

      const rot = new THREE.Euler(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );
      const rotSpeed = new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      );

      const scale = 0.55 + Math.random() * 0.95;

      const baseColor = sandPalette[g % sandPalette.length].clone();
      const variance = (Math.random() - 0.5) * 0.05;
      baseColor.r = Math.min(Math.max(baseColor.r + variance, 0.6), 1.0);
      baseColor.g = Math.min(Math.max(baseColor.g + variance * 0.7, 0.45), 0.95);
      baseColor.b = Math.min(Math.max(baseColor.b + variance * 0.4, 0.15), 0.75);

      granuleData.push({
        initialPos: initPos,
        currentPos: initPos.clone(),
        targetMoltenPos: targetMolten,
        rotation: rot,
        rotSpeed: rotSpeed,
        scale: scale,
        baseColor: baseColor,
      });

      granuleInstancedMesh.setColorAt(g, baseColor);
    }
    if (granuleInstancedMesh.instanceColor) {
      granuleInstancedMesh.instanceColor.needsUpdate = true;
    }

    // Molten liquid pool meniscus
    const moltenPoolGeo = new THREE.CylinderGeometry(2.4, 2.4, 0.1, 48);
    const moltenPoolMat = new THREE.MeshStandardMaterial({
      color: 0x3d1a08,
      emissive: 0xff5511,
      emissiveIntensity: 0.0,
      roughness: 0.12,
      metalness: 0.85,
    });
    const moltenPoolMesh = new THREE.Mesh(moltenPoolGeo, moltenPoolMat);
    moltenPoolMesh.position.y = 0.04;
    moltenPoolMesh.scale.set(0.001, 0.001, 0.001);
    granularSystemGroup.add(moltenPoolMesh);

    // =========================================================================
    // STAGE 03: HIGH-PRECISION MONOCRYSTALLINE SILICON WAFER
    // =========================================================================
    function createSiliconWaferTexture(): THREE.CanvasTexture {
      const canvas = document.createElement("canvas");
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#0c0f16";
        ctx.fillRect(0, 0, 1024, 1024);

        ctx.save();
        ctx.beginPath();
        ctx.arc(512, 512, 492, 0, Math.PI * 2);
        ctx.clip();

        const grad = ctx.createRadialGradient(512, 512, 40, 512, 512, 490);
        grad.addColorStop(0, "#1a2130");
        grad.addColorStop(0.35, "#141a26");
        grad.addColorStop(0.7, "#0f141f");
        grad.addColorStop(1, "#090c12");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 1024, 1024);

        const dieSize = 36;
        const gap = 3;
        const cols = Math.floor(1024 / (dieSize + gap));

        for (let ix = 0; ix < cols; ix++) {
          for (let iy = 0; iy < cols; iy++) {
            const x = ix * (dieSize + gap) + 8;
            const y = iy * (dieSize + gap) + 8;
            const dist = Math.hypot(x + dieSize / 2 - 512, y + dieSize / 2 - 512);

            if (dist < 475) {
              const hueIdx = (ix * 3 + iy * 7) % 5;
              const dieColors = ["#141d2a", "#172334", "#1b273a", "#131f2f", "#182130"];
              ctx.fillStyle = dieColors[hueIdx];
              ctx.fillRect(x, y, dieSize, dieSize);

              ctx.strokeStyle = "rgba(97, 231, 255, 0.4)";
              ctx.lineWidth = 1;
              ctx.strokeRect(x + 2, y + 2, dieSize - 4, dieSize - 4);

              ctx.fillStyle = "rgba(255, 205, 85, 0.45)";
              ctx.fillRect(x + 4, y + 4, 5, 5);
              ctx.fillRect(x + dieSize - 9, y + dieSize - 9, 5, 5);

              ctx.strokeStyle = "rgba(97, 231, 255, 0.3)";
              ctx.beginPath();
              ctx.moveTo(x + 2, y + dieSize / 2);
              ctx.lineTo(x + dieSize - 2, y + dieSize / 2);
              ctx.moveTo(x + dieSize / 2, y + 2);
              ctx.lineTo(x + dieSize / 2, y + dieSize - 2);
              ctx.stroke();
            }
          }
        }

        ctx.strokeStyle = "rgba(97, 231, 255, 0.7)";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(512, 512, 482, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(512, 512, 474, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = "rgba(97, 231, 255, 0.6)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(512, 20); ctx.lineTo(512, 70);
        ctx.moveTo(512, 954); ctx.lineTo(512, 1004);
        ctx.moveTo(20, 512); ctx.lineTo(70, 512);
        ctx.moveTo(954, 512); ctx.lineTo(1004, 512);
        ctx.stroke();

        ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
        ctx.font = "bold 13px monospace";
        ctx.textAlign = "center";
        ctx.fillText("300MM MONOCRYSTALLINE SILICON WAFER // ULTRA-HIGH PURITY 99.9999999%", 512, 492);

        ctx.restore();
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.anisotropy = 8;
      return tex;
    }

    const waferGroup = new THREE.Group();
    masterWorld.add(waferGroup);
    waferGroup.scale.set(0.001, 0.001, 0.001);

    const waferTexture = createSiliconWaferTexture();
    const waferTopMat = new THREE.MeshStandardMaterial({
      map: waferTexture,
      roughness: 0.08,
      metalness: 0.95,
    });
    const waferBodyMat = new THREE.MeshStandardMaterial({
      color: 0x11141c,
      roughness: 0.12,
      metalness: 0.95,
    });

    const waferDiskGeo = new THREE.CylinderGeometry(3.6, 3.6, 0.06, 80);
    const waferMesh = new THREE.Mesh(waferDiskGeo, [waferBodyMat, waferTopMat, waferBodyMat]);
    waferGroup.add(waferMesh);

    const waferEdgeGeo = new THREE.TorusGeometry(3.6, 0.035, 16, 80);
    const waferEdge = new THREE.Mesh(waferEdgeGeo, brushedSilverMat);
    waferEdge.rotation.x = Math.PI / 2;
    waferGroup.add(waferEdge);

    const reticleGroup = new THREE.Group();
    reticleGroup.position.y = 0.035;
    waferGroup.add(reticleGroup);

    const reticleCircleGeo = new THREE.RingGeometry(3.35, 3.37, 64);
    const reticleCircle = new THREE.Mesh(
      reticleCircleGeo,
      new THREE.MeshBasicMaterial({ color: 0x61e7ff, transparent: true, opacity: 0.45, side: THREE.DoubleSide })
    );
    reticleCircle.rotation.x = -Math.PI / 2;
    reticleGroup.add(reticleCircle);

    // =========================================================================
    // STAGE 04: HIGH-DENSITY FLIP-CHIP MICROPROCESSOR (NEXUS-M3 PROTOCOL DIE)
    // =========================================================================
    function createMicroprocessorDieTexture(): THREE.CanvasTexture {
      const canvas = document.createElement("canvas");
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#090c13";
        ctx.fillRect(0, 0, 1024, 1024);

        ctx.strokeStyle = "rgba(97, 231, 255, 0.75)";
        ctx.lineWidth = 4;
        ctx.strokeRect(16, 16, 992, 992);

        // 1. TOP: Crypto Hash Engines (Emerald Green & Cyan)
        const topH = 220;
        ctx.fillStyle = "rgba(16, 185, 129, 0.2)";
        ctx.fillRect(32, 32, 960, topH);
        ctx.strokeStyle = "#10b981";
        ctx.lineWidth = 2;
        ctx.strokeRect(32, 32, 960, topH);

        for (let c = 0; c < 8; c++) {
          const cw = (960 - 70) / 8;
          const cx = 40 + c * (cw + 10);
          ctx.fillStyle = c % 2 === 0 ? "#064e3b" : "#047857";
          ctx.fillRect(cx, 44, cw, topH - 24);
          ctx.strokeStyle = "#34d399";
          ctx.lineWidth = 1;
          ctx.strokeRect(cx, 44, cw, topH - 24);

          ctx.fillStyle = "#34d399";
          ctx.font = "bold 12px monospace";
          ctx.textAlign = "center";
          ctx.fillText(`SHA-${c + 1}`, cx + cw / 2, 70);

          ctx.fillStyle = "rgba(52, 211, 153, 0.6)";
          for (let r = 0; r < 5; r++) {
            ctx.fillRect(cx + 6, 85 + r * 22, cw - 12, 14);
          }
        }

        ctx.fillStyle = "#34d399";
        ctx.font = "bold 13px monospace";
        ctx.textAlign = "left";
        ctx.fillText("CRYPTOGRAPHIC HASH ENGINE ARRAY // 512-BIT SHA/ECC", 40, topH + 22);

        // 2. CENTER-LEFT: 64-Core Parallel Protocol Logic (Vivid Electric Cyan & Teal)
        const midY = 270;
        const midW = 460;
        const midH = 430;
        ctx.fillStyle = "rgba(6, 182, 212, 0.18)";
        ctx.fillRect(32, midY, midW, midH);
        ctx.strokeStyle = "#06b6d4";
        ctx.lineWidth = 2;
        ctx.strokeRect(32, midY, midW, midH);

        for (let gx = 0; gx < 4; gx++) {
          for (let gy = 0; gy < 4; gy++) {
            const gw = (midW - 40) / 4;
            const gh = (midH - 60) / 4;
            const gpx = 42 + gx * (gw + 8);
            const gpy = midY + 40 + gy * (gh + 8);

            ctx.fillStyle = (gx + gy) % 2 === 0 ? "#0e3a4e" : "#082f49";
            ctx.fillRect(gpx, gpy, gw, gh);
            ctx.strokeStyle = "#38bdf8";
            ctx.lineWidth = 1;
            ctx.strokeRect(gpx, gpy, gw, gh);

            ctx.fillStyle = "#67e8f9";
            ctx.font = "bold 11px monospace";
            ctx.textAlign = "center";
            ctx.fillText(`C${gx * 4 + gy + 1}`, gpx + gw / 2, gpy + gh / 2 + 3);
          }
        }
        ctx.fillStyle = "#38bdf8";
        ctx.font = "bold 13px monospace";
        ctx.textAlign = "left";
        ctx.fillText("64-CORE PARALLEL PROTOCOL LOGIC ARRAY", 40, midY + 24);

        // 3. CENTER-RIGHT: Neural Consensus & AI Matrix (Glowing Violet & Magenta)
        const rightX = 532;
        ctx.fillStyle = "rgba(168, 85, 247, 0.18)";
        ctx.fillRect(rightX, midY, midW, midH);
        ctx.strokeStyle = "#a855f7";
        ctx.lineWidth = 2;
        ctx.strokeRect(rightX, midY, midW, midH);

        for (let ny = 0; ny < 6; ny++) {
          const nw = midW - 24;
          const nh = (midH - 70) / 6;
          const npx = rightX + 12;
          const npy = midY + 40 + ny * (nh + 6);

          ctx.fillStyle = ny % 2 === 0 ? "#3b0764" : "#4c1d95";
          ctx.fillRect(npx, npy, nw, nh);
          ctx.strokeStyle = "#c084fc";
          ctx.lineWidth = 1;
          ctx.strokeRect(npx, npy, nw, nh);

          for (let d = 0; d < 12; d++) {
            ctx.fillStyle = d % 3 === 0 ? "#f43f5e" : "#c084fc";
            ctx.beginPath();
            ctx.arc(npx + 18 + d * 36, npy + nh / 2, 4.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.fillStyle = "#c084fc";
        ctx.font = "bold 13px monospace";
        ctx.textAlign = "left";
        ctx.fillText("NEURAL CONSENSUS ENGINE // TENSOR ARRAY", rightX + 10, midY + 24);

        // 4. CENTRAL BUS / L3 CACHE (Electric Blue & Amber Gold)
        const busY = 720;
        const busH = 110;
        ctx.fillStyle = "rgba(245, 158, 11, 0.2)";
        ctx.fillRect(32, busY, 960, busH);
        ctx.strokeStyle = "#f59e0b";
        ctx.lineWidth = 2;
        ctx.strokeRect(32, busY, 960, busH);

        for (let bx = 0; bx < 32; bx++) {
          const traceX = 46 + bx * 29.5;
          ctx.strokeStyle = bx % 4 === 0 ? "#fbbf24" : "rgba(245, 158, 11, 0.4)";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(traceX, busY + 8);
          ctx.lineTo(traceX, busY + busH - 8);
          ctx.stroke();
        }
        ctx.fillStyle = "#fbbf24";
        ctx.font = "bold 13px monospace";
        ctx.textAlign = "center";
        ctx.fillText("ULTRA-HIGH BANDWIDTH UNIFIED CACHE BUS // 1024 GB/s", 512, busY + busH / 2 + 5);

        // 5. BOTTOM BRANDING & CHIP NAME SECTION
        const botY = 850;
        const botH = 142;
        ctx.fillStyle = "#0b101c";
        ctx.fillRect(32, botY, 960, botH);
        ctx.strokeStyle = "#61e7ff";
        ctx.lineWidth = 2;
        ctx.strokeRect(32, botY, 960, botH);

        ctx.fillStyle = "#fbbf24";
        ctx.fillRect(36, botY + 4, 16, 16);
        ctx.fillRect(972, botY + 4, 16, 16);
        ctx.fillRect(36, botY + botH - 20, 16, 16);
        ctx.fillRect(972, botY + botH - 20, 16, 16);

        ctx.fillStyle = "#ffffff";
        ctx.font = "900 44px monospace";
        ctx.textAlign = "center";
        ctx.fillText("NEXUS-M3 PROTOCOL", 512, botY + 52);

        ctx.fillStyle = "#61e7ff";
        ctx.font = "bold 18px monospace";
        ctx.fillText("3NM BYZANTINE CONSENSUS PROCESSOR // SECURE ENCLAVE", 512, botY + 86);

        ctx.fillStyle = "#94a3b8";
        ctx.font = "14px monospace";
        ctx.fillText("DIE SERIAL: NX3P-9941-88 // 18.4B TRANSISTORS // HW-VALIDATED", 512, botY + 116);
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.anisotropy = 8;
      return tex;
    }

    function createSubstrateTexture(): THREE.CanvasTexture {
      const canvas = document.createElement("canvas");
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#0c1017";
        ctx.fillRect(0, 0, 1024, 1024);

        ctx.strokeStyle = "rgba(218, 165, 32, 0.4)";
        ctx.lineWidth = 2;
        for (let i = 0; i < 48; i++) {
          const angle = (i / 48) * Math.PI * 2;
          const innerR = 340;
          const outerR = 480;
          ctx.beginPath();
          ctx.moveTo(512 + Math.cos(angle) * innerR, 512 + Math.sin(angle) * innerR);
          ctx.lineTo(512 + Math.cos(angle) * outerR, 512 + Math.sin(angle) * outerR);
          ctx.stroke();
        }

        ctx.strokeStyle = "rgba(218, 165, 32, 0.6)";
        ctx.lineWidth = 4;
        ctx.strokeRect(32, 32, 960, 960);

        ctx.fillStyle = "#e5b842";
        ctx.beginPath();
        ctx.moveTo(40, 40);
        ctx.lineTo(110, 40);
        ctx.lineTo(40, 110);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.font = "bold 16px monospace";
        ctx.fillText("PKG-BGA 2400 // TSMC N3P", 140, 80);
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.anisotropy = 8;
      return tex;
    }

    const chipGroup = new THREE.Group();
    masterWorld.add(chipGroup);
    chipGroup.scale.set(0.001, 0.001, 0.001);

    const substrateTexture = createSubstrateTexture();
    const substrateTopMat = new THREE.MeshStandardMaterial({
      map: substrateTexture,
      roughness: 0.35,
      metalness: 0.65,
    });
    const substrateBodyMat = new THREE.MeshStandardMaterial({
      color: 0x0c1017,
      roughness: 0.4,
      metalness: 0.5,
    });
    const substrateGeo = new THREE.BoxGeometry(4.4, 0.16, 4.4);
    const substrateMesh = new THREE.Mesh(substrateGeo, [
      substrateBodyMat,
      substrateBodyMat,
      substrateTopMat,
      substrateBodyMat,
      substrateBodyMat,
      substrateBodyMat,
    ]);
    chipGroup.add(substrateMesh);

    const alignMarkerGeo = new THREE.BoxGeometry(0.2, 0.02, 0.2);
    const alignMarker = new THREE.Mesh(alignMarkerGeo, goldPinMat);
    alignMarker.position.set(1.9, 0.09, 1.9);
    chipGroup.add(alignMarker);

    const dieTexture = createMicroprocessorDieTexture();
    const dieTopMat = new THREE.MeshStandardMaterial({
      map: dieTexture,
      roughness: 0.08,
      metalness: 0.85,
    });
    const dieBodyMat = new THREE.MeshStandardMaterial({
      color: 0x111317,
      roughness: 0.15,
      metalness: 0.95,
    });
    const dieGeo = new THREE.BoxGeometry(3.0, 0.22, 3.0);
    const dieMesh = new THREE.Mesh(dieGeo, [
      dieBodyMat,
      dieBodyMat,
      dieTopMat,
      dieBodyMat,
      dieBodyMat,
      dieBodyMat,
    ]);
    dieMesh.position.y = 0.15;
    chipGroup.add(dieMesh);

    // SMD Ceramic decoupling capacitors surrounding the die
    const capGeo = new THREE.BoxGeometry(0.18, 0.08, 0.1);
    const capBodyMat = new THREE.MeshStandardMaterial({ color: 0x8b6e4e, roughness: 0.3 });
    for (let c = -6; c <= 6; c++) {
      if (Math.abs(c) > 0) {
        const offset = c * 0.26;
        const cap = new THREE.Mesh(capGeo, capBodyMat);
        cap.position.set(offset, 0.12, 1.75);
        chipGroup.add(cap);

        const cap2 = cap.clone();
        cap2.position.set(offset, 0.12, -1.75);
        chipGroup.add(cap2);

        const cap3 = cap.clone();
        cap3.rotation.y = Math.PI / 2;
        cap3.position.set(1.75, 0.12, offset);
        chipGroup.add(cap3);

        const cap4 = cap3.clone();
        cap4.position.set(-1.75, 0.12, offset);
        chipGroup.add(cap4);
      }
    }

    // Gold LGA contact pins
    const pinGeo = new THREE.BoxGeometry(0.1, 0.06, 0.25);
    for (let p = -8; p <= 8; p++) {
      if (Math.abs(p) > 1) {
        const offset = p * 0.24;
        const p1 = new THREE.Mesh(pinGeo, goldPinMat);
        p1.position.set(offset, 0.02, 2.05);
        chipGroup.add(p1);
        const p2 = p1.clone();
        p2.position.set(offset, 0.02, -2.05);
        chipGroup.add(p2);
        const p3 = p1.clone();
        p3.rotation.y = Math.PI / 2;
        p3.position.set(2.05, 0.02, offset);
        chipGroup.add(p3);
        const p4 = p3.clone();
        p4.position.set(-2.05, 0.02, offset);
        chipGroup.add(p4);
      }
    }

    // =========================================================================
    // STAGE 05 & 06: SILVER UNIBODY MAC STUDIO COMPUTE NODES (1 -> 8 NODES)
    // =========================================================================
    function createComputeNodeMesh(): THREE.Group {
      const node = new THREE.Group();

      const width = 3.6;
      const height = 3.6;
      const cornerRadius = 0.65;
      const chassisDepth = 1.7;

      const squircleShape = new THREE.Shape();
      const x = -width / 2;
      const y = -height / 2;

      squircleShape.moveTo(x + cornerRadius, y);
      squircleShape.lineTo(x + width - cornerRadius, y);
      squircleShape.quadraticCurveTo(x + width, y, x + width, y + cornerRadius);
      squircleShape.lineTo(x + width, y + height - cornerRadius);
      squircleShape.quadraticCurveTo(x + width, y + height, x + width - cornerRadius, y + height);
      squircleShape.lineTo(x + cornerRadius, y + height);
      squircleShape.quadraticCurveTo(x, y + height, x, y + height - cornerRadius);
      squircleShape.lineTo(x, y + cornerRadius);
      squircleShape.quadraticCurveTo(x, y, x + cornerRadius, y);

      const extrudeSettings: THREE.ExtrudeGeometryOptions = {
        depth: chassisDepth,
        bevelEnabled: true,
        bevelSegments: 8,
        steps: 1,
        bevelSize: 0.08,
        bevelThickness: 0.08,
      };

      const chassisGeo = new THREE.ExtrudeGeometry(squircleShape, extrudeSettings);
      chassisGeo.center();

      // Bright, radiant Apple-grade Silver Anodized Aluminum Material
      const macChassisMat = new THREE.MeshStandardMaterial({
        color: 0xd8dae2,
        roughness: 0.24,
        metalness: 0.88,
      });

      const chassisMesh = new THREE.Mesh(chassisGeo, macChassisMat);
      chassisMesh.rotation.x = Math.PI / 2;
      node.add(chassisMesh);

      const chassisEdges = new THREE.EdgesGeometry(chassisGeo, 25);
      const chassisWire = new THREE.LineSegments(
        chassisEdges,
        new THREE.LineBasicMaterial({ color: 0x99ccff, transparent: true, opacity: 0.45 })
      );
      chassisWire.rotation.x = Math.PI / 2;
      node.add(chassisWire);

      // Base Pedestal & Intake Airflow Ring
      const basePedestalGeo = new THREE.CylinderGeometry(1.4, 1.4, 0.16, 48);
      const basePedestalMat = new THREE.MeshStandardMaterial({
        color: 0x181a20,
        roughness: 0.45,
        metalness: 0.8,
      });
      const basePedestal = new THREE.Mesh(basePedestalGeo, basePedestalMat);
      basePedestal.position.y = -chassisDepth / 2 - 0.08;
      node.add(basePedestal);

      const intakeRingGeo = new THREE.TorusGeometry(1.35, 0.04, 12, 48);
      const intakeRing = new THREE.Mesh(intakeRingGeo, brushedSilverMat);
      intakeRing.rotation.x = Math.PI / 2;
      intakeRing.position.y = -chassisDepth / 2 - 0.02;
      node.add(intakeRing);

      // Front Face Precision IO
      const frontGroup = new THREE.Group();
      frontGroup.position.z = height / 2 + 0.09;
      node.add(frontGroup);

      // Status LED (active cyan beacon)
      const ledGeo = new THREE.SphereGeometry(0.045, 16, 16);
      const ledMesh = new THREE.Mesh(ledGeo, cyanGlowMat);
      ledMesh.position.set(-1.4, -0.4, 0);
      ledMesh.name = "validatorLed";
      frontGroup.add(ledMesh);

      // Front Dual Thunderbolt / USB-C Ports with silver bezels
      const portBezelMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.15, metalness: 0.95 });
      const portInnerMat = new THREE.MeshStandardMaterial({ color: 0x050608, roughness: 0.2, metalness: 0.9 });
      const usbGeo = new THREE.BoxGeometry(0.2, 0.08, 0.03);
      const usbInnerGeo = new THREE.BoxGeometry(0.15, 0.05, 0.035);

      const usb1 = new THREE.Mesh(usbGeo, portBezelMat);
      usb1.position.set(-0.5, -0.4, 0);
      const usb1Inner = new THREE.Mesh(usbInnerGeo, portInnerMat);
      usb1.add(usb1Inner);
      frontGroup.add(usb1);

      const usb2 = new THREE.Mesh(usbGeo, portBezelMat);
      usb2.position.set(-0.15, -0.4, 0);
      const usb2Inner = new THREE.Mesh(usbInnerGeo, portInnerMat);
      usb2.add(usb2Inner);
      frontGroup.add(usb2);

      // Front SDXC Card Slot with silver bezel
      const sdGeo = new THREE.BoxGeometry(0.44, 0.06, 0.03);
      const sdInnerGeo = new THREE.BoxGeometry(0.38, 0.035, 0.035);
      const sdSlot = new THREE.Mesh(sdGeo, portBezelMat);
      sdSlot.position.set(0.45, -0.4, 0);
      const sdInner = new THREE.Mesh(sdInnerGeo, portInnerMat);
      sdSlot.add(sdInner);
      frontGroup.add(sdSlot);

      // Rear Exhaust & IO Matrix
      const rearGroup = new THREE.Group();
      rearGroup.position.z = -height / 2 - 0.09;
      node.add(rearGroup);

      const exhaustGeo = new THREE.RingGeometry(0.4, 1.2, 32);
      const exhaustMesh = new THREE.Mesh(
        exhaustGeo,
        new THREE.MeshBasicMaterial({ color: 0x15161b, side: THREE.DoubleSide })
      );
      exhaustMesh.position.y = 0.2;
      rearGroup.add(exhaustMesh);

      const rearPortGeo = new THREE.BoxGeometry(0.16, 0.06, 0.03);
      for (let r = 0; r < 4; r++) {
        const tb = new THREE.Mesh(rearPortGeo, portInnerMat);
        tb.position.set(-0.8 + r * 0.25, -0.45, 0);
        rearGroup.add(tb);
      }
      const powerInletGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.04, 24);
      const powerInlet = new THREE.Mesh(powerInletGeo, portInnerMat);
      powerInlet.rotation.x = Math.PI / 2;
      powerInlet.position.set(1.0, -0.45, 0);
      rearGroup.add(powerInlet);

      // Top Architectural Emblem (Polished Silver Laser Emblem)
      const topEmblemGeo = new THREE.RingGeometry(0.28, 0.32, 32);
      const topEmblem = new THREE.Mesh(
        topEmblemGeo,
        new THREE.MeshBasicMaterial({ color: 0x61e7ff, transparent: true, opacity: 0.85, side: THREE.DoubleSide })
      );
      topEmblem.rotation.x = -Math.PI / 2;
      topEmblem.position.y = chassisDepth / 2 + 0.085;
      node.add(topEmblem);

      const topInnerDiscGeo = new THREE.CircleGeometry(0.25, 32);
      const topInnerDisc = new THREE.Mesh(
        topInnerDiscGeo,
        new THREE.MeshStandardMaterial({ color: 0xe8eaf2, metalness: 0.98, roughness: 0.08 })
      );
      topInnerDisc.rotation.x = -Math.PI / 2;
      topInnerDisc.position.y = chassisDepth / 2 + 0.086;
      node.add(topInnerDisc);

      // Internal Copper Thermal Core (Visible during assembly)
      const internalGroup = new THREE.Group();
      node.add(internalGroup);

      const copperBlockGeo = new THREE.BoxGeometry(1.6, 0.5, 1.6);
      const copperBlockMat = new THREE.MeshStandardMaterial({ color: 0xb87333, roughness: 0.2, metalness: 0.95 });
      const copperBlock = new THREE.Mesh(copperBlockGeo, copperBlockMat);
      copperBlock.position.y = 0.1;
      internalGroup.add(copperBlock);

      return node;
    }

    const NODE_COUNT = 8;
    const computeNodes: THREE.Group[] = [];
    const networkRingGroup = new THREE.Group();
    masterWorld.add(networkRingGroup);
    networkRingGroup.scale.set(0.001, 0.001, 0.001);

    const RING_RADIUS = 12.5;

    for (let i = 0; i < NODE_COUNT; i++) {
      const nodeObj = createComputeNodeMesh();
      nodeObj.scale.set(0.72, 0.72, 0.72);
      nodeObj.userData = {
        index: i,
        angle: (i / NODE_COUNT) * Math.PI * 2,
      };
      networkRingGroup.add(nodeObj);
      computeNodes.push(nodeObj);
    }

    // =========================================================================
    // STAGE 07 & 08: THICK BRIGHT WHITE TOPOLOGY INTERCONNECT BEAMS
    // =========================================================================
    const connectionLinesGroup = new THREE.Group();
    networkRingGroup.add(connectionLinesGroup);

    const whiteNeighborMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.95,
    });

    const whiteChordMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.7,
    });

    const unitBeamGeo = new THREE.CylinderGeometry(1, 1, 1, 16);

    const networkEdges: { from: number; to: number; isNeighbor: boolean; mesh: THREE.Mesh }[] = [];

    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const isNeighbor = j - i === 1 || (i === 0 && j === NODE_COUNT - 1);
        const isChord = j - i === 2 || j - i === 4;

        if (isNeighbor || isChord) {
          const beamMesh = new THREE.Mesh(unitBeamGeo, isNeighbor ? whiteNeighborMat : whiteChordMat);
          connectionLinesGroup.add(beamMesh);
          beamMesh.visible = false;
          networkEdges.push({ from: i, to: j, isNeighbor, mesh: beamMesh });
        }
      }
    }

    // Circulating Gossip Packets (glowing cyan spheres)
    const PACKET_COUNT = 16;
    const packets: {
      mesh: THREE.Mesh;
      edgeIndex: number;
      progress: number;
      speed: number;
    }[] = [];
    const pktGeo = new THREE.SphereGeometry(0.24, 16, 16);

    for (let p = 0; p < PACKET_COUNT; p++) {
      const pMesh = new THREE.Mesh(pktGeo, cyanGlowMat);
      networkRingGroup.add(pMesh);
      pMesh.visible = false;
      packets.push({
        mesh: pMesh,
        edgeIndex: p % networkEdges.length,
        progress: Math.random(),
        speed: 0.007 + Math.random() * 0.005,
      });
    }

    // =========================================================================
    // STAGE 09 & 10: CRYPTOGRAPHIC SIGNED MESSAGE PACKET (DATA ENVELOPE)
    // =========================================================================
    const transactionGroup = new THREE.Group();
    masterWorld.add(transactionGroup);
    transactionGroup.scale.set(0.001, 0.001, 0.001);

    const envGeo = new THREE.BoxGeometry(2.5, 1.5, 0.12);
    const envMesh = new THREE.Mesh(envGeo, glassMat);
    transactionGroup.add(envMesh);

    const envEdges = new THREE.EdgesGeometry(envGeo);
    const envWire = new THREE.LineSegments(
      envEdges,
      new THREE.LineBasicMaterial({ color: 0x61e7ff, transparent: true, opacity: 0.85 })
    );
    transactionGroup.add(envWire);

    const headerGeo = new THREE.BoxGeometry(2.2, 0.22, 0.04);
    const headerMesh = new THREE.Mesh(
      headerGeo,
      new THREE.MeshStandardMaterial({ color: 0x181a20, roughness: 0.3, metalness: 0.9 })
    );
    headerMesh.position.set(0, 0.48, 0.07);
    transactionGroup.add(headerMesh);

    const addrGeo = new THREE.BoxGeometry(0.35, 0.08, 0.02);
    const senderAddr = new THREE.Mesh(addrGeo, cyanGlowMat);
    senderAddr.position.set(-0.7, 0.48, 0.1);
    transactionGroup.add(senderAddr);

    const arrowGeo = new THREE.BoxGeometry(0.12, 0.02, 0.02);
    const arrow = new THREE.Mesh(arrowGeo, brushedSilverMat);
    arrow.position.set(0, 0.48, 0.1);
    transactionGroup.add(arrow);

    const recipientAddr = new THREE.Mesh(
      addrGeo,
      new THREE.MeshBasicMaterial({ color: 0xffaa00 })
    );
    recipientAddr.position.set(0.7, 0.48, 0.1);
    transactionGroup.add(recipientAddr);

    const regGeo = new THREE.BoxGeometry(0.45, 0.16, 0.04);
    for (let r = 0; r < 3; r++) {
      const reg = new THREE.Mesh(regGeo, cyanGlowMat);
      reg.position.set(-0.65 + r * 0.65, 0.08, 0.07);
      transactionGroup.add(reg);
    }

    const reg2Geo = new THREE.BoxGeometry(0.9, 0.12, 0.04);
    const reg2 = new THREE.Mesh(
      reg2Geo,
      new THREE.MeshStandardMaterial({ color: 0x222630, roughness: 0.2, metalness: 0.8 })
    );
    reg2.position.set(-0.45, -0.2, 0.07);
    transactionGroup.add(reg2);

    const sealGroup = new THREE.Group();
    sealGroup.position.set(0.65, -0.28, 0.09);
    transactionGroup.add(sealGroup);

    const sealDiskGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.05, 32);
    const sealDiskMat = new THREE.MeshStandardMaterial({
      color: 0xffc837,
      metalness: 0.95,
      roughness: 0.15,
      emissive: 0xaa7700,
      emissiveIntensity: 0.3,
    });
    const sealDisk = new THREE.Mesh(sealDiskGeo, sealDiskMat);
    sealDisk.rotation.x = Math.PI / 2;
    sealGroup.add(sealDisk);

    const sealRingGeo = new THREE.TorusGeometry(0.24, 0.025, 12, 32);
    const sealRing = new THREE.Mesh(sealRingGeo, brushedSilverMat);
    sealGroup.add(sealRing);

    const keyBarGeo = new THREE.BoxGeometry(0.22, 0.04, 0.02);
    const keyBar = new THREE.Mesh(keyBarGeo, cyanGlowMat);
    sealGroup.add(keyBar);

    // =========================================================================
    // STAGE 10: 8-NODE BROADCAST PACKET CLONES
    // =========================================================================
    const broadcastGroup = new THREE.Group();
    masterWorld.add(broadcastGroup);
    const broadcastMeshes: THREE.Group[] = [];

    function createBroadcastPacketMesh(): THREE.Group {
      const pkt = new THREE.Group();
      const pGeo = new THREE.BoxGeometry(1.6, 0.95, 0.08);
      const pMesh = new THREE.Mesh(pGeo, glassMat);
      pkt.add(pMesh);

      const pWire = new THREE.LineSegments(
        new THREE.EdgesGeometry(pGeo),
        new THREE.LineBasicMaterial({ color: 0x61e7ff })
      );
      pkt.add(pWire);

      const pSeal = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.2, 0.04, 24),
        new THREE.MeshStandardMaterial({ color: 0xffc837, metalness: 0.9, roughness: 0.2 })
      );
      pSeal.rotation.x = Math.PI / 2;
      pSeal.position.set(0.42, -0.15, 0.05);
      pkt.add(pSeal);

      pkt.visible = false;
      return pkt;
    }

    for (let b = 0; b < NODE_COUNT; b++) {
      const bMesh = createBroadcastPacketMesh();
      broadcastGroup.add(bMesh);
      broadcastMeshes.push(bMesh);
    }

    // Green Checkmark Acceptance Badges for all 8 Nodes
    const greenTicks: THREE.Group[] = [];
    computeNodes.forEach((node) => {
      const tickGroup = new THREE.Group();
      tickGroup.position.set(0, 1.6, 0);

      const diskGeo = new THREE.RingGeometry(0.38, 0.48, 32);
      const diskMat = new THREE.MeshBasicMaterial({
        color: 0x00ff88,
        side: THREE.DoubleSide,
      });
      const disk = new THREE.Mesh(diskGeo, diskMat);
      tickGroup.add(disk);

      const checkShape = new THREE.Shape();
      checkShape.moveTo(-0.22, 0.0);
      checkShape.lineTo(-0.06, -0.16);
      checkShape.lineTo(0.24, 0.18);
      checkShape.lineTo(0.18, 0.24);
      checkShape.lineTo(-0.06, -0.06);
      checkShape.lineTo(-0.16, 0.06);
      checkShape.closePath();

      const checkGeo = new THREE.ShapeGeometry(checkShape);
      const checkMesh = new THREE.Mesh(checkGeo, diskMat);
      checkMesh.position.z = 0.02;
      tickGroup.add(checkMesh);

      tickGroup.scale.set(0.001, 0.001, 0.001);
      node.add(tickGroup);
      greenTicks.push(tickGroup);
    });

    function createBlockBadgeTexture(blockNumber: string, statusText: string): THREE.CanvasTexture {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#0c0e14";
        ctx.fillRect(0, 0, 512, 512);

        ctx.strokeStyle = "#61e7ff";
        ctx.lineWidth = 14;
        ctx.strokeRect(16, 16, 480, 480);

        ctx.fillStyle = "#61e7ff";
        ctx.font = "bold 34px monospace";
        ctx.textAlign = "center";
        ctx.fillText("BLOCK", 256, 120);

        ctx.fillStyle = "#ffffff";
        ctx.font = "900 160px monospace";
        ctx.fillText(blockNumber, 256, 270);

        ctx.fillStyle = "#00ff88";
        ctx.font = "bold 32px monospace";
        ctx.fillText(statusText, 256, 380);

        ctx.fillStyle = "#667788";
        ctx.font = "20px monospace";
        ctx.fillText(`0x${blockNumber.padStart(2, "0")}f7c4b9...`, 256, 430);
      }
      return new THREE.CanvasTexture(canvas);
    }

    // =========================================================================
    // STAGE 13: DEDICATED SINGLE BLOCK CUBE (NUMBERED "10")
    // =========================================================================
    function createBlockCube(blockNumber: string, status: string): THREE.Group {
      const blk = new THREE.Group();

      const cubeGeo = new THREE.BoxGeometry(3.2, 3.2, 3.2);
      const cubeMesh = new THREE.Mesh(cubeGeo, glassMat);
      blk.add(cubeMesh);

      const cubeEdges = new THREE.EdgesGeometry(cubeGeo);
      const cubeWire = new THREE.LineSegments(
        cubeEdges,
        new THREE.LineBasicMaterial({ color: 0x61e7ff, transparent: true, opacity: 0.9 })
      );
      blk.add(cubeWire);

      const badgeTex = createBlockBadgeTexture(blockNumber, status);
      const badgeMat = new THREE.MeshBasicMaterial({ map: badgeTex, transparent: true });

      const frontFace = new THREE.Mesh(new THREE.PlaneGeometry(3.1, 3.1), badgeMat);
      frontFace.position.z = 1.61;
      blk.add(frontFace);

      const backFace = frontFace.clone();
      backFace.rotation.y = Math.PI;
      backFace.position.z = -1.61;
      blk.add(backFace);

      const innerCoreGeo = new THREE.OctahedronGeometry(0.85);
      const innerCoreMat = new THREE.MeshStandardMaterial({
        color: 0x61e7ff,
        emissive: 0x00a8ff,
        emissiveIntensity: 0.6,
        roughness: 0.1,
        metalness: 0.9,
      });
      const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat);
      blk.add(innerCore);

      return blk;
    }

    const singleBlock10Group = new THREE.Group();
    masterWorld.add(singleBlock10Group);
    const block10Mesh = createBlockCube("10", "✓ VALIDATED");
    singleBlock10Group.add(block10Mesh);
    singleBlock10Group.scale.set(0.001, 0.001, 0.001);

    // =========================================================================
    // STAGE 14, 15, 16: IMMUTABLE BLOCKCHAIN & INTERLOCKING STEEL CHAINS
    // =========================================================================
    const blockchainGroup = new THREE.Group();
    masterWorld.add(blockchainGroup);
    blockchainGroup.position.set(0, -5.2, 0);
    blockchainGroup.scale.set(0.001, 0.001, 0.001);

    const steelChainMat = new THREE.MeshStandardMaterial({
      color: 0xd0d4dc,
      roughness: 0.18,
      metalness: 0.96,
    });

    function createSingleChainLinkMesh(material: THREE.Material): THREE.Mesh {
      const r = 0.38;
      const hw = 0.32;
      const points = [
        new THREE.Vector3(-hw, r, 0),
        new THREE.Vector3(-hw - r * 0.7, r * 0.7, 0),
        new THREE.Vector3(-hw - r, 0, 0),
        new THREE.Vector3(-hw - r * 0.7, -r * 0.7, 0),
        new THREE.Vector3(-hw, -r, 0),
        new THREE.Vector3(hw, -r, 0),
        new THREE.Vector3(hw + r * 0.7, -r * 0.7, 0),
        new THREE.Vector3(hw + r, 0, 0),
        new THREE.Vector3(hw + r * 0.7, r * 0.7, 0),
        new THREE.Vector3(hw, r, 0),
      ];
      const curve = new THREE.CatmullRomCurve3(points, true, "catmullrom", 0.05);
      const geo = new THREE.TubeGeometry(curve, 48, 0.065, 16, true);
      return new THREE.Mesh(geo, material);
    }

    function createInterlockingChainSegment(startX: number, endX: number, linkCount: number = 4): THREE.Group {
      const chainGroup = new THREE.Group();
      const span = endX - startX;

      for (let k = 0; k < linkCount; k++) {
        const link = createSingleChainLinkMesh(steelChainMat);
        const t = (k + 0.5) / linkCount;
        link.position.x = startX + t * span;
        link.position.y = 0;
        link.position.z = 0;
        link.rotation.x = k % 2 === 0 ? 0 : Math.PI / 2;
        chainGroup.add(link);
      }
      return chainGroup;
    }

    const BLOCK_SPACING = 5.4;
    const existingBlocks: THREE.Group[] = [];
    const chainSegments: THREE.Group[] = [];

    const existingBlockNumbers = ["07", "08", "09"];
    for (let b = 0; b < 3; b++) {
      const blk = createBlockCube(existingBlockNumbers[b], "IMMUTABLE");
      blk.position.set((b - 1.5) * BLOCK_SPACING, 0, 0);
      blockchainGroup.add(blk);
      existingBlocks.push(blk);

      if (b > 0) {
        const startX = (b - 1 - 1.5) * BLOCK_SPACING + 1.6;
        const endX = (b - 1.5) * BLOCK_SPACING - 1.6;
        const chain = createInterlockingChainSegment(startX, endX, 4);
        blockchainGroup.add(chain);
        chainSegments.push(chain);
      }
    }

    const startX3 = (2 - 1.5) * BLOCK_SPACING + 1.6;
    const endX3 = (3 - 1.5) * BLOCK_SPACING - 1.6;
    const new3rdChain = createInterlockingChainSegment(startX3, endX3, 4);
    blockchainGroup.add(new3rdChain);
    new3rdChain.visible = false;

    // =========================================================================
    // GSAP SCROLLTRIGGER MASTER TIMELINE & INTERPOLATION
    // =========================================================================
    const animationState = {
      progress: 0,
      camX: 1.0,
      camY: 1.8,
      camZ: 4.8,
      lookX: 0,
      lookY: 0.15,
      lookZ: 0,
      granulesMeltProgress: 0,
      granulesScale: 1.0,
      thermalEmission: 0,
      moltenPoolScale: 0.001,
      waferScale: 0.001,
      waferRotY: 0,
      chipScale: 0.001,
      nodeAssemblyProgress: 0,
      nodeReplicationCount: 1,
      networkRingScale: 0.001,
      networkEdgesOpacity: 0,
      gossipPacketsVisible: false,
      txVisible: false,
      txPositionX: 0,
      txPositionY: 0,
      txPositionZ: 0,
      broadcastProgress: 0,
      broadcastOpacity: 0,
      validationLevel: 0,
      greenTicksScale: 0,
      consensusPulse: 0,
      singleBlock10Scale: 0.001,
      block10DockProgress: 0,
      blockchainScale: 0.001,
      finalWideProgress: 0,
    };

    const masterTimeline = gsap.timeline({ paused: true });

    // 0.00 -> 0.08: STAGE 01 RAW SILICA GRANULES
    masterTimeline.to(
      animationState,
      {
        camX: 1.5,
        camY: 2.0,
        camZ: 5.2,
        lookX: 0,
        lookY: 0.15,
        lookZ: 0,
        granulesMeltProgress: 0,
        granulesScale: 1.0,
        duration: 0.08,
      },
      0
    );

    // 0.08 -> 0.16: STAGE 02 INDUCTION MELTING
    masterTimeline.to(
      animationState,
      {
        camX: 1.8,
        camY: 2.2,
        camZ: 4.8,
        lookX: 0,
        lookY: 0.1,
        lookZ: 0,
        granulesMeltProgress: 1.0,
        granulesScale: 0.001,
        thermalEmission: 0,
        moltenPoolScale: 0.001,
        waferScale: 1.0,
        duration: 0.08,
      },
      0.08
    );

    masterTimeline.to(
      animationState,
      {
        thermalEmission: 1.0,
        moltenPoolScale: 1.0,
        duration: 0.035,
      },
      0.08
    );
    masterTimeline.to(
      animationState,
      {
        thermalEmission: 0,
        moltenPoolScale: 0.001,
        duration: 0.04,
      },
      0.115
    );

    // 0.16 -> 0.25: STAGE 03 MONOCRYSTALLINE WAFER
    masterTimeline.to(
      animationState,
      {
        camX: 0,
        camY: 5.2,
        camZ: 7.2,
        lookX: 0,
        lookY: 0,
        lookZ: 0,
        granulesScale: 0.001,
        moltenPoolScale: 0.001,
        thermalEmission: 0,
        waferScale: 1.0,
        waferRotY: Math.PI * 1.5,
        duration: 0.09,
      },
      0.16
    );

    // 0.25 -> 0.35: STAGE 04 FLIP-CHIP MICROPROCESSOR
    masterTimeline.to(
      animationState,
      {
        camX: 1.8,
        camY: 3.2,
        camZ: 4.5,
        lookX: 0,
        lookY: 0.1,
        lookZ: 0,
        waferScale: 0.001,
        chipScale: 1.0,
        duration: 0.1,
      },
      0.25
    );

    // 0.35 -> 0.45: STAGE 05 UNIBODY COMPUTE NODE (Silver Aluminum Workstation)
    masterTimeline.to(
      animationState,
      {
        camX: 3.2,
        camY: 2.2,
        camZ: 5.2,
        lookX: 0,
        lookY: 0,
        lookZ: 0,
        chipScale: 0.001,
        nodeAssemblyProgress: 1.0,
        networkRingScale: 0.95,
        nodeReplicationCount: 1,
        duration: 0.1,
      },
      0.35
    );

    // 0.45 -> 0.55: STAGE 06 ARCHITECTURAL REPLICATION (1 -> 8 Nodes)
    masterTimeline.to(
      animationState,
      {
        camX: 0,
        camY: 16.5,
        camZ: 21.0,
        lookX: 0,
        lookY: 0,
        lookZ: 0,
        nodeReplicationCount: 8,
        networkRingScale: 1.0,
        duration: 0.1,
      },
      0.45
    );

    // 0.55 -> 0.65: STAGE 07 DISTRIBUTED RING TOPOLOGY
    masterTimeline.to(
      animationState,
      {
        camX: 0,
        camY: 18.0,
        camZ: 19.5,
        lookX: 0,
        lookY: 0,
        lookZ: 0,
        networkEdgesOpacity: 1.0,
        duration: 0.1,
      },
      0.55
    );

    // 0.65 -> 0.72: STAGE 08 GOSSIP TRAFFIC
    masterTimeline.to(
      animationState,
      {
        camX: 0,
        camY: 17.0,
        camZ: 18.5,
        gossipPacketsVisible: true,
        duration: 0.07,
      },
      0.65
    );

    // 0.72 -> 0.80: STAGE 09 SIGNED TRANSACTION ORIGIN (Node 0)
    masterTimeline.to(
      animationState,
      {
        camX: 0,
        camY: 20.0,
        camZ: 23.0,
        lookX: 0,
        lookY: 0,
        lookZ: 0,
        txVisible: true,
        txPositionX: RING_RADIUS,
        txPositionY: 1.5,
        txPositionZ: 0,
        broadcastProgress: 0,
        broadcastOpacity: 0,
        duration: 0.08,
      },
      0.72
    );

    // 0.80 -> 0.86: STAGE 10 NETWORK-WIDE GOSSIP BROADCAST
    masterTimeline.to(
      animationState,
      {
        camX: 0,
        camY: 20.0,
        camZ: 23.0,
        lookX: 0,
        lookY: 0,
        lookZ: 0,
        txPositionX: RING_RADIUS,
        txPositionY: 1.5,
        txPositionZ: 0,
        broadcastProgress: 1.0,
        broadcastOpacity: 1.0,
        duration: 0.06,
      },
      0.8
    );

    // 0.86 -> 0.90: STAGE 11 PARALLEL MULTI-NODE VALIDATION
    masterTimeline.to(
      animationState,
      {
        camX: 0,
        camY: 20.0,
        camZ: 22.0,
        validationLevel: 1.0,
        greenTicksScale: 0.2,
        duration: 0.04,
      },
      0.86
    );

    // 0.90 -> 0.93: STAGE 12 TRANSACTION ACCEPTED (Green Ticks)
    masterTimeline.to(
      animationState,
      {
        camX: 0,
        camY: 18.0,
        camZ: 20.0,
        greenTicksScale: 1.0,
        consensusPulse: 1.0,
        duration: 0.03,
      },
      0.9
    );

    // 0.93 -> 0.96: STAGE 13 BLOCK #10 SYNTHESIS AT CENTER
    masterTimeline.to(
      animationState,
      {
        camX: 0,
        camY: 2.2,
        camZ: 7.8,
        lookX: 0,
        lookY: 0,
        lookZ: 0,
        singleBlock10Scale: 1.0,
        txVisible: false,
        broadcastOpacity: 0,
        greenTicksScale: 0,
        duration: 0.03,
      },
      0.93
    );

    // 0.96 -> 0.98: STAGE 14 EXISTING BLOCKCHAIN REVEAL
    masterTimeline.to(
      animationState,
      {
        camX: 0,
        camY: -2.0,
        camZ: 14.0,
        lookX: 0,
        lookY: -4.8,
        lookZ: 0,
        blockchainScale: 1.0,
        duration: 0.02,
      },
      0.96
    );

    // 0.98 -> 0.995: STAGE 15 BLOCK #10 DOCKS WITH 3RD STEEL CHAIN
    masterTimeline.to(
      animationState,
      {
        camX: (3 - 1.5) * BLOCK_SPACING * 0.4,
        camY: -2.5,
        camZ: 12.0,
        lookX: (3 - 1.5) * BLOCK_SPACING * 0.4,
        lookY: -5.0,
        lookZ: 0,
        block10DockProgress: 1.0,
        duration: 0.015,
      },
      0.98
    );

    // 0.995 -> 1.00: STAGE 16 UNIFIED SYSTEM OVERVIEW
    masterTimeline.to(
      animationState,
      {
        camX: 0,
        camY: -1.0,
        camZ: 26.0,
        lookX: 0,
        lookY: -2.5,
        lookZ: 0,
        finalWideProgress: 1.0,
        duration: 0.005,
      },
      0.995
    );

    // 4. GSAP SCROLLTRIGGER
    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.65,
      onUpdate: (self) => {
        const p = self.progress;
        masterTimeline.progress(p);
        setCurrentProgress(p);

        const active = STAGES.find((s) => p >= s.range[0] && p < s.range[1]) || STAGES[STAGES.length - 1];
        setActiveStage(active);
      },
    });

    // 5. ANIMATION & RENDER LOOP
    let reqId: number;
    const startTime = performance.now();

    function render() {
      reqId = requestAnimationFrame(render);
      const elapsed = (performance.now() - startTime) * 0.001;

      camera.position.set(animationState.camX, animationState.camY, animationState.camZ);
      camera.lookAt(animationState.lookX, animationState.lookY, animationState.lookZ);

      // STAGE 01 & 02: Micro-Granules Simulation & Induction Melt
      const meltT = animationState.granulesMeltProgress;
      const gScale = animationState.granulesScale;

      if (gScale > 0.005) {
        granuleInstancedMesh.visible = true;
        for (let g = 0; g < GRANULE_COUNT; g++) {
          const item = granuleData[g];

          item.currentPos.lerpVectors(item.initialPos, item.targetMoltenPos, meltT);

          if (meltT > 0.05) {
            const jitter = (1 - meltT) * 0.04;
            item.currentPos.x += (Math.random() - 0.5) * jitter;
            item.currentPos.z += (Math.random() - 0.5) * jitter;
          }

          item.rotation.x += item.rotSpeed.x * (1 - meltT * 0.8);
          item.rotation.y += item.rotSpeed.y * (1 - meltT * 0.8);
          item.rotation.z += item.rotSpeed.z * (1 - meltT * 0.8);

          const s = item.scale * gScale * (1 - meltT * 0.6);
          dummy.position.copy(item.currentPos);
          dummy.rotation.copy(item.rotation);
          dummy.scale.set(s, s, s);
          dummy.updateMatrix();

          granuleInstancedMesh.setMatrixAt(g, dummy.matrix);

          if (meltT > 0.01) {
            const heat = Math.min(meltT * 1.5, 1.0);
            colorDummy.r = THREE.MathUtils.lerp(item.baseColor.r, 1.0, heat);
            colorDummy.g = THREE.MathUtils.lerp(item.baseColor.g, 0.32, heat);
            colorDummy.b = THREE.MathUtils.lerp(item.baseColor.b, 0.05, heat);
            granuleInstancedMesh.setColorAt(g, colorDummy);
          } else {
            granuleInstancedMesh.setColorAt(g, item.baseColor);
          }
        }
        granuleInstancedMesh.instanceMatrix.needsUpdate = true;
        if (granuleInstancedMesh.instanceColor) {
          granuleInstancedMesh.instanceColor.needsUpdate = true;
        }
      } else {
        granuleInstancedMesh.visible = false;
      }

      // Molten pool surface
      const poolScale = animationState.moltenPoolScale;
      moltenPoolMesh.scale.set(poolScale, poolScale, poolScale);
      moltenPoolMat.emissiveIntensity = animationState.thermalEmission * 1.8;
      inductionHeatLight.intensity = animationState.thermalEmission * 4.0;

      // STAGE 03: Silicon Wafer
      const wScale = animationState.waferScale;
      waferGroup.scale.set(wScale, wScale, wScale);
      waferGroup.rotation.y = elapsed * 0.25 + animationState.waferRotY;

      // STAGE 04: Microchip
      const chScale = animationState.chipScale;
      chipGroup.scale.set(chScale, chScale, chScale);
      chipGroup.rotation.y = elapsed * 0.2;

      // STAGE 05, 06, 07: Compute Nodes & Ring Network
      const ringScale = animationState.networkRingScale;
      networkRingGroup.scale.set(ringScale, ringScale, ringScale);

      const visibleCount = Math.min(Math.max(Math.floor(animationState.nodeReplicationCount), 1), NODE_COUNT);
      computeNodes.forEach((node, idx) => {
        if (idx < visibleCount) {
          node.visible = true;
          const angle = node.userData.angle;
          const targetX = Math.cos(angle) * RING_RADIUS;
          const targetZ = Math.sin(angle) * RING_RADIUS;

          if (visibleCount === 1) {
            node.position.set(0, 0, 0);
            node.rotation.y = elapsed * 0.25;
          } else {
            node.position.x += (targetX - node.position.x) * 0.1;
            node.position.z += (targetZ - node.position.z) * 0.1;
            node.rotation.y = -angle + Math.PI / 2;
          }

          const led = node.getObjectByName("validatorLed") as THREE.Mesh;
          if (led) {
            if (animationState.validationLevel > 0) {
              const pulse = Math.sin(elapsed * 8 + idx) > 0;
              (led.material as THREE.MeshBasicMaterial).color.setHex(pulse ? 0x00ff88 : 0x111215);
            } else {
              (led.material as THREE.MeshBasicMaterial).color.setHex(0x61e7ff);
            }
          }
        } else {
          node.visible = false;
        }
      });

      // Green Checkmark Acceptance Badges (Stage 12)
      const tickS = animationState.greenTicksScale;
      greenTicks.forEach((tick, i) => {
        if (tickS > 0.01 && i < visibleCount) {
          tick.scale.set(tickS, tickS, tickS);
          tick.rotation.y = elapsed * 1.5;
        } else {
          tick.scale.set(0.001, 0.001, 0.001);
        }
      });

      // Thick Bright White Topology Beams (Stage 07 & 08)
      const edgeOpacity = animationState.networkEdgesOpacity;
      const upVec = new THREE.Vector3(0, 1, 0);
      const dirVec = new THREE.Vector3();

      networkEdges.forEach((edge) => {
        if (edgeOpacity > 0.01 && visibleCount >= 8) {
          edge.mesh.visible = true;
          const p1 = computeNodes[edge.from].position;
          const p2 = computeNodes[edge.to].position;
          const dist = p1.distanceTo(p2);

          if (dist > 0.01) {
            edge.mesh.position.copy(p1).add(p2).multiplyScalar(0.5);
            dirVec.subVectors(p2, p1).normalize();
            edge.mesh.quaternion.setFromUnitVectors(upVec, dirVec);
            const radius = edge.isNeighbor ? 0.08 : 0.05;
            edge.mesh.scale.set(radius, dist, radius);
            (edge.mesh.material as THREE.MeshBasicMaterial).opacity = edgeOpacity * (edge.isNeighbor ? 0.95 : 0.7);
          }
        } else {
          edge.mesh.visible = false;
        }
      });

      // Gossip packets
      if (animationState.gossipPacketsVisible && visibleCount >= 8) {
        packets.forEach((pkt) => {
          pkt.mesh.visible = true;
          pkt.progress = (pkt.progress + pkt.speed) % 1.0;
          const edge = networkEdges[pkt.edgeIndex];
          if (edge) {
            const p1 = computeNodes[edge.from].position;
            const p2 = computeNodes[edge.to].position;
            pkt.mesh.position.lerpVectors(p1, p2, pkt.progress);
            pkt.mesh.position.y += Math.sin(pkt.progress * Math.PI) * 0.6;
          }
        });
      } else {
        packets.forEach((pkt) => (pkt.mesh.visible = false));
      }

      // STAGE 09: Signed Transaction Packet
      if (animationState.txVisible) {
        transactionGroup.visible = true;
        transactionGroup.position.set(
          animationState.txPositionX,
          animationState.txPositionY + Math.sin(elapsed * 2.5) * 0.12,
          animationState.txPositionZ
        );
        transactionGroup.scale.set(1, 1, 1);
        transactionGroup.rotation.y = elapsed * 0.4;
      } else {
        transactionGroup.visible = false;
      }

      // STAGE 10: 8-Node Gossip Broadcast
      const bOpacity = animationState.broadcastOpacity;
      broadcastMeshes.forEach((pkt, i) => {
        if (bOpacity > 0.05 && visibleCount >= 8) {
          pkt.visible = true;
          const angle0 = 0;
          const originX = Math.cos(angle0) * RING_RADIUS;
          const originZ = Math.sin(angle0) * RING_RADIUS;
          const targetNode = computeNodes[i];
          const targetX = targetNode.position.x;
          const targetZ = targetNode.position.z;

          const t = animationState.broadcastProgress;
          pkt.position.x = originX + (targetX - originX) * t;
          pkt.position.z = originZ + (targetZ - originZ) * t;
          pkt.position.y = 0.8 + Math.sin(t * Math.PI) * 2.2;
          pkt.rotation.y = elapsed * 2.0 + i;
        } else {
          pkt.visible = false;
        }
      });

      // STAGE 13 & 15: Block #10
      const b10S = animationState.singleBlock10Scale;
      if (b10S > 0.005) {
        singleBlock10Group.visible = true;
        const dockT = animationState.block10DockProgress;
        const startX = 0;
        const startY = 0;
        const targetX = (3 - 1.5) * BLOCK_SPACING;
        const targetY = -5.2;

        singleBlock10Group.position.x = startX + (targetX - startX) * dockT;
        singleBlock10Group.position.y = startY + (targetY - startY) * dockT;
        singleBlock10Group.position.z = 0;
        singleBlock10Group.scale.set(b10S, b10S, b10S);

        block10Mesh.rotation.y = (1 - dockT) * (elapsed * 0.8);
      } else {
        singleBlock10Group.visible = false;
      }

      // STAGE 14, 15, 16: Blockchain
      const bcScale = animationState.blockchainScale;
      if (bcScale > 0.005) {
        blockchainGroup.visible = true;
        blockchainGroup.scale.set(bcScale, bcScale, bcScale);

        if (animationState.block10DockProgress > 0.7) {
          new3rdChain.visible = true;
        } else {
          new3rdChain.visible = false;
        }
      } else {
        blockchainGroup.visible = false;
      }

      renderer.render(scene, camera);
    }

    render();

    function handleResize() {
      if (!holder) return;
      width = holder.clientWidth || window.innerWidth;
      height = holder.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(reqId);
      scrollTriggerInstance.kill();
      renderer.dispose();
      if (holder.contains(renderer.domElement)) {
        holder.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-[#030304] text-white" style={{ height: "1600vh" }}>
      {/* Fixed 3D Viewport - 100% Unobstructed */}
      <div className="fixed inset-0 w-full h-screen overflow-hidden pointer-events-none">
        <div ref={canvasHolderRef} className="w-full h-full" />

        {/* Minimal High-Tech Telemetry HUD */}
        <div className="absolute top-6 left-8 z-20 flex items-center gap-3 font-mono text-xs tracking-widest uppercase pointer-events-auto">
          <span className="text-white/60">CINEMATIC PROTOCOL SEQUENCE</span>
          <span className="px-2 py-0.5 border border-[#61e7ff]/40 bg-[#61e7ff]/10 text-[#61e7ff] rounded-sm text-[11px] font-semibold">
            {activeStage.name}
          </span>
        </div>

        <div className="absolute top-6 right-8 z-20 font-mono text-xs tracking-wider uppercase text-right pointer-events-auto">
          <span className="text-white/40">STAGE {String(activeStage.id).padStart(2, "0")} / 16 // </span>
          <span className="text-[#61e7ff] font-bold">{(currentProgress * 100).toFixed(1)}%</span>
        </div>

        {/* Dynamic Progress Timeline at Bottom */}
        <div className="absolute bottom-6 left-8 right-8 z-20 flex justify-between items-center font-mono text-[10px] tracking-wider pointer-events-auto">
          <div className="flex items-center gap-1">
            <span className="text-white/40 mr-2">STAGES:</span>
            {STAGES.map((st) => (
              <span
                key={st.id}
                className={`px-1.5 py-0.5 rounded-sm transition-colors ${
                  activeStage.id === st.id
                    ? "bg-[#61e7ff] text-black font-bold"
                    : "text-white/30 hover:text-white/70"
                }`}
              >
                {String(st.id).padStart(2, "0")}
              </span>
            ))}
          </div>
          <div className="text-white/40 uppercase">SCROLL TO DRIVE CINEMATIC • 60 FPS WEBGL</div>
        </div>
      </div>
    </div>
  );
}
