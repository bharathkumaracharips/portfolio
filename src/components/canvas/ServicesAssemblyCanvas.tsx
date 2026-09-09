"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { servicesData, ServiceItem } from "@/data/services";

interface ServicesAssemblyCanvasProps {
  selectedServiceId: string;
  onSelectService: (id: string) => void;
}

export const ServicesAssemblyCanvas: React.FC<ServicesAssemblyCanvasProps> = ({
  selectedServiceId,
  onSelectService,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const onSelectRef = useRef(onSelectService);
  onSelectRef.current = onSelectService;

  const selectedServiceIdRef = useRef(selectedServiceId);
  selectedServiceIdRef.current = selectedServiceId;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 560;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.035);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 1.0, 9.0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 2. Controlled Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);

    const cyanRim = new THREE.PointLight(0x00f0ff, 2.8, 25);
    cyanRim.position.set(-4, 3, 4);
    scene.add(cyanRim);

    const emeraldRim = new THREE.PointLight(0x00ff66, 1.6, 25);
    emeraldRim.position.set(4, -3, 3);
    scene.add(emeraldRim);

    // 3. Materials
    const graphiteChassisMat = new THREE.MeshStandardMaterial({
      color: 0x0c0d12,
      roughness: 0.28,
      metalness: 0.85,
    });

    const brushedMetalMat = new THREE.MeshStandardMaterial({
      color: 0x1c1e24,
      roughness: 0.35,
      metalness: 0.75,
    });

    const connectorMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: 0.8,
    });

    // Helper: Create Module Label Texture
    function createModuleTexture(name: string, category: string, isActive: boolean) {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 256;
      const ctx = canvas.getContext("2d");
      if (!ctx) return new THREE.CanvasTexture(canvas);

      ctx.fillStyle = isActive ? "#08131a" : "#08080c";
      ctx.fillRect(0, 0, 512, 256);

      // Border
      ctx.strokeStyle = isActive ? "#00F0FF" : "rgba(255, 255, 255, 0.12)";
      ctx.lineWidth = isActive ? 8 : 4;
      ctx.strokeRect(6, 6, 500, 244);

      // Micro Bus Line Accents
      ctx.fillStyle = isActive ? "#00F0FF" : "rgba(0, 240, 255, 0.3)";
      ctx.fillRect(24, 24, 6, 32);
      ctx.fillRect(24, 200, 80, 4);

      // Header
      ctx.fillStyle = isActive ? "#00F0FF" : "#71717A";
      ctx.font = "bold 18px monospace";
      ctx.fillText(`ENGINEERED MODULE // ${category}`, 40, 46);

      // Title
      ctx.fillStyle = isActive ? "#FFFFFF" : "#E4E4E7";
      ctx.font = "bold 32px sans-serif";
      ctx.fillText(name, 24, 115);

      // Telemetry Status
      ctx.fillStyle = isActive ? "#00FF66" : "rgba(255, 255, 255, 0.4)";
      ctx.font = "16px monospace";
      ctx.fillText(isActive ? "● ASSEMBLED // ACTIVE BUS" : "○ DISASSEMBLED // STANDBY", 24, 175);

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    }

    // 4. Five Physical Computational Modules
    interface PhysicalModule {
      id: string;
      label: string;
      category: string;
      serviceId: string;
      group: THREE.Group;
      chassis: THREE.Mesh;
      aperture: THREE.Mesh;
      initialPos: THREE.Vector3;
      assembledPos: THREE.Vector3;
      currentPos: THREE.Vector3;
      connectors: THREE.Mesh[];
    }

    const physicalModules: PhysicalModule[] = [];
    const interactiveMeshes: THREE.Mesh[] = [];

    const moduleConfigs = [
      {
        id: "mod-runtime",
        label: "WASM RUNTIME",
        category: "PROTOCOL",
        serviceId: "srv-protocol-engineering",
        initialPos: new THREE.Vector3(-3.2, 1.8, -0.6),
        assembledPos: new THREE.Vector3(-1.4, 1.1, 0),
      },
      {
        id: "mod-consensus",
        label: "CONSENSUS & FINALITY",
        category: "PROTOCOL / L1",
        serviceId: "srv-protocol-engineering",
        initialPos: new THREE.Vector3(3.2, 1.6, -0.4),
        assembledPos: new THREE.Vector3(1.4, 1.1, 0),
      },
      {
        id: "mod-contracts",
        label: "SMART CONTRACTS",
        category: "STYLUS / EVM",
        serviceId: "srv-smart-contracts-dapps",
        initialPos: new THREE.Vector3(-3.0, -1.6, 0.4),
        assembledPos: new THREE.Vector3(-1.4, -1.0, 0),
      },
      {
        id: "mod-infra",
        label: "RPC & INDEXER",
        category: "INFRASTRUCTURE",
        serviceId: "srv-infrastructure-backend",
        initialPos: new THREE.Vector3(3.0, -1.8, 0.2),
        assembledPos: new THREE.Vector3(1.4, -1.0, 0),
      },
      {
        id: "mod-auditor",
        label: "SECURITY INVARIANTS",
        category: "AUDIT & OPTIMIZATION",
        serviceId: "srv-auditing-gas-optimization",
        initialPos: new THREE.Vector3(0, 2.5, -1.2),
        assembledPos: new THREE.Vector3(0, 0, 0.3),
      },
    ];

    const moduleGroup = new THREE.Group();
    scene.add(moduleGroup);

    // Connector Beams (Interlocking Assembly Grid)
    const connectorBeams: THREE.Line[] = [];
    const beamPairs = [
      [0, 1], // Runtime <-> Consensus
      [0, 2], // Runtime <-> Contracts
      [1, 3], // Consensus <-> Infra
      [2, 3], // Contracts <-> Infra
      [4, 0], // Security <-> Runtime
      [4, 1], // Security <-> Consensus
      [4, 2], // Security <-> Contracts
      [4, 3], // Security <-> Infra
    ];

    moduleConfigs.forEach((cfg, idx) => {
      const g = new THREE.Group();
      g.position.copy(cfg.initialPos);

      // Outer Chassis (Beveled box appearance)
      const chassisGeo = new THREE.BoxGeometry(2.2, 1.25, 0.4);
      const chassis = new THREE.Mesh(chassisGeo, graphiteChassisMat);
      chassis.castShadow = true;
      g.add(chassis);

      // Top Trim / Heat Sinks
      const trimGeo = new THREE.BoxGeometry(2.24, 0.08, 0.42);
      const trim = new THREE.Mesh(trimGeo, brushedMetalMat);
      trim.position.set(0, 0.6, 0);
      g.add(trim);

      // Display Aperture
      const apGeo = new THREE.PlaneGeometry(2.05, 1.1);
      const apMat = new THREE.MeshStandardMaterial({
        map: createModuleTexture(cfg.label, cfg.category, cfg.serviceId === selectedServiceIdRef.current),
        roughness: 0.2,
        metalness: 0.4,
      });
      const aperture = new THREE.Mesh(apGeo, apMat);
      aperture.position.set(0, 0, 0.21);
      aperture.userData = { serviceId: cfg.serviceId, moduleIndex: idx };
      interactiveMeshes.push(aperture);
      g.add(aperture);

      moduleGroup.add(g);

      physicalModules.push({
        id: cfg.id,
        label: cfg.label,
        category: cfg.category,
        serviceId: cfg.serviceId,
        group: g,
        chassis,
        aperture,
        initialPos: cfg.initialPos.clone(),
        assembledPos: cfg.assembledPos.clone(),
        currentPos: cfg.initialPos.clone(),
        connectors: [],
      });
    });

    // Create Connecting Bus Lines
    beamPairs.forEach(([iA, iB]) => {
      const geo = new THREE.BufferGeometry().setFromPoints([
        physicalModules[iA].assembledPos,
        physicalModules[iB].assembledPos,
      ]);
      const mat = new THREE.LineBasicMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0.25,
      });
      const line = new THREE.Line(geo, mat);
      scene.add(line);
      connectorBeams.push(line);
    });

    // 5. Subtle Floating Core Grid Lines
    const gridHelper = new THREE.GridHelper(16, 20, 0x00f0ff, 0x222226);
    gridHelper.position.y = -3.2;
    const gridMat = gridHelper.material as THREE.Material;
    gridMat.transparent = true;
    gridMat.opacity = 0.2;
    scene.add(gridHelper);

    // 6. Raycasting & Hover/Click
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    let hoveredMesh: THREE.Mesh | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes, false);

      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        if (hoveredMesh !== hit) {
          hoveredMesh = hit;
          container.style.cursor = "pointer";
        }
      } else {
        hoveredMesh = null;
        container.style.cursor = "default";
      }
    };

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes, false);

      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        const srvId = hit.userData.serviceId;
        if (srvId) {
          onSelectRef.current(srvId);
        }
      }
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("click", handleClick);

    // 7. Render Loop & Dynamic Interpolation
    let animationFrameId: number;
    const clock = new THREE.Clock();
    const targetCameraPos = new THREE.Vector3(0, 0.8, 8.5);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      const activeServiceId = selectedServiceIdRef.current;

      // Update Modules Position & Materials
      physicalModules.forEach((mod, idx) => {
        const isAssociated =
          mod.serviceId === activeServiceId ||
          activeServiceId === "srv-protocol-engineering" ||
          activeServiceId === "srv-technical-education";

        const isExactMatch = mod.serviceId === activeServiceId;
        const isHovered = hoveredMesh === mod.aperture;

        // Assembly Target Interpolation
        const targetPos = isAssociated ? mod.assembledPos : mod.initialPos;
        const floatOffset = Math.sin(elapsed * 1.4 + idx * 1.5) * 0.06;

        mod.group.position.x = THREE.MathUtils.lerp(mod.group.position.x, targetPos.x, delta * 3.5);
        mod.group.position.y = THREE.MathUtils.lerp(
          mod.group.position.y,
          targetPos.y + (isAssociated ? floatOffset * 0.4 : floatOffset),
          delta * 3.5
        );
        mod.group.position.z = THREE.MathUtils.lerp(mod.group.position.z, targetPos.z, delta * 3.5);

        // Smooth Scale & Rotation
        const targetScale = isExactMatch ? 1.05 : isHovered ? 1.02 : isAssociated ? 0.98 : 0.88;
        mod.group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 4);

        // Subtle tilt
        mod.group.rotation.y = THREE.MathUtils.lerp(
          mod.group.rotation.y,
          (mouse.x * 0.15) + (isAssociated ? 0 : 0.1),
          delta * 2
        );
        mod.group.rotation.x = THREE.MathUtils.lerp(
          mod.group.rotation.x,
          (-mouse.y * 0.1),
          delta * 2
        );
      });

      // Update Connector Beam Positions & Glowing Opacity
      beamPairs.forEach(([iA, iB], bIdx) => {
        const posA = physicalModules[iA].group.position;
        const posB = physicalModules[iB].group.position;

        const line = connectorBeams[bIdx];
        const posAttr = line.geometry.attributes.position as THREE.BufferAttribute;
        posAttr.setXYZ(0, posA.x, posA.y, posA.z);
        posAttr.setXYZ(1, posB.x, posB.y, posB.z);
        posAttr.needsUpdate = true;

        const lineMat = line.material as THREE.LineBasicMaterial;
        const isEitherActive =
          physicalModules[iA].serviceId === activeServiceId ||
          physicalModules[iB].serviceId === activeServiceId;

        const targetOpacity = isEitherActive ? 0.85 : 0.12;
        lineMat.opacity = THREE.MathUtils.lerp(lineMat.opacity, targetOpacity, delta * 3);
        lineMat.color.setHex(isEitherActive ? 0x00f0ff : 0x444455);
      });

      // Subtle Camera Parallax
      targetCameraPos.set(mouse.x * 0.6, 0.8 - mouse.y * 0.4, 8.5);
      camera.position.lerp(targetCameraPos, delta * 2.5);
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // 8. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 560;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="relative w-full h-[480px] sm:h-[540px] lg:h-[600px] rounded-xl overflow-hidden bg-gradient-to-b from-[#050505] via-[#08080c] to-[#050505] border border-white/5 shadow-2xl"
    >
      {/* Telemetry Status Pill */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 pointer-events-none bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
        <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
        <span className="text-[10px] font-mono tracking-widest text-[#00F0FF]/90 uppercase">
          3D ARCHITECTURAL ASSEMBLY // MODULAR SYSTEM
        </span>
      </div>

      <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none text-[11px] font-mono text-zinc-500 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5">
        <div className="flex items-center gap-2">
          <span className="text-zinc-400">STATE:</span>
          <span>SELECT SERVICE TO RECONFIGURE ASSEMBLY</span>
        </div>
        <div className="flex items-center gap-3 text-[#00F0FF]/60">
          <span>MATERIAL: GRAPHITE / SILICON / STEEL</span>
          <span>BUS: ACTIVE</span>
        </div>
      </div>
    </div>
  );
};
