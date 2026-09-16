"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface ExperienceProtocolCanvasProps {
  activeIndex: number;
}

export const ExperienceProtocolCanvas: React.FC<ExperienceProtocolCanvasProps> = ({
  activeIndex,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(activeIndex);
  activeIndexRef.current = activeIndex;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId: number;
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 300;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 0, 5.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const cyanPoint = new THREE.PointLight(0x00f0ff, 3, 15);
    cyanPoint.position.set(-2, 3, 3);
    scene.add(cyanPoint);

    const emeraldPoint = new THREE.PointLight(0x00ff66, 2, 12);
    emeraldPoint.position.set(2, -2, 2);
    scene.add(emeraldPoint);

    // 3. Central Protocol Ring Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Concentric Torus Rings (Consensus Orbits)
    const ring1Geo = new THREE.TorusGeometry(1.4, 0.015, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.4 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    coreGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(1.0, 0.012, 16, 80);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.3 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    coreGroup.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(0.6, 0.01, 16, 60);
    const ring3Mat = new THREE.MeshBasicMaterial({ color: 0x00ff66, transparent: true, opacity: 0.5 });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    coreGroup.add(ring3);

    // Central Core Node (Crystalline Icosahedron)
    const coreGeo = new THREE.IcosahedronGeometry(0.4, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x0b101b,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // Orbiting Satellite Nodes representing Career Milestones (5 nodes)
    const milestoneNodes: THREE.Mesh[] = [];
    const milestoneCount = 5;
    const milestoneGeo = new THREE.SphereGeometry(0.08, 16, 16);

    for (let i = 0; i < milestoneCount; i++) {
      const angle = (i / milestoneCount) * Math.PI * 2;
      const mMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        emissive: 0x00f0ff,
        emissiveIntensity: 0.2,
        roughness: 0.3,
        metalness: 0.7,
      });
      const mMesh = new THREE.Mesh(milestoneGeo, mMat);
      mMesh.position.set(Math.cos(angle) * 1.4, Math.sin(angle) * 1.4, 0);
      coreGroup.add(mMesh);
      milestoneNodes.push(mMesh);
    }

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
      const currentActive = activeIndexRef.current;

      if (!prefersReducedMotion) {
        ring1.rotation.x = elapsedTime * 0.3;
        ring1.rotation.y = elapsedTime * 0.2;

        ring2.rotation.y = -elapsedTime * 0.4;
        ring2.rotation.z = elapsedTime * 0.25;

        ring3.rotation.x = -elapsedTime * 0.5;
        ring3.rotation.z = -elapsedTime * 0.3;

        coreMesh.rotation.y = elapsedTime * 0.5;
        coreMesh.rotation.x = elapsedTime * 0.3;
      }

      // Highlight the active milestone node
      milestoneNodes.forEach((node, idx) => {
        const isActive = idx === currentActive;
        const mat = node.material as THREE.MeshStandardMaterial;
        if (isActive) {
          mat.color.setHex(0x00f0ff);
          mat.emissive.setHex(0x00f0ff);
          mat.emissiveIntensity = 1.2 + Math.sin(elapsedTime * 4) * 0.4;
          node.scale.lerp(new THREE.Vector3(1.6, 1.6, 1.6), 0.1);
        } else {
          mat.color.setHex(0x1e293b);
          mat.emissive.setHex(0x0f172a);
          mat.emissiveIntensity = 0.2;
          node.scale.lerp(new THREE.Vector3(1.0, 1.0, 1.0), 0.1);
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="relative w-full h-[220px] sm:h-[260px] rounded-xl overflow-hidden bg-[#06080e] border border-white/10 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]"
      aria-label="3D Consensus Architecture Visualizer"
    >
      <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-2 px-2 py-0.5 bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-mono tracking-widest text-[#00F0FF] rounded">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
        <span>PROTOCOL RUNTIME STATE // 3D</span>
      </div>
    </div>
  );
};
