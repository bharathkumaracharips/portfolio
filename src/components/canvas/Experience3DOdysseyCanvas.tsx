"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface Experience3DOdysseyCanvasProps {
  stageIndex: number; // 0 to 4 (0: Stage 05 CBC Chain, 1: Stage 04 Consensus, 2: Stage 03 Teaching, 3: Stage 02 Drone, 4: Stage 01 Privacy)
  onNodeClick?: (index: number) => void;
}

export const Experience3DOdysseyCanvas: React.FC<Experience3DOdysseyCanvasProps> = ({
  stageIndex,
  onNodeClick,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<number>(stageIndex);
  stageRef.current = stageIndex;

  const onNodeClickRef = useRef(onNodeClick);
  onNodeClickRef.current = onNodeClick;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId: number;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x04060a, 0.035);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 7.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // 2. Dynamic Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(5, 8, 5);
    scene.add(keyLight);

    const cyanPoint = new THREE.PointLight(0x00f0ff, 4, 20);
    cyanPoint.position.set(-3, 3, 4);
    scene.add(cyanPoint);

    const emeraldPoint = new THREE.PointLight(0x00ff66, 3, 18);
    emeraldPoint.position.set(3, -2, 3);
    scene.add(emeraldPoint);

    const purplePoint = new THREE.PointLight(0x818cf8, 2.5, 15);
    purplePoint.position.set(0, -3, 2);
    scene.add(purplePoint);

    // 3. Stage Groups Root
    const stageGroups: THREE.Group[] = [];

    // ==========================================
    // STAGE 0: CBC CHAIN (SOVEREIGN L1 GENESIS CORE)
    // ==========================================
    const cbcGroup = new THREE.Group();
    scene.add(cbcGroup);
    stageGroups.push(cbcGroup);

    // Central Crystalline Genesis Core
    const coreGeo = new THREE.OctahedronGeometry(1.2, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x050c18,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.9,
      roughness: 0.15,
      metalness: 0.9,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    cbcGroup.add(coreMesh);

    // Wireframe Outer Hull
    const hullGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const hullMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const hullMesh = new THREE.Mesh(hullGeo, hullMat);
    cbcGroup.add(hullMesh);

    // Orbiting Substrate Modular Pallets (6 nodes)
    const palletGeo = new THREE.BoxGeometry(0.35, 0.35, 0.35);
    const palletMat = new THREE.MeshStandardMaterial({
      color: 0x091428,
      emissive: 0x00ff66,
      emissiveIntensity: 0.7,
      roughness: 0.3,
      metalness: 0.8,
    });

    const cbcPallets: THREE.Mesh[] = [];
    for (let i = 0; i < 6; i++) {
      const pMesh = new THREE.Mesh(palletGeo, palletMat.clone());
      cbcGroup.add(pMesh);
      cbcPallets.push(pMesh);
    }

    // Concentric Sovereign Protocol Rings
    const ringGeo1 = new THREE.TorusGeometry(2.4, 0.02, 16, 120);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.6 });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 2.5;
    cbcGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.8, 0.015, 16, 120);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x00ff66, transparent: true, opacity: 0.5 });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 3;
    cbcGroup.add(ring2);

    // ==========================================
    // STAGE 1: TRI-CONSENSUS ENGINE (PoS / PoI / DCF)
    // ==========================================
    const consensusGroup = new THREE.Group();
    scene.add(consensusGroup);
    stageGroups.push(consensusGroup);

    // 3 Tri-Consensus Nodes arranged in a triangle
    const triPositions = [
      new THREE.Vector3(-1.6, 1.0, 0), // PoS
      new THREE.Vector3(1.6, 1.0, 0),  // PoI
      new THREE.Vector3(0, -1.5, 0),   // DCF
    ];

    const triColors = [0x00f0ff, 0x00ff66, 0x38bdf8];
    const triNodes: THREE.Mesh[] = [];

    triPositions.forEach((pos, idx) => {
      const nodeSub = new THREE.Group();
      nodeSub.position.copy(pos);

      const sphereGeo = new THREE.DodecahedronGeometry(0.65, 0);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: 0x0c1222,
        emissive: triColors[idx],
        emissiveIntensity: 0.85,
        roughness: 0.2,
        metalness: 0.85,
      });
      const mesh = new THREE.Mesh(sphereGeo, sphereMat);
      nodeSub.add(mesh);
      triNodes.push(mesh);

      // Multi-layer Validator Rings
      const valRingGeo = new THREE.TorusGeometry(0.9, 0.02, 16, 60);
      const valRingMat = new THREE.MeshBasicMaterial({ color: triColors[idx], transparent: true, opacity: 0.7 });
      const valRing = new THREE.Mesh(valRingGeo, valRingMat);
      nodeSub.add(valRing);

      consensusGroup.add(nodeSub);
    });

    // Cross-Consensus Connection Beams (Triangular lines)
    const triLineGeo = new THREE.BufferGeometry().setFromPoints([
      triPositions[0], triPositions[1],
      triPositions[1], triPositions[2],
      triPositions[2], triPositions[0],
    ]);
    const triLineMat = new THREE.LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.6 });
    const triLines = new THREE.LineSegments(triLineGeo, triLineMat);
    consensusGroup.add(triLines);

    // Central Consensus Core
    const centerCoreGeo = new THREE.IcosahedronGeometry(0.5, 0);
    const centerCoreMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x00f0ff, emissiveIntensity: 1.2 });
    const centerCore = new THREE.Mesh(centerCoreGeo, centerCoreMat);
    consensusGroup.add(centerCore);

    // ==========================================
    // STAGE 2: TEACHING & OPCODE STACK MATRIX (ONE DEV)
    // ==========================================
    const teachingGroup = new THREE.Group();
    scene.add(teachingGroup);
    stageGroups.push(teachingGroup);

    // Holographic Opcode Stack Bars (Vertical Stack)
    const stackBars: THREE.Mesh[] = [];
    const stackCount = 6;
    for (let i = 0; i < stackCount; i++) {
      const barGeo = new THREE.BoxGeometry(1.8 - i * 0.15, 0.2, 0.8);
      const barMat = new THREE.MeshStandardMaterial({
        color: 0x0a101d,
        emissive: i % 2 === 0 ? 0x00f0ff : 0x818cf8,
        emissiveIntensity: 0.6 + i * 0.1,
        roughness: 0.2,
        metalness: 0.9,
      });
      const barMesh = new THREE.Mesh(barGeo, barMat);
      barMesh.position.set(0, (i - 2.5) * 0.45, 0);
      teachingGroup.add(barMesh);
      stackBars.push(barMesh);
    }

    // Orbiting Bytecode Opcode Particles
    const opcodeCount = 40;
    const opcodeParticlesGeo = new THREE.BufferGeometry();
    const opcodePositions = new Float32Array(opcodeCount * 3);
    for (let i = 0; i < opcodeCount * 3; i += 3) {
      opcodePositions[i] = (Math.random() - 0.5) * 5;
      opcodePositions[i + 1] = (Math.random() - 0.5) * 4;
      opcodePositions[i + 2] = (Math.random() - 0.5) * 3;
    }
    opcodeParticlesGeo.setAttribute("position", new THREE.BufferAttribute(opcodePositions, 3));
    const opcodeParticleMat = new THREE.PointsMaterial({ color: 0x00f0ff, size: 0.08, transparent: true, opacity: 0.8 });
    const opcodeParticleSystem = new THREE.Points(opcodeParticlesGeo, opcodeParticleMat);
    teachingGroup.add(opcodeParticleSystem);

    // ==========================================
    // STAGE 3: DRONE TELEMETRY POLKADOT NETWORK
    // ==========================================
    const droneGroup = new THREE.Group();
    scene.add(droneGroup);
    stageGroups.push(droneGroup);

    // Central Geospatial Relay Globe
    const globeGeo = new THREE.SphereGeometry(1.3, 24, 24);
    const globeMat = new THREE.MeshStandardMaterial({
      color: 0x060c18,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.3,
      wireframe: true,
      roughness: 0.4,
    });
    const globeMesh = new THREE.Mesh(globeGeo, globeMat);
    droneGroup.add(globeMesh);

    // Orbiting Drone Relay Satellites
    const droneSatellites: THREE.Mesh[] = [];
    const droneSatGeo = new THREE.ConeGeometry(0.18, 0.4, 4);
    const droneSatMat = new THREE.MeshStandardMaterial({ color: 0x00ff66, emissive: 0x00ff66, emissiveIntensity: 1.0 });

    for (let i = 0; i < 4; i++) {
      const satMesh = new THREE.Mesh(droneSatGeo, droneSatMat);
      droneGroup.add(satMesh);
      droneSatellites.push(satMesh);
    }

    // Telemetry Orbit Rings
    const orbitRingGeo = new THREE.TorusGeometry(2.1, 0.015, 16, 100);
    const orbitRingMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.5 });
    const orbitRing = new THREE.Mesh(orbitRingGeo, orbitRingMat);
    orbitRing.rotation.x = Math.PI / 3;
    droneGroup.add(orbitRing);

    // ==========================================
    // STAGE 4: PRIVACY HEALTHCARE SHARD (ZK-SHARD)
    // ==========================================
    const privacyGroup = new THREE.Group();
    scene.add(privacyGroup);
    stageGroups.push(privacyGroup);

    // 4 Modular Encrypted Shard Cubes in Grid
    const shardCubes: THREE.Mesh[] = [];
    const shardPositions = [
      new THREE.Vector3(-0.9, 0.9, 0),
      new THREE.Vector3(0.9, 0.9, 0),
      new THREE.Vector3(-0.9, -0.9, 0),
      new THREE.Vector3(0.9, -0.9, 0),
    ];

    shardPositions.forEach((pos) => {
      const cGeo = new THREE.BoxGeometry(0.7, 0.7, 0.7);
      const cMat = new THREE.MeshStandardMaterial({
        color: 0x0a101f,
        emissive: 0x00f0ff,
        emissiveIntensity: 0.7,
        roughness: 0.2,
        metalness: 0.9,
      });
      const cMesh = new THREE.Mesh(cGeo, cMat);
      cMesh.position.copy(pos);
      privacyGroup.add(cMesh);
      shardCubes.push(cMesh);
    });

    // Surrounding ZK Cryptographic Lattice
    const zkCageGeo = new THREE.IcosahedronGeometry(2.2, 1);
    const zkCageMat = new THREE.MeshBasicMaterial({ color: 0x00ff66, wireframe: true, transparent: true, opacity: 0.35 });
    const zkCage = new THREE.Mesh(zkCageGeo, zkCageMat);
    privacyGroup.add(zkCage);

    // Global Floating Ambient Particles
    const ambientParticleCount = 100;
    const ambientParticleGeo = new THREE.BufferGeometry();
    const ambientPos = new Float32Array(ambientParticleCount * 3);
    for (let i = 0; i < ambientParticleCount * 3; i += 3) {
      ambientPos[i] = (Math.random() - 0.5) * 12;
      ambientPos[i + 1] = (Math.random() - 0.5) * 8;
      ambientPos[i + 2] = (Math.random() - 0.5) * 6;
    }
    ambientParticleGeo.setAttribute("position", new THREE.BufferAttribute(ambientPos, 3));
    const ambientParticleMat = new THREE.PointsMaterial({ color: 0x00f0ff, size: 0.04, transparent: true, opacity: 0.5 });
    const globalParticles = new THREE.Points(ambientParticleGeo, ambientParticleMat);
    scene.add(globalParticles);

    // Interactive Mouse Tilt
    const mouse = new THREE.Vector2(0, 0);
    const targetMouse = new THREE.Vector2(0, 0);

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      targetMouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    container.addEventListener("mousemove", handlePointerMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const currentStage = stageRef.current;

      // Smooth mouse follow
      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;

      camera.position.x = mouse.x * 0.8;
      camera.position.y = 1.2 + mouse.y * 0.5;
      camera.lookAt(0, 0, 0);

      // Animate Stage Visibilities with smooth scale and opacity interpolation
      stageGroups.forEach((grp, idx) => {
        const isActive = idx === currentStage;
        const targetScale = isActive ? 1.0 : 0.001;
        const targetPosY = isActive ? 0 : 4.0;

        grp.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
        grp.position.y += (targetPosY - grp.position.y) * 0.08;
        grp.visible = grp.scale.x > 0.01;
      });

      if (!prefersReducedMotion) {
        // --- STAGE 0 (CBC Genesis Core Animations) ---
        coreMesh.rotation.y = elapsedTime * 0.4;
        coreMesh.rotation.x = elapsedTime * 0.25;
        hullMesh.rotation.y = -elapsedTime * 0.3;
        ring1.rotation.z = elapsedTime * 0.2;
        ring2.rotation.z = -elapsedTime * 0.25;

        cbcPallets.forEach((pallet, idx) => {
          const angle = elapsedTime * 0.6 + (idx / 6) * Math.PI * 2;
          const radius = 2.0 + Math.sin(elapsedTime * 2 + idx) * 0.15;
          pallet.position.set(Math.cos(angle) * radius, Math.sin(angle * 0.5) * 0.5, Math.sin(angle) * radius);
          pallet.rotation.x = elapsedTime * 2;
          pallet.rotation.y = elapsedTime * 1.5;
        });

        // --- STAGE 1 (Tri-Consensus Animations) ---
        triNodes.forEach((node, idx) => {
          node.rotation.x = elapsedTime * 0.8 + idx;
          node.rotation.y = elapsedTime * 0.6;
        });
        centerCore.rotation.y = elapsedTime * 1.2;
        centerCore.rotation.z = elapsedTime * 0.7;

        // --- STAGE 2 (Teaching Stack Animations) ---
        stackBars.forEach((bar, idx) => {
          bar.position.x = Math.sin(elapsedTime * 2 + idx * 0.6) * 0.15;
          bar.rotation.y = Math.sin(elapsedTime + idx) * 0.1;
        });
        opcodeParticleSystem.rotation.y = elapsedTime * 0.15;

        // --- STAGE 3 (Drone Network Animations) ---
        globeMesh.rotation.y = elapsedTime * 0.25;
        droneSatellites.forEach((sat, idx) => {
          const angle = elapsedTime * 0.9 + (idx / 4) * Math.PI * 2;
          sat.position.set(Math.cos(angle) * 2.1, Math.sin(angle) * 0.8, Math.sin(angle) * 2.1);
          sat.lookAt(0, 0, 0);
        });

        // --- STAGE 4 (Privacy Shard Animations) ---
        shardCubes.forEach((cube, idx) => {
          cube.rotation.x = elapsedTime * 0.5 + idx;
          cube.rotation.y = elapsedTime * 0.4 + idx;
        });
        zkCage.rotation.y = elapsedTime * 0.2;
        zkCage.rotation.x = elapsedTime * 0.15;

        // Global ambient particles drift
        globalParticles.rotation.y = elapsedTime * 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handlePointerMove);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="relative w-full h-[380px] sm:h-[450px] lg:h-[480px] rounded-2xl overflow-hidden bg-[#04060c] border border-[#00F0FF]/25 shadow-[0_0_50px_rgba(0,240,255,0.15)] cursor-grab active:cursor-grabbing"
      aria-label="3D Interactive Protocol Timeline Architecture Visualizer"
    >
      {/* Overlay Status Strip */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 bg-black/80 backdrop-blur-md border border-[#00F0FF]/30 text-xs font-mono tracking-widest text-[#00F0FF] rounded-lg">
        <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
        <span>3D PROTOCOL RUNTIME MESH // LIVE</span>
      </div>

      <div className="absolute bottom-4 right-4 z-10 text-[11px] font-mono text-zinc-400 bg-black/70 px-3 py-1.5 border border-white/10 rounded-lg backdrop-blur-md">
        MOVE CURSOR TO TILT 3D SYSTEM
      </div>
    </div>
  );
};
