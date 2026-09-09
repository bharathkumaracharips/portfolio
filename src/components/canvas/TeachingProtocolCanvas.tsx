"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { lectureArchiveData, LectureItem } from "@/data/teaching";

interface TeachingProtocolCanvasProps {
  selectedLectureId: string;
  onSelectLecture: (id: string) => void;
}

export const TeachingProtocolCanvas: React.FC<TeachingProtocolCanvasProps> = ({
  selectedLectureId,
  onSelectLecture,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const onSelectRef = useRef(onSelectLecture);
  onSelectRef.current = onSelectLecture;

  const selectedLectureIdRef = useRef(selectedLectureId);
  selectedLectureIdRef.current = selectedLectureId;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 550;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.04);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 8.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const cyanPoint = new THREE.PointLight(0x00f0ff, 3, 20);
    cyanPoint.position.set(-4, 3, 4);
    scene.add(cyanPoint);

    const emeraldPoint = new THREE.PointLight(0x00ff66, 2.5, 20);
    emeraldPoint.position.set(4, -2, 4);
    scene.add(emeraldPoint);

    // 3. Central Core Assembly (Layered State Core)
    const coreGroup = new THREE.Group();
    coreGroup.position.set(0, 0, 0);
    scene.add(coreGroup);

    // Outer Gyroscope Rings
    const ringGeo1 = new THREE.TorusGeometry(1.6, 0.02, 16, 64);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.4,
      metalness: 0.9,
      roughness: 0.2,
      wireframe: true,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    coreGroup.add(ringMesh1);

    const ringGeo2 = new THREE.TorusGeometry(1.3, 0.02, 16, 64);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x00ff66,
      emissive: 0x00ff66,
      emissiveIntensity: 0.35,
      metalness: 0.9,
      roughness: 0.2,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.x = Math.PI / 2.5;
    coreGroup.add(ringMesh2);

    // Central Cryptographic Octahedron Core
    const coreGeo = new THREE.OctahedronGeometry(0.7, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x111115,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.2,
      roughness: 0.1,
      metalness: 0.9,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    const coreWireGeo = new THREE.OctahedronGeometry(0.72, 0);
    const coreWireMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const coreWireMesh = new THREE.Mesh(coreWireGeo, coreWireMat);
    coreGroup.add(coreWireMesh);

    // 4. Background Particle Lattice
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 16;
      particlePos[i + 1] = (Math.random() - 0.5) * 10;
      particlePos[i + 2] = (Math.random() - 0.5) * 8 - 2;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.035,
      transparent: true,
      opacity: 0.35,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Helper: Canvas Texture for Node Face
    function createNodeTexture(num: string, title: string, src: string, isSelected: boolean) {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 256;
      const ctx = canvas.getContext("2d");
      if (!ctx) return new THREE.CanvasTexture(canvas);

      ctx.fillStyle = isSelected ? "#0a151b" : "#08080a";
      ctx.fillRect(0, 0, 512, 256);

      // Border
      ctx.strokeStyle = isSelected ? "#00F0FF" : "rgba(255,255,255,0.15)";
      ctx.lineWidth = isSelected ? 8 : 4;
      ctx.strokeRect(6, 6, 500, 244);

      // Accent pill
      ctx.fillStyle = isSelected ? "#00F0FF" : "rgba(0,240,255,0.4)";
      ctx.fillRect(24, 24, 8, 36);

      // Text: Number & Source
      ctx.fillStyle = isSelected ? "#00F0FF" : "#A1A1AA";
      ctx.font = "bold 20px monospace";
      ctx.fillText(`${num}  //  ${src}`, 42, 48);

      // Title
      ctx.fillStyle = isSelected ? "#FFFFFF" : "#E4E4E7";
      ctx.font = "bold 26px sans-serif";

      // Simple wrap
      const words = title.split(" ");
      let line1 = "";
      let line2 = "";
      words.forEach((w) => {
        if ((line1 + w).length < 22 && line2 === "") {
          line1 += w + " ";
        } else {
          line2 += w + " ";
        }
      });

      ctx.fillText(line1.trim(), 24, 110);
      if (line2) {
        ctx.fillText(line2.trim(), 24, 146);
      }

      // Status indicator
      ctx.fillStyle = isSelected ? "#00FF66" : "rgba(255,255,255,0.3)";
      ctx.font = "16px monospace";
      ctx.fillText(isSelected ? "● ACTIVE TRACE IN CONSOLE" : "○ CLICK TO INSPECT", 24, 215);

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    }

    // 5. Interactive Lecture Nodes (arranged in a gentle arc)
    interface Node3D {
      item: LectureItem;
      group: THREE.Group;
      chassis: THREE.Mesh;
      aperture: THREE.Mesh;
      conduit: {
        line: THREE.Line;
        pulse: THREE.Mesh;
        curve: THREE.CatmullRomCurve3;
      };
      targetX: number;
      targetY: number;
      targetZ: number;
    }

    const nodes3D: Node3D[] = [];
    const interactiveMeshes: THREE.Mesh[] = [];

    const totalLectures = lectureArchiveData.length;
    const arcRadius = 4.2;
    const arcAngleSpread = Math.PI * 0.75; // ~135 degrees

    lectureArchiveData.forEach((lec, idx) => {
      const angle = -arcAngleSpread / 2 + (idx / (totalLectures - 1)) * arcAngleSpread;
      const x = Math.sin(angle) * arcRadius;
      const z = -Math.cos(angle) * arcRadius + arcRadius * 0.8;
      const y = (idx % 2 === 0 ? 0.25 : -0.25) + Math.sin(idx * 1.5) * 0.2;

      const nodeGroup = new THREE.Group();
      nodeGroup.position.set(x, y, z);

      // Chassis
      const chassisGeo = new THREE.BoxGeometry(1.9, 1.0, 0.25);
      const chassisMat = new THREE.MeshStandardMaterial({
        color: 0x0c0d12,
        roughness: 0.3,
        metalness: 0.8,
      });
      const chassis = new THREE.Mesh(chassisGeo, chassisMat);
      nodeGroup.add(chassis);

      // Front Display Aperture
      const apertureGeo = new THREE.PlaneGeometry(1.8, 0.9);
      const apertureMat = new THREE.MeshStandardMaterial({
        map: createNodeTexture(lec.number, lec.title, lec.source, lec.id === selectedLectureIdRef.current),
        roughness: 0.2,
        metalness: 0.4,
      });
      const aperture = new THREE.Mesh(apertureGeo, apertureMat);
      aperture.position.set(0, 0, 0.13);
      aperture.userData = { lectureId: lec.id };
      interactiveMeshes.push(aperture);
      nodeGroup.add(aperture);

      // Conduit connecting Central Core to Node
      const pStart = new THREE.Vector3(0, 0, 0);
      const pMid = new THREE.Vector3(x * 0.5, y * 0.5 + 0.3, z * 0.5);
      const pEnd = new THREE.Vector3(x, y, z);
      const curve = new THREE.CatmullRomCurve3([pStart, pMid, pEnd]);

      const lineGeo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(30));
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0.25,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      scene.add(line);

      // Traveling Pulse
      const pulseGeo = new THREE.SphereGeometry(0.06, 12, 12);
      const pulseMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
      const pulse = new THREE.Mesh(pulseGeo, pulseMat);
      scene.add(pulse);

      scene.add(nodeGroup);

      nodes3D.push({
        item: lec,
        group: nodeGroup,
        chassis,
        aperture,
        conduit: { line, pulse, curve },
        targetX: x,
        targetY: y,
        targetZ: z,
      });
    });

    // 6. Raycasting & Interaction
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
        const lectureId = hit.userData.lectureId;
        if (lectureId) {
          onSelectRef.current(lectureId);
        }
      }
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("click", handleClick);

    // 7. Render Loop & Animation
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let pulseT = 0;

    const targetCameraPos = new THREE.Vector3(0, 1.2, 8.5);
    const targetCameraLook = new THREE.Vector3(0, 0, 0);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Rotate core
      coreMesh.rotation.y += delta * 0.5;
      coreMesh.rotation.x += delta * 0.2;
      coreWireMesh.rotation.y -= delta * 0.4;
      ringMesh1.rotation.z += delta * 0.3;
      ringMesh2.rotation.y += delta * 0.35;

      // Pulse traveling along conduits
      pulseT = (pulseT + delta * 0.45) % 1.0;

      // Update nodes
      const activeId = selectedLectureIdRef.current;
      let activeNodeObj: Node3D | null = null;

      nodes3D.forEach((n, idx) => {
        const isSelected = n.item.id === activeId;
        const isHovered = hoveredMesh === n.aperture;

        if (isSelected) {
          activeNodeObj = n;
        }

        // Floating hover motion
        const floatY = Math.sin(elapsed * 1.5 + idx * 1.2) * 0.08;
        n.group.position.y = n.targetY + floatY;

        // Smooth scale
        const targetScale = isSelected ? 1.08 : isHovered ? 1.04 : 0.98;
        n.group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

        // Billboard look towards camera with subtle damping
        n.group.lookAt(camera.position.x * 0.3, camera.position.y * 0.3, camera.position.z);

        // Update conduit line opacity & pulse
        const lineMat = n.conduit.line.material as THREE.LineBasicMaterial;
        lineMat.opacity = isSelected ? 0.8 : isHovered ? 0.5 : 0.18;
        lineMat.color.setHex(isSelected ? 0x00ff66 : 0x00f0ff);

        const pointOnCurve = n.conduit.curve.getPointAt(pulseT);
        n.conduit.pulse.position.copy(pointOnCurve);
        n.conduit.pulse.visible = isSelected || isHovered;
      });

      // Smooth camera motion
      if (activeNodeObj) {
        const n = activeNodeObj as Node3D;
        targetCameraPos.set(n.targetX * 0.45, 1.2, 7.8);
        targetCameraLook.set(n.targetX * 0.25, n.targetY * 0.3, 0);
      } else {
        targetCameraPos.set(0, 1.2, 8.5);
        targetCameraLook.set(0, 0, 0);
      }

      camera.position.lerp(targetCameraPos, 0.04);
      camera.lookAt(targetCameraLook);

      renderer.render(scene, camera);
    };

    animate();

    // 8. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 550;
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
      className="relative w-full h-[460px] sm:h-[520px] md:h-[560px] rounded-xl overflow-hidden bg-gradient-to-b from-[#050505] via-[#08080c] to-[#050505] border border-white/5 shadow-2xl"
    >
      {/* HUD Telemetry Overlay */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
        <span className="text-[10px] font-mono tracking-widest text-[#00F0FF]/80 uppercase">
          3D KNOWLEDGE CORE // INTERACTIVE NODE MATRIX
        </span>
      </div>

      <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none text-[11px] font-mono text-zinc-500">
        <div className="flex items-center gap-2">
          <span className="text-zinc-400">INPUT:</span>
          <span>CLICK NODE TO FOCUS // ROTATE STREAM</span>
        </div>
        <div className="flex items-center gap-3 text-[#00F0FF]/60">
          <span>TOPOLOGY: DISTRIBUTED LECTURE GRAPH</span>
          <span>VERIFIED: SHA-256</span>
        </div>
      </div>
    </div>
  );
};
