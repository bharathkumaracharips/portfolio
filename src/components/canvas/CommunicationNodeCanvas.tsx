"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export type NodeProtocolState =
  | "IDLE"
  | "COMPOSING"
  | "REVIEWING"
  | "SIGNING"
  | "BROADCASTING"
  | "CONFIRMED"
  | "FAILED";

interface CommunicationNodeCanvasProps {
  protocolState: NodeProtocolState;
}

export const CommunicationNodeCanvas: React.FC<CommunicationNodeCanvasProps> = ({
  protocolState,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<NodeProtocolState>(protocolState);
  stateRef.current = protocolState;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 560;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.04);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 7.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 2. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.6);
    keyLight.position.set(4, 6, 5);
    scene.add(keyLight);

    const cyanPoint = new THREE.PointLight(0x00f0ff, 3, 20);
    cyanPoint.position.set(-3, 2, 4);
    scene.add(cyanPoint);

    const emeraldPoint = new THREE.PointLight(0x00ff66, 1.8, 20);
    emeraldPoint.position.set(3, -2, 3);
    scene.add(emeraldPoint);

    // 3. Precision Computational Communication Node Assembly
    const nodeRoot = new THREE.Group();
    scene.add(nodeRoot);

    // Materials
    const graphiteMat = new THREE.MeshStandardMaterial({
      color: 0x0c0d12,
      roughness: 0.25,
      metalness: 0.85,
    });

    const brushedMetalMat = new THREE.MeshStandardMaterial({
      color: 0x1a1c22,
      roughness: 0.35,
      metalness: 0.8,
    });

    const coreEmissiveMat = new THREE.MeshStandardMaterial({
      color: 0x02151e,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.6,
      roughness: 0.1,
      metalness: 0.9,
    });

    // Outer Chassis Layer: Precision Hexagonal Chamber
    const hexGeo = new THREE.CylinderGeometry(1.6, 1.6, 0.45, 6);
    const hexChassis = new THREE.Mesh(hexGeo, graphiteMat);
    hexChassis.rotation.x = Math.PI / 2;
    nodeRoot.add(hexChassis);

    // Inner Layered Plates (Machined Stack)
    const plateCount = 4;
    const plates: THREE.Mesh[] = [];
    for (let i = 0; i < plateCount; i++) {
      const pGeo = new THREE.BoxGeometry(2.2 - i * 0.25, 2.2 - i * 0.25, 0.06);
      const plate = new THREE.Mesh(pGeo, brushedMetalMat);
      plate.position.z = (i - 1.5) * 0.22;
      nodeRoot.add(plate);
      plates.push(plate);
    }

    // Central Cryptographic Transmitter Core (Octahedron in crystalline cage)
    const coreGeo = new THREE.OctahedronGeometry(0.65, 0);
    const coreMesh = new THREE.Mesh(coreGeo, coreEmissiveMat);
    nodeRoot.add(coreMesh);

    const coreWireGeo = new THREE.OctahedronGeometry(0.72, 0);
    const coreWireMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const coreWire = new THREE.Mesh(coreWireGeo, coreWireMat);
    nodeRoot.add(coreWire);

    // Rotating Signal Gimbals (Outer Rings)
    const gimbalGeo1 = new THREE.TorusGeometry(1.9, 0.02, 16, 64);
    const gimbalMat1 = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.35,
      metalness: 0.9,
      roughness: 0.2,
    });
    const gimbal1 = new THREE.Mesh(gimbalGeo1, gimbalMat1);
    nodeRoot.add(gimbal1);

    const gimbalGeo2 = new THREE.TorusGeometry(1.7, 0.02, 16, 64);
    const gimbalMat2 = new THREE.MeshStandardMaterial({
      color: 0x00ff66,
      emissive: 0x00ff66,
      emissiveIntensity: 0.3,
      metalness: 0.9,
      roughness: 0.2,
    });
    const gimbal2 = new THREE.Mesh(gimbalGeo2, gimbalMat2);
    gimbal2.rotation.x = Math.PI / 2.2;
    nodeRoot.add(gimbal2);

    // Radial Broadcast Signal Beams (6 Radiating Waveguides)
    const beamCount = 6;
    const signalBeams: THREE.Line[] = [];
    for (let i = 0; i < beamCount; i++) {
      const angle = (i / beamCount) * Math.PI * 2;
      const pStart = new THREE.Vector3(Math.cos(angle) * 0.7, Math.sin(angle) * 0.7, 0);
      const pEnd = new THREE.Vector3(Math.cos(angle) * 2.8, Math.sin(angle) * 2.8, 0);

      const bGeo = new THREE.BufferGeometry().setFromPoints([pStart, pEnd]);
      const bMat = new THREE.LineBasicMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0.2,
      });
      const beam = new THREE.Line(bGeo, bMat);
      nodeRoot.add(beam);
      signalBeams.push(beam);
    }

    // Floating Data Particle Orbit
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const r = 2.2 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      particlePos[i] = r * Math.cos(theta) * Math.cos(phi);
      particlePos[i + 1] = r * Math.sin(phi);
      particlePos[i + 2] = r * Math.sin(theta) * Math.cos(phi);
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.035,
      transparent: true,
      opacity: 0.4,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    nodeRoot.add(particleSystem);

    // Mouse Interaction
    const mouse = new THREE.Vector2(0, 0);
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    container.addEventListener("mousemove", handleMouseMove);

    // 4. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();
      const st = stateRef.current;

      // Speed and emission multiplier based on protocol state
      let speedMult = 1.0;
      let targetEmissive = 0.6;
      let targetColor = 0x00f0ff;

      if (st === "COMPOSING") {
        speedMult = 1.4;
        targetEmissive = 0.9;
        targetColor = 0x00f0ff;
      } else if (st === "REVIEWING") {
        speedMult = 1.8;
        targetEmissive = 1.2;
        targetColor = 0x00f0ff;
      } else if (st === "SIGNING" || st === "BROADCASTING") {
        speedMult = 3.5;
        targetEmissive = 2.2;
        targetColor = 0x00ff66;
      } else if (st === "CONFIRMED") {
        speedMult = 0.8;
        targetEmissive = 1.4;
        targetColor = 0x00ff66;
      } else if (st === "FAILED") {
        speedMult = 0.4;
        targetEmissive = 0.5;
        targetColor = 0xff3366;
      }

      // Rotate central core
      coreMesh.rotation.y += delta * 0.8 * speedMult;
      coreMesh.rotation.x += delta * 0.4 * speedMult;
      coreWire.rotation.y -= delta * 0.6 * speedMult;
      gimbal1.rotation.z += delta * 0.4 * speedMult;
      gimbal2.rotation.y += delta * 0.5 * speedMult;

      // Pulse core emission
      coreEmissiveMat.emissive.setHex(targetColor);
      coreEmissiveMat.emissiveIntensity = THREE.MathUtils.lerp(
        coreEmissiveMat.emissiveIntensity,
        targetEmissive + Math.sin(elapsed * 3 * speedMult) * 0.2,
        delta * 3
      );

      // Signal beams pulsing
      signalBeams.forEach((beam, idx) => {
        const bMat = beam.material as THREE.LineBasicMaterial;
        const beamPulse = (Math.sin(elapsed * 4 * speedMult + idx) + 1) * 0.5;
        bMat.opacity = THREE.MathUtils.lerp(
          bMat.opacity,
          st === "BROADCASTING" ? 0.9 : 0.15 + beamPulse * 0.3,
          delta * 4
        );
        bMat.color.setHex(targetColor);
      });

      // Subtle chassis tilt to follow mouse
      nodeRoot.rotation.y = THREE.MathUtils.lerp(nodeRoot.rotation.y, mouse.x * 0.35, delta * 2.5);
      nodeRoot.rotation.x = THREE.MathUtils.lerp(nodeRoot.rotation.x, -mouse.y * 0.3, delta * 2.5);

      // Gentle floating bob
      nodeRoot.position.y = Math.sin(elapsed * 1.5) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    // 5. Resize Handler
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
      className="relative w-full h-[360px] sm:h-[400px] lg:h-[440px] rounded-xl overflow-hidden bg-gradient-to-b from-[#050505] via-[#08080c] to-[#050505] border border-white/5 shadow-2xl"
    >
      {/* Telemetry Status Pill */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 pointer-events-none bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
        <span
          className={`w-2 h-2 rounded-full animate-pulse ${
            protocolState === "CONFIRMED"
              ? "bg-[#00FF66]"
              : protocolState === "FAILED"
              ? "bg-red-500"
              : "bg-[#00F0FF]"
          }`}
        />
        <span className="text-[10px] font-mono tracking-widest text-[#00F0FF]/90 uppercase">
          COMMUNICATION NODE // {protocolState}
        </span>
      </div>

      <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none text-[11px] font-mono text-zinc-500 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5">
        <div className="flex items-center gap-2">
          <span className="text-zinc-400">HARDWARE:</span>
          <span>MACHINED CORE // TRANSMITTER</span>
        </div>
        <div className="flex items-center gap-3 text-[#00F0FF]/60">
          <span>PORT: DIRECT INBOX</span>
          <span>PROTOCOL: TRANSACTION</span>
        </div>
      </div>
    </div>
  );
};
