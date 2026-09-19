"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { Endorsement } from "@/types";

interface EndorsementNetworkCanvasProps {
  endorsements: Endorsement[];
  activeId: string;
  onSelectEndorsement: (id: string) => void;
}

export const EndorsementNetworkCanvas: React.FC<EndorsementNetworkCanvasProps> = ({
  endorsements,
  activeId,
  onSelectEndorsement,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const activeIdRef = useRef(activeId);
  activeIdRef.current = activeId;

  const onSelectRef = useRef(onSelectEndorsement);
  onSelectRef.current = onSelectEndorsement;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId: number;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.035);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.set(0, 0.5, 6.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(5, 6, 4);
    scene.add(keyLight);

    const cyanPoint = new THREE.PointLight(0x00f0ff, 2.5, 12);
    cyanPoint.position.set(-2, 2, 3);
    scene.add(cyanPoint);

    const softFill = new THREE.PointLight(0x61e7ff, 1.5, 10);
    softFill.position.set(2, -2, 2);
    scene.add(softFill);

    // 3. Network Root Group
    const networkGroup = new THREE.Group();
    scene.add(networkGroup);

    // Define positions for Primary Endorsement Nodes
    const primaryNodeConfigs = [
      { id: endorsements[0]?.id || "signal-001", pos: new THREE.Vector3(-1.8, 0.8, 0.2), label: "001" },
      { id: endorsements[1]?.id || "signal-002", pos: new THREE.Vector3(1.6, 0.6, -0.4), label: "002" },
      { id: endorsements[2]?.id || "signal-003", pos: new THREE.Vector3(0.0, -1.2, 0.4), label: "003" },
    ];

    // Auxiliary human network / constellation nodes
    const auxPositions = [
      new THREE.Vector3(-2.8, -0.6, -1.0),
      new THREE.Vector3(-0.9, 1.8, -0.6),
      new THREE.Vector3(0.8, 1.9, -1.2),
      new THREE.Vector3(2.5, -0.8, -0.8),
      new THREE.Vector3(1.1, -1.9, -0.5),
      new THREE.Vector3(-1.4, -1.8, -0.7),
      new THREE.Vector3(-0.2, 0.2, -1.5),
      new THREE.Vector3(2.2, 1.4, 0.5),
    ];

    // Node Meshes & Objects Map
    const nodeMeshes: { mesh: THREE.Mesh; halo: THREE.Mesh; config: typeof primaryNodeConfigs[0] }[] = [];

    // Materials
    const activeCoreMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00f0ff,
      emissiveIntensity: 1.2,
      roughness: 0.1,
      metalness: 0.9,
    });

    const inactiveCoreMat = new THREE.MeshStandardMaterial({
      color: 0x222630,
      emissive: 0x0a1218,
      emissiveIntensity: 0.3,
      roughness: 0.4,
      metalness: 0.8,
    });

    const activeHaloMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });

    const inactiveHaloMat = new THREE.MeshBasicMaterial({
      color: 0x334155,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });

    const auxMat = new THREE.MeshStandardMaterial({
      color: 0x181a20,
      emissive: 0x0f172a,
      roughness: 0.6,
      metalness: 0.5,
    });

    // Create Primary Nodes
    primaryNodeConfigs.forEach((nodeConfig) => {
      const nodeSubGroup = new THREE.Group();
      nodeSubGroup.position.copy(nodeConfig.pos);

      // Core sphere
      const sphereGeo = new THREE.SphereGeometry(0.24, 24, 24);
      const coreMesh = new THREE.Mesh(sphereGeo, inactiveCoreMat.clone());
      coreMesh.userData = { id: nodeConfig.id, isClickable: true };
      nodeSubGroup.add(coreMesh);

      // Orbital Halo / Precision Ring
      const haloGeo = new THREE.IcosahedronGeometry(0.38, 1);
      const haloMesh = new THREE.Mesh(haloGeo, inactiveHaloMat.clone());
      nodeSubGroup.add(haloMesh);

      // Inner Pulse Anchor
      const innerGlowGeo = new THREE.SphereGeometry(0.08, 12, 12);
      const innerGlowMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 });
      const innerGlow = new THREE.Mesh(innerGlowGeo, innerGlowMat);
      nodeSubGroup.add(innerGlow);

      networkGroup.add(nodeSubGroup);
      nodeMeshes.push({ mesh: coreMesh, halo: haloMesh, config: nodeConfig });
    });

    // Create Auxiliary Nodes
    auxPositions.forEach((pos) => {
      const auxGeo = new THREE.SphereGeometry(0.09, 12, 12);
      const auxMesh = new THREE.Mesh(auxGeo, auxMat);
      auxMesh.position.copy(pos);
      networkGroup.add(auxMesh);
    });

    // Connections (Lines)
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.18,
      linewidth: 1,
    });

    const allPositions = [
      ...primaryNodeConfigs.map((n) => n.pos),
      ...auxPositions,
    ];

    const linesGroup = new THREE.Group();
    networkGroup.add(linesGroup);

    const edges: [THREE.Vector3, THREE.Vector3][] = [];

    for (let i = 0; i < allPositions.length; i++) {
      for (let j = i + 1; j < allPositions.length; j++) {
        const dist = allPositions[i].distanceTo(allPositions[j]);
        if (dist < 2.9) {
          const geometry = new THREE.BufferGeometry().setFromPoints([
            allPositions[i],
            allPositions[j],
          ]);
          const line = new THREE.Line(geometry, lineMat);
          linesGroup.add(line);
          edges.push([allPositions[i], allPositions[j]]);
        }
      }
    }

    // Traveling Signal Packets / Pulses
    const pulseCount = 8;
    const pulses: { mesh: THREE.Mesh; edgeIndex: number; progress: number; speed: number }[] = [];
    const pulseGeo = new THREE.SphereGeometry(0.045, 8, 8);
    const pulseMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });

    for (let i = 0; i < pulseCount; i++) {
      const pMesh = new THREE.Mesh(pulseGeo, pulseMat);
      networkGroup.add(pMesh);
      pulses.push({
        mesh: pMesh,
        edgeIndex: Math.floor(Math.random() * edges.length),
        progress: Math.random(),
        speed: 0.004 + Math.random() * 0.006,
      });
    }

    // Raycasting for Interactivity
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-100, -100);

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handleClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const clickables = nodeMeshes.map((n) => n.mesh);
      const intersects = raycaster.intersectObjects(clickables, true);
      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hit.userData?.id) {
          onSelectRef.current(hit.userData.id);
        }
      }
    };

    container.addEventListener("mousemove", handlePointerMove);
    container.addEventListener("click", handleClick);

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
    let targetRotationY = 0;
    let targetRotationX = 0;
    let isVisible = true;
    let isTabActive = typeof document !== "undefined" ? !document.hidden : true;

    const animate = () => {
      if (!isVisible || !isTabActive) {
        animationFrameId = 0;
        return;
      }
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const currentActiveId = activeIdRef.current;

      if (!prefersReducedMotion) {
        // Slow organic network drift
        networkGroup.rotation.y = Math.sin(elapsedTime * 0.25) * 0.18;
        networkGroup.rotation.x = Math.cos(elapsedTime * 0.2) * 0.08;
      }

      // Update Node Highlight States
      nodeMeshes.forEach((nodeItem) => {
        const isActive = nodeItem.config.id === currentActiveId;
        const coreMeshMat = nodeItem.mesh.material as THREE.MeshStandardMaterial;
        const haloMatInstance = nodeItem.halo.material as THREE.MeshBasicMaterial;

        if (isActive) {
          coreMeshMat.color.setHex(0x00f0ff);
          coreMeshMat.emissive.setHex(0x00f0ff);
          coreMeshMat.emissiveIntensity = 1.0 + Math.sin(elapsedTime * 4) * 0.35;
          nodeItem.mesh.scale.lerp(new THREE.Vector3(1.25, 1.25, 1.25), 0.1);

          haloMatInstance.color.setHex(0x00f0ff);
          haloMatInstance.opacity = 0.8 + Math.sin(elapsedTime * 3) * 0.2;
          nodeItem.halo.rotation.x += 0.015;
          nodeItem.halo.rotation.y += 0.02;
          nodeItem.halo.scale.lerp(new THREE.Vector3(1.35, 1.35, 1.35), 0.1);
        } else {
          coreMeshMat.color.setHex(0x222630);
          coreMeshMat.emissive.setHex(0x0a1218);
          coreMeshMat.emissiveIntensity = 0.25;
          nodeItem.mesh.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);

          haloMatInstance.color.setHex(0x334155);
          haloMatInstance.opacity = 0.2;
          nodeItem.halo.rotation.x += 0.003;
          nodeItem.halo.rotation.y += 0.004;
          nodeItem.halo.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
        }
      });

      // Update Pulses
      if (!prefersReducedMotion && edges.length > 0) {
        pulses.forEach((p) => {
          p.progress += p.speed;
          if (p.progress >= 1) {
            p.progress = 0;
            p.edgeIndex = Math.floor(Math.random() * edges.length);
          }
          const edge = edges[p.edgeIndex];
          if (edge) {
            p.mesh.position.lerpVectors(edge[0], edge[1], p.progress);
          }
        });
      }

      renderer.render(scene, camera);
    };

    const startAnimate = () => {
      if (isVisible && isTabActive && !animationFrameId) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    const stopAnimate = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = 0;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            startAnimate();
          } else {
            stopAnimate();
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
      if (isTabActive && isVisible) {
        startAnimate();
      } else {
        stopAnimate();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    animate();

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handlePointerMove);
      container.removeEventListener("click", handleClick);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [endorsements]);

  return (
    <div
      ref={mountRef}
      className="relative w-full h-[300px] sm:h-[350px] lg:h-[370px] rounded-xl overflow-hidden bg-[#07080a] border border-white/10 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]"
      aria-label="Interactive 3D Human Network Visualization. Click nodes to switch active endorsement signal."
    >
      {/* Overlay Status Strip */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2 px-2.5 py-1 bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-widest text-zinc-400 rounded">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
        <span>NETWORK MESH // INTERACTIVE</span>
      </div>

      <div className="absolute bottom-3 right-3 z-10 text-[10px] font-mono text-zinc-500 bg-black/60 px-2 py-1 border border-white/5 rounded">
        CLICK NODE TO SWITCH SIGNAL
      </div>
    </div>
  );
};
