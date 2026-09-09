"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { knowledgeStackLayers } from "@/data/teaching";

interface TeachingKnowledgeStackCanvasProps {
  activeLayerIndex?: number | null;
  onHoverLayer?: (index: number | null) => void;
}

export function TeachingKnowledgeStackCanvas({
  activeLayerIndex = null,
  onHoverLayer,
}: TeachingKnowledgeStackCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeLayerRef = useRef<number | null>(activeLayerIndex);
  const onHoverLayerRef = useRef(onHoverLayer);

  useEffect(() => {
    activeLayerRef.current = activeLayerIndex;
  }, [activeLayerIndex]);

  useEffect(() => {
    onHoverLayerRef.current = onHoverLayer;
  }, [onHoverLayer]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let reqId: number;
    let width = container.clientWidth || 480;
    let height = container.clientHeight || 520;

    // 1. SCENE SETUP
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 1000);
    camera.position.set(0, 1.2, 10.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // 2. STUDIO LIGHTING RIG
    const ambientLight = new THREE.AmbientLight(0xe2e8f0, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(8, 14, 10);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x00f0ff, 2.0);
    fillLight.position.set(-10, -6, 8);
    scene.add(fillLight);

    const topRimLight = new THREE.DirectionalLight(0x94a3b8, 2.2);
    topRimLight.position.set(0, 16, -10);
    scene.add(topRimLight);

    // 3. MASTER MATERIALS & PROCEDURAL GEOMETRY
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x0c1424,
      roughness: 0.25,
      metalness: 0.9,
    });

    const coreCircuitMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
    });

    function createBeveledPlate(w: number, h: number, d: number, radius: number = 0.08): THREE.BufferGeometry {
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
        bevelSegments: 4,
        steps: 1,
        bevelSize: radius,
        bevelThickness: radius,
      };

      const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geo.center();
      geo.computeVertexNormals();
      return geo;
    }

    function createLayerTexture(label: string, tech: string, color: string): THREE.CanvasTexture {
      const canvas = document.createElement("canvas");
      canvas.width = 640;
      canvas.height = 120;
      const ctx = canvas.getContext("2d")!;

      ctx.fillStyle = "#070c18";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = `${color}70`;
      ctx.lineWidth = 2.5;
      ctx.strokeRect(8, 8, canvas.width - 16, canvas.height - 16);

      ctx.fillStyle = color;
      ctx.font = "bold 20px monospace";
      ctx.fillText(label, 24, 48);

      ctx.fillStyle = "#94A3B8";
      ctx.font = "bold 16px monospace";
      ctx.fillText(`TECH: ${tech}`, 24, 88);

      ctx.fillStyle = color;
      ctx.fillRect(canvas.width - 32, 20, 8, 80);

      return new THREE.CanvasTexture(canvas);
    }

    // 4. BUILD 6 SEPARATING KNOWLEDGE STRATA LAYERS
    const stackWorld = new THREE.Group();
    scene.add(stackWorld);

    interface Layer3DItem {
      group: THREE.Group;
      mesh: THREE.Mesh;
      aperture: THREE.Mesh;
      baseY: number;
      expandedY: number;
    }

    const layerItems: Layer3DItem[] = [];
    const interactiveMeshes: THREE.Mesh[] = [];

    const plateGeo = createBeveledPlate(3.6, 0.45, 1.8, 0.08);
    const apertureGeo = new THREE.PlaneGeometry(3.4, 0.38);

    const numLayers = knowledgeStackLayers.length; // 6

    knowledgeStackLayers.forEach((lData, idx) => {
      const layerGroup = new THREE.Group();

      // Top layer is idx 0 (highest Y), bottom layer is idx 5 (lowest Y)
      const normalizedIdx = numLayers - 1 - idx;
      const baseY = (normalizedIdx - (numLayers - 1) / 2) * 0.55;
      const expandedY = (normalizedIdx - (numLayers - 1) / 2) * 0.85;

      layerGroup.position.set(0, baseY, 0);

      // Chassis
      const plateMesh = new THREE.Mesh(plateGeo, chassisMat.clone());
      plateMesh.castShadow = true;
      layerGroup.add(plateMesh);

      // Front aperture face
      const apMat = new THREE.MeshStandardMaterial({
        map: createLayerTexture(lData.label, lData.tech, lData.color),
        roughness: 0.2,
        metalness: 0.35,
        emissive: new THREE.Color(lData.color),
        emissiveIntensity: 0.05,
      });
      const aperture = new THREE.Mesh(apertureGeo, apMat);
      aperture.position.set(0, 0, 0.91);
      layerGroup.add(aperture);

      // Internal circuitry pins
      const pinGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.3, 8);
      const pin1 = new THREE.Mesh(pinGeo, coreCircuitMat);
      pin1.position.set(-1.4, 0, 0);
      layerGroup.add(pin1);

      const pin2 = new THREE.Mesh(pinGeo, coreCircuitMat);
      pin2.position.set(1.4, 0, 0);
      layerGroup.add(pin2);

      aperture.userData = { index: idx };
      interactiveMeshes.push(aperture);

      stackWorld.add(layerGroup);
      layerItems.push({
        group: layerGroup,
        mesh: plateMesh,
        aperture,
        baseY,
        expandedY,
      });
    });

    // 5. MOUSE PARALLAX & RAYCASTING
    let mouseX = 0;
    let mouseY = 0;
    const raycaster = new THREE.Raycaster();
    const mouseCoord = new THREE.Vector2(-100, -100);

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = x * 0.3;
      mouseY = y * 0.2;

      mouseCoord.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseCoord.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(mouseCoord, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes, false);

      if (intersects.length > 0) {
        container.style.cursor = "pointer";
        const idx = intersects[0].object.userData.index;
        onHoverLayerRef.current?.(idx);
      } else {
        container.style.cursor = "default";
        onHoverLayerRef.current?.(null);
      }
    };

    window.addEventListener("mousemove", onPointerMove);

    // 6. RENDER LOOP
    let clock = new THREE.Clock();

    const renderLoop = () => {
      reqId = requestAnimationFrame(renderLoop);
      const time = clock.getElapsedTime();

      // Gentle continuous rotation & mouse tilt
      stackWorld.rotation.y = Math.sin(time * 0.4) * 0.08 + mouseX * 0.4;
      stackWorld.rotation.x = 0.15 - mouseY * 0.3;

      // Animate strata layers separation
      const activeIdx = activeLayerRef.current;

      layerItems.forEach((item, idx) => {
        const isActive = activeIdx === idx;
        const targetY = activeIdx !== null ? (isActive ? item.expandedY * 1.15 : item.expandedY) : item.expandedY;
        const targetScale = isActive ? 1.06 : 1.0;

        item.group.position.y += (targetY - item.group.position.y) * 0.08;
        item.group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

        const apMat = item.aperture.material as THREE.MeshStandardMaterial;
        apMat.emissiveIntensity = isActive ? 0.4 : 0.05;
      });

      renderer.render(scene, camera);
    };

    renderLoop();

    // 7. RESIZE HANDLER
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 480;
      height = container.clientHeight || 520;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onPointerMove);
      cancelAnimationFrame(reqId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full min-h-[440px] relative" />;
}
