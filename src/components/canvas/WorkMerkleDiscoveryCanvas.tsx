"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import {
  workCategoriesData,
  WorkCategoryItem,
  WorkProjectItem,
} from "@/data/work-categories";

interface WorkMerkleDiscoveryCanvasProps {
  selectedCategoryId: string | null;
  selectedProjectId: string | null;
  hoveredCategoryId: string | null;
  hoveredProjectId: string | null;
  onHoverCategory: (catId: string | null) => void;
  onSelectCategory: (catId: string) => void;
  onHoverProject: (projId: string | null) => void;
  onSelectProject: (projId: string) => void;
  onResetToRoot?: () => void;
}

export function WorkMerkleDiscoveryCanvas({
  selectedCategoryId,
  selectedProjectId,
  hoveredCategoryId,
  hoveredProjectId,
  onHoverCategory,
  onSelectCategory,
  onHoverProject,
  onSelectProject,
  onResetToRoot,
}: WorkMerkleDiscoveryCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedCatRef = useRef<string | null>(selectedCategoryId);
  const selectedProjRef = useRef<string | null>(selectedProjectId);
  const hoveredCatRef = useRef<string | null>(hoveredCategoryId);
  const hoveredProjRef = useRef<string | null>(hoveredProjectId);

  const onHoverCatRef = useRef(onHoverCategory);
  const onSelectCatRef = useRef(onSelectCategory);
  const onHoverProjRef = useRef(onHoverProject);
  const onSelectProjRef = useRef(onSelectProject);
  const onResetToRootRef = useRef(onResetToRoot);

  useEffect(() => {
    selectedCatRef.current = selectedCategoryId;
  }, [selectedCategoryId]);

  useEffect(() => {
    selectedProjRef.current = selectedProjectId;
  }, [selectedProjectId]);

  useEffect(() => {
    hoveredCatRef.current = hoveredCategoryId;
  }, [hoveredCategoryId]);

  useEffect(() => {
    hoveredProjRef.current = hoveredProjectId;
  }, [hoveredProjectId]);

  useEffect(() => {
    onHoverCatRef.current = onHoverCategory;
    onSelectCatRef.current = onSelectCategory;
    onHoverProjRef.current = onHoverProject;
    onSelectProjRef.current = onSelectProject;
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let reqId: number;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. SCENE SETUP
    const scene = new THREE.Scene();

    const isMobile = width < 768;
    const camera = new THREE.PerspectiveCamera(isMobile ? 50 : 38, width / height, 0.1, 1000);
    camera.position.set(0, 0.8, 14.8);

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
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // 2. STUDIO LIGHTING RIG
    const ambientLight = new THREE.AmbientLight(0xe2e8f0, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.8);
    keyLight.position.set(10, 18, 14);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const cyanRimLight = new THREE.DirectionalLight(0x00f0ff, 2.4);
    cyanRimLight.position.set(-12, -6, 12);
    scene.add(cyanRimLight);

    const topLight = new THREE.DirectionalLight(0x94a3b8, 2.2);
    topLight.position.set(0, 20, -10);
    scene.add(topLight);

    // Subtle background ground grid
    const gridHelper = new THREE.GridHelper(70, 35, 0x00f0ff, 0x1e293b);
    gridHelper.position.set(0, -6.5, -4);
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.12;
    scene.add(gridHelper);

    // 3. MASTER MATERIALS
    const rootChassisMat = new THREE.MeshStandardMaterial({
      color: 0x0b111e,
      roughness: 0.2,
      metalness: 0.95,
      emissive: 0x001d2d,
      emissiveIntensity: 0.35,
    });

    const intermedChassisMat = new THREE.MeshStandardMaterial({
      color: 0x0c1424,
      roughness: 0.24,
      metalness: 0.92,
      emissive: 0x061122,
      emissiveIntensity: 0.25,
    });

    const categoryChassisMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.28,
      metalness: 0.9,
    });

    const projectChassisMat = new THREE.MeshStandardMaterial({
      color: 0x0a101d,
      roughness: 0.25,
      metalness: 0.92,
    });

    const conduitMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      roughness: 0.2,
      metalness: 0.95,
    });

    const pulseLaserMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
    });

    // 4. PROCEDURAL TEXTURE GENERATORS
    function createRootTexture(): THREE.CanvasTexture {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 360;
      const ctx = canvas.getContext("2d")!;

      ctx.fillStyle = "#070c16";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "rgba(0, 240, 255, 0.4)";
      ctx.lineWidth = 2.5;
      ctx.strokeRect(16, 16, canvas.width - 32, canvas.height - 32);

      ctx.fillStyle = "#00F0FF";
      ctx.font = "bold 16px monospace";
      ctx.fillText("MERKLE ROOT // H_ABCD", 32, 50);

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 32px sans-serif";
      ctx.fillText("WORK ROOT", 32, 100);

      ctx.fillStyle = "#64748B";
      ctx.font = "bold 16px monospace";
      ctx.fillText("Hash [ H_AB + H_CD ]", 32, 135);

      ctx.strokeStyle = "#1e293b";
      ctx.beginPath();
      ctx.moveTo(32, 155);
      ctx.lineTo(canvas.width - 32, 155);
      ctx.stroke();

      ctx.fillStyle = "#38BDF8";
      ctx.font = "14px monospace";
      ctx.fillText("● 4 ACTIVE DOMAIN BRANCHES", 32, 195);
      ctx.fillText("● UNBROKEN STATE TREE", 32, 225);

      ctx.fillStyle = "#00F0FF";
      ctx.font = "bold 15px monospace";
      ctx.fillText("[ SELECT DOMAIN BRANCH ↓ ]", 32, 310);

      return new THREE.CanvasTexture(canvas);
    }

    function createIntermedTexture(label: string, hash: string): THREE.CanvasTexture {
      const canvas = document.createElement("canvas");
      canvas.width = 420;
      canvas.height = 240;
      const ctx = canvas.getContext("2d")!;

      ctx.fillStyle = "#080e1b";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "rgba(56, 189, 248, 0.35)";
      ctx.lineWidth = 2;
      ctx.strokeRect(12, 12, canvas.width - 24, canvas.height - 24);

      ctx.fillStyle = "#38BDF8";
      ctx.font = "bold 16px monospace";
      ctx.fillText(hash, 24, 45);

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 24px sans-serif";
      ctx.fillText(label, 24, 90);

      ctx.strokeStyle = "#1e293b";
      ctx.beginPath();
      ctx.moveTo(24, 110);
      ctx.lineTo(canvas.width - 24, 110);
      ctx.stroke();

      ctx.fillStyle = "#64748B";
      ctx.font = "13px monospace";
      ctx.fillText("BINARY BRANCH INTERMEDIATE", 24, 145);

      ctx.fillStyle = "#00F0FF";
      ctx.font = "bold 13px monospace";
      ctx.fillText("↓ 2 SUB-BRANCHES", 24, 195);

      return new THREE.CanvasTexture(canvas);
    }

    function createCategoryTexture(cat: WorkCategoryItem, hashSymbol: string): THREE.CanvasTexture {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 360;
      const ctx = canvas.getContext("2d")!;

      ctx.fillStyle = "#070c16";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = `${cat.accentColor}90`;
      ctx.lineWidth = 3;
      ctx.strokeRect(16, 16, canvas.width - 32, canvas.height - 32);

      ctx.fillStyle = cat.accentColor;
      ctx.font = "bold 16px monospace";
      ctx.fillText(`LEAF // ${hashSymbol}`, 36, 50);

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 32px sans-serif";
      ctx.fillText(cat.title, 36, 100);

      ctx.fillStyle = "#94A3B8";
      ctx.font = "15px monospace";
      ctx.fillText(`${cat.projects.length} PROJECTS`, 36, 135);

      ctx.strokeStyle = "#1e293b";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(36, 155);
      ctx.lineTo(canvas.width - 36, 155);
      ctx.stroke();

      ctx.fillStyle = "#cbd5e1";
      ctx.font = "13px sans-serif";
      ctx.fillText(cat.tagline.slice(0, 42), 36, 195);

      ctx.fillStyle = cat.accentColor;
      ctx.font = "bold 15px monospace";
      ctx.fillText("CLICK TO EXPAND PROJECTS ↓", 36, 310);

      return new THREE.CanvasTexture(canvas);
    }

    function createProjectTexture(proj: WorkProjectItem): THREE.CanvasTexture {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 320;
      const ctx = canvas.getContext("2d")!;

      ctx.fillStyle = "#080e1b";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "rgba(0, 240, 255, 0.4)";
      ctx.lineWidth = 2;
      ctx.strokeRect(16, 16, canvas.width - 32, canvas.height - 32);

      ctx.fillStyle = "#00F0FF";
      ctx.font = "bold 14px monospace";
      ctx.fillText(`LEAF // ${proj.year} · ${proj.status}`, 32, 45);

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 26px sans-serif";
      ctx.fillText(proj.name.slice(0, 28), 32, 90);

      ctx.fillStyle = "#38BDF8";
      ctx.font = "bold 16px monospace";
      ctx.fillText(proj.subtitle.slice(0, 38), 32, 125);

      ctx.strokeStyle = "#1e293b";
      ctx.beginPath();
      ctx.moveTo(32, 145);
      ctx.lineTo(canvas.width - 32, 145);
      ctx.stroke();

      ctx.fillStyle = "#94A3B8";
      ctx.font = "14px monospace";
      ctx.fillText(`STACK: ${proj.techStack.slice(0, 3).join(" · ")}`, 32, 185);

      ctx.fillStyle = "#00F0FF";
      ctx.font = "bold 14px monospace";
      ctx.fillText("[ ENTER SYSTEM ARCHITECTURE ]", 32, 275);

      return new THREE.CanvasTexture(canvas);
    }

    // Helper: Rounded Box Extrusion
    function createBeveledBox(w: number, h: number, d: number, radius: number = 0.12): THREE.BufferGeometry {
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

    // Helper: Create Orthogonal Tree Conduit (Down -> Horizontal -> Down)
    function createTreeConduit(
      start: THREE.Vector3,
      end: THREE.Vector3
    ): { group: THREE.Group; pulseNode: THREE.Mesh; path: THREE.CurvePath<THREE.Vector3> } {
      const group = new THREE.Group();
      const midY = (start.y + end.y) * 0.5;

      const path = new THREE.CurvePath<THREE.Vector3>();
      path.add(new THREE.LineCurve3(start, new THREE.Vector3(start.x, midY, start.z)));
      path.add(new THREE.LineCurve3(new THREE.Vector3(start.x, midY, start.z), new THREE.Vector3(end.x, midY, end.z)));
      path.add(new THREE.LineCurve3(new THREE.Vector3(end.x, midY, end.z), end));

      const tubeGeo = new THREE.TubeGeometry(path, 40, 0.035, 8, false);
      const tubeMesh = new THREE.Mesh(tubeGeo, conduitMat);
      group.add(tubeMesh);

      // Center Laser Core
      const laserGeo = new THREE.TubeGeometry(path, 40, 0.015, 6, false);
      const laserMesh = new THREE.Mesh(laserGeo, pulseLaserMat);
      group.add(laserMesh);

      // Animated Pulse Sphere
      const pulseGeo = new THREE.SphereGeometry(0.08, 16, 16);
      const pulseNode = new THREE.Mesh(pulseGeo, pulseLaserMat);
      pulseNode.position.copy(start);
      group.add(pulseNode);

      return { group, pulseNode, path };
    }

    // 5. BUILD TOP-DOWN BINARY MERKLE TREE HIERARCHY
    const treeWorld = new THREE.Group();
    scene.add(treeWorld);

    const interactiveMeshes: THREE.Mesh[] = [];

    // 5A. LEVEL 0: MERKLE ROOT NODE (y = 3.6)
    const rootPos = new THREE.Vector3(0, 3.6, 0);
    const rootGroup = new THREE.Group();
    rootGroup.position.copy(rootPos);

    const rootChassisGeo = createBeveledBox(2.8, 1.8, 0.6, 0.14);
    const rootChassis = new THREE.Mesh(rootChassisGeo, rootChassisMat);
    rootChassis.castShadow = true;
    rootGroup.add(rootChassis);

    const rootApertureGeo = new THREE.PlaneGeometry(2.55, 1.55);
    const rootApertureMat = new THREE.MeshStandardMaterial({
      map: createRootTexture(),
      roughness: 0.2,
      metalness: 0.35,
      emissive: new THREE.Color(0x00f0ff),
      emissiveIntensity: 0.05,
    });
    const rootAperture = new THREE.Mesh(rootApertureGeo, rootApertureMat);
    rootAperture.position.set(0, 0, 0.31);
    rootAperture.userData = { type: "root" };
    interactiveMeshes.push(rootAperture);
    rootGroup.add(rootAperture);

    treeWorld.add(rootGroup);

    // 5B. LEVEL 1: INTERMEDIATE HASH NODES (H_AB & H_CD at y = 1.3)
    const intermedLeftPos = new THREE.Vector3(-3.45, 1.3, 0);
    const intermedRightPos = new THREE.Vector3(3.45, 1.3, 0);

    const intermedChassisGeo = createBeveledBox(2.3, 1.3, 0.45, 0.1);

    // Left Intermediate H_AB
    const intermedLeftGroup = new THREE.Group();
    intermedLeftGroup.position.copy(intermedLeftPos);
    const intermedLeftMesh = new THREE.Mesh(intermedChassisGeo, intermedChassisMat);
    intermedLeftGroup.add(intermedLeftMesh);

    const intermedLeftAperture = new THREE.Mesh(
      new THREE.PlaneGeometry(2.1, 1.1),
      new THREE.MeshStandardMaterial({
        map: createIntermedTexture("CORE & DAPPS", "H_AB = Hash[H_A + H_B]"),
        roughness: 0.2,
        metalness: 0.35,
      })
    );
    intermedLeftAperture.position.set(0, 0, 0.23);
    intermedLeftAperture.userData = { type: "root" };
    interactiveMeshes.push(intermedLeftAperture);
    intermedLeftGroup.add(intermedLeftAperture);
    treeWorld.add(intermedLeftGroup);

    // Right Intermediate H_CD
    const intermedRightGroup = new THREE.Group();
    intermedRightGroup.position.copy(intermedRightPos);
    const intermedRightMesh = new THREE.Mesh(intermedChassisGeo, intermedChassisMat);
    intermedRightGroup.add(intermedRightMesh);

    const intermedRightAperture = new THREE.Mesh(
      new THREE.PlaneGeometry(2.1, 1.1),
      new THREE.MeshStandardMaterial({
        map: createIntermedTexture("INFRA & RESEARCH", "H_CD = Hash[H_C + H_D]"),
        roughness: 0.2,
        metalness: 0.35,
      })
    );
    intermedRightAperture.position.set(0, 0, 0.23);
    intermedRightAperture.userData = { type: "root" };
    interactiveMeshes.push(intermedRightAperture);
    intermedRightGroup.add(intermedRightAperture);
    treeWorld.add(intermedRightGroup);

    // Conduits from Root -> Intermediate Nodes
    const rootToLeftConduit = createTreeConduit(
      new THREE.Vector3(0, rootPos.y - 0.9, 0),
      new THREE.Vector3(intermedLeftPos.x, intermedLeftPos.y + 0.65, 0)
    );
    treeWorld.add(rootToLeftConduit.group);

    const rootToRightConduit = createTreeConduit(
      new THREE.Vector3(0, rootPos.y - 0.9, 0),
      new THREE.Vector3(intermedRightPos.x, intermedRightPos.y + 0.65, 0)
    );
    treeWorld.add(rootToRightConduit.group);

    // 5C. LEVEL 2: FOUR CATEGORY NODES (y = -1.0)
    interface Category3DItem {
      catData: WorkCategoryItem;
      group: THREE.Group;
      chassis: THREE.Mesh;
      aperture: THREE.Mesh;
      conduit: { group: THREE.Group; pulseNode: THREE.Mesh; path: THREE.CurvePath<THREE.Vector3> };
      projectItems: {
        projData: WorkProjectItem;
        group: THREE.Group;
        chassis: THREE.Mesh;
        aperture: THREE.Mesh;
        subConduit: { group: THREE.Group; pulseNode: THREE.Mesh; path: THREE.CurvePath<THREE.Vector3> };
      }[];
    }

    const category3DItems: Category3DItem[] = [];

    const categoryChassisGeo = createBeveledBox(2.4, 1.5, 0.5, 0.12);
    const projectChassisGeo = createBeveledBox(2.0, 1.25, 0.35, 0.1);

    const hashSymbols = ["H_A (PROTOCOL)", "H_B (DAPPS)", "H_C (FULL-STACK)", "H_D (LEARNING)"];

    workCategoriesData.forEach((cat, idx) => {
      const catGroup = new THREE.Group();
      catGroup.position.set(cat.nodePos[0], cat.nodePos[1], cat.nodePos[2]);

      // Category Chassis
      const catChassis = new THREE.Mesh(categoryChassisGeo, categoryChassisMat.clone());
      catChassis.castShadow = true;
      catGroup.add(catChassis);

      // Category Front Aperture
      const catApertureGeo = new THREE.PlaneGeometry(2.2, 1.3);
      const catApertureMat = new THREE.MeshStandardMaterial({
        map: createCategoryTexture(cat, hashSymbols[idx]),
        roughness: 0.2,
        metalness: 0.35,
        emissive: new THREE.Color(cat.accentColor),
        emissiveIntensity: 0.05,
      });
      const catAperture = new THREE.Mesh(catApertureGeo, catApertureMat);
      catAperture.position.set(0, 0, 0.26);
      catGroup.add(catAperture);

      // Raycasting metadata
      catAperture.userData = { type: "category", id: cat.id };
      interactiveMeshes.push(catAperture);

      treeWorld.add(catGroup);

      // Binary tree conduit from intermediate parent node to category leaf
      const parentPos = idx < 2 ? intermedLeftPos : intermedRightPos;
      const conduit = createTreeConduit(
        new THREE.Vector3(parentPos.x, parentPos.y - 0.65, 0),
        new THREE.Vector3(cat.nodePos[0], cat.nodePos[1] + 0.75, 0)
      );
      treeWorld.add(conduit.group);

      // 5D. LEVEL 3: PROJECT LEAVES (Emerge vertically beneath parent category)
      const projectItems: Category3DItem["projectItems"] = [];

      cat.projects.forEach((proj, pIdx) => {
        const projGroup = new THREE.Group();

        // Arrange project leaf nodes directly beneath parent category
        const numP = cat.projects.length;
        const offsetX = (pIdx - (numP - 1) / 2) * 2.3;
        const targetProjPos = new THREE.Vector3(cat.nodePos[0] + offsetX, cat.nodePos[1] - 2.6, 0.4);

        projGroup.position.copy(targetProjPos);

        // Project Chassis
        const projChassis = new THREE.Mesh(projectChassisGeo, projectChassisMat.clone());
        projChassis.castShadow = true;
        projGroup.add(projChassis);

        // Project Aperture
        const projApertureGeo = new THREE.PlaneGeometry(1.85, 1.1);
        const projApertureMat = new THREE.MeshStandardMaterial({
          map: createProjectTexture(proj),
          roughness: 0.2,
          metalness: 0.35,
          emissive: new THREE.Color(0x00f0ff),
          emissiveIntensity: 0.0,
        });
        const projAperture = new THREE.Mesh(projApertureGeo, projApertureMat);
        projAperture.position.set(0, 0, 0.18);
        projGroup.add(projAperture);

        projAperture.userData = { type: "project", id: proj.id, catId: cat.id };
        interactiveMeshes.push(projAperture);

        // Sub-conduit from Category to Project Leaf
        const subConduit = createTreeConduit(
          new THREE.Vector3(cat.nodePos[0], cat.nodePos[1] - 0.75, 0),
          new THREE.Vector3(targetProjPos.x, targetProjPos.y + 0.62, targetProjPos.z)
        );

        treeWorld.add(subConduit.group);
        treeWorld.add(projGroup);

        // Initially hidden until category is selected
        projGroup.visible = false;
        projGroup.scale.set(0.001, 0.001, 0.001);
        subConduit.group.visible = false;
        subConduit.group.scale.set(0.001, 0.001, 0.001);

        projectItems.push({
          projData: proj,
          group: projGroup,
          chassis: projChassis,
          aperture: projAperture,
          subConduit,
        });
      });

      category3DItems.push({
        catData: cat,
        group: catGroup,
        chassis: catChassis,
        aperture: catAperture,
        conduit,
        projectItems,
      });
    });

    // 6. CAMERA TARGETS & INTERACTION ENGINE
    const cameraTarget = {
      x: 0,
      y: 0.8,
      z: 14.8,
      lookX: 0,
      lookY: 0.5,
      lookZ: 0,
    };

    // Raycaster for Hover & Click
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-100, -100);

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes, false);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const uData = hit.userData;
        if (uData.type === "category") {
          container.style.cursor = "pointer";
          onHoverCatRef.current(uData.id);
          onHoverProjRef.current(null);
        } else if (uData.type === "project") {
          container.style.cursor = "pointer";
          onHoverProjRef.current(uData.id);
        } else if (uData.type === "root") {
          container.style.cursor = "pointer";
          onHoverCatRef.current(null);
          onHoverProjRef.current(null);
        }
      } else {
        container.style.cursor = "default";
        onHoverCatRef.current(null);
        onHoverProjRef.current(null);
      }
    };

    const onPointerClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes, false);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const uData = hit.userData;
        if (uData.type === "category") {
          onSelectCatRef.current(uData.id);
        } else if (uData.type === "project") {
          onSelectProjRef.current(uData.id);
        } else if (uData.type === "root") {
          onResetToRootRef.current?.();
        }
      } else {
        // Reverse click on empty space: step back in hierarchy
        if (selectedProjRef.current) {
          onSelectProjRef.current(selectedProjRef.current);
        } else if (selectedCatRef.current) {
          onSelectCatRef.current(selectedCatRef.current);
        }
      }
    };

    window.addEventListener("mousemove", onPointerMove);
    container.addEventListener("click", onPointerClick);

    // 7. RENDER LOOP
    const clock = new THREE.Clock();

    const renderLoop = () => {
      reqId = requestAnimationFrame(renderLoop);
      const time = clock.getElapsedTime();

      const activeCatId = selectedCatRef.current;
      const activeProjId = selectedProjRef.current;
      const hovCatId = hoveredCatRef.current;
      const hovProjId = hoveredProjRef.current;

      // Update Camera Target based on Tree Exploration
      if (activeProjId && activeCatId) {
        // Focused on specific project leaf
        const catItem = category3DItems.find((c) => c.catData.id === activeCatId);
        const pItem = catItem?.projectItems.find((p) => p.projData.id === activeProjId);
        if (pItem) {
          cameraTarget.x = pItem.group.position.x;
          cameraTarget.y = pItem.group.position.y;
          cameraTarget.z = pItem.group.position.z + 4.2;
          cameraTarget.lookX = pItem.group.position.x;
          cameraTarget.lookY = pItem.group.position.y;
          cameraTarget.lookZ = pItem.group.position.z;
        }
      } else if (activeCatId) {
        // Focused on selected Category subtree
        const catItem = category3DItems.find((c) => c.catData.id === activeCatId);
        if (catItem) {
          cameraTarget.x = catItem.catData.nodePos[0] * 0.9;
          cameraTarget.y = -1.8;
          cameraTarget.z = 8.6;
          cameraTarget.lookX = catItem.catData.nodePos[0];
          cameraTarget.lookY = -1.8;
          cameraTarget.lookZ = 0;
        }
      } else {
        // Full Merkle Tree Overview
        cameraTarget.x = 0;
        cameraTarget.y = 0.8;
        cameraTarget.z = 14.8;
        cameraTarget.lookX = 0;
        cameraTarget.lookY = 0.5;
        cameraTarget.lookZ = 0;
      }

      // Smooth Camera Lerp
      camera.position.x += (cameraTarget.x - camera.position.x) * 0.06;
      camera.position.y += (cameraTarget.y - camera.position.y) * 0.06;
      camera.position.z += (cameraTarget.z - camera.position.z) * 0.06;
      camera.lookAt(cameraTarget.lookX, cameraTarget.lookY, cameraTarget.lookZ);

      // Animate Level 0 -> Level 1 Conduits along exact 3D curve paths
      const t1 = (time * 0.75) % 1.0;
      rootToLeftConduit.path.getPoint(t1, rootToLeftConduit.pulseNode.position);
      rootToRightConduit.path.getPoint(t1, rootToRightConduit.pulseNode.position);

      // Update Categories & Sub-trees
      category3DItems.forEach((cItem, cIdx) => {
        const isSelected = cItem.catData.id === activeCatId;
        const isHovered = cItem.catData.id === hovCatId;
        const hasActiveSelection = activeCatId !== null;

        // Subdue unselected nodes
        const targetOpacity = hasActiveSelection ? (isSelected ? 1.0 : 0.15) : isHovered ? 1.0 : 0.9;
        const targetScale = isSelected ? 1.08 : isHovered ? 1.05 : 1.0;

        cItem.group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        (cItem.aperture.material as THREE.MeshStandardMaterial).opacity = targetOpacity;
        (cItem.aperture.material as THREE.MeshStandardMaterial).transparent = true;
        (cItem.aperture.material as THREE.MeshStandardMaterial).emissiveIntensity =
          isSelected || isHovered ? 0.4 : 0.05;

        // Animate Level 1 -> Level 2 Conduits along exact 3D curve path
        const t2 = (time * 0.75 + 0.35 + cIdx * 0.15) % 1.0;
        cItem.conduit.path.getPoint(t2, cItem.conduit.pulseNode.position);

        // Update Project Leaves
        cItem.projectItems.forEach((pItem, pIdx) => {
          const isProjSelected = pItem.projData.id === activeProjId;
          const isProjHovered = pItem.projData.id === hovProjId;

          if (isSelected) {
            pItem.group.visible = true;
            pItem.subConduit.group.visible = true;

            const pScale = isProjSelected ? 1.12 : isProjHovered ? 1.06 : 1.0;
            pItem.group.scale.lerp(new THREE.Vector3(pScale, pScale, pScale), 0.1);
            pItem.subConduit.group.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);

            (pItem.aperture.material as THREE.MeshStandardMaterial).emissiveIntensity =
              isProjSelected ? 0.5 : isProjHovered ? 0.3 : 0.05;

            // Animate Level 2 -> Project Leaf Conduits along exact 3D curve path
            const t3 = (time * 0.75 + 0.7 + pIdx * 0.2) % 1.0;
            pItem.subConduit.path.getPoint(t3, pItem.subConduit.pulseNode.position);
          } else {
            pItem.group.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), 0.15);
            pItem.subConduit.group.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), 0.15);
            if (pItem.group.scale.x < 0.01) {
              pItem.group.visible = false;
              pItem.subConduit.group.visible = false;
            }
          }
        });
      });

      renderer.render(scene, camera);
    };

    renderLoop();

    // 8. RESIZE HANDLER
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      const isMob = width < 768;
      camera.fov = isMob ? 50 : 38;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onPointerMove);
      container.removeEventListener("click", onPointerClick);
      cancelAnimationFrame(reqId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full relative" />;
}
