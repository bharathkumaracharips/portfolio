"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface NodeData {
  id: string;
  name: string;
  bpm: number;
  spo2: number;
  hrv: number;
  temp: string;
  color: string;
  address: string;
}

const NODES: NodeData[] = [
  { id: "W1", name: "PATIENT 01", bpm: 72, spo2: 98, hrv: 64, temp: "36.6°C", color: "#00f0ff", address: "0x7E14...89B2" },
  { id: "W2", name: "PATIENT 02", bpm: 68, spo2: 99, hrv: 70, temp: "36.4°C", color: "#34d399", address: "0x3F82...44C1" },
  { id: "W3", name: "PATIENT 03", bpm: 81, spo2: 97, hrv: 58, temp: "36.8°C", color: "#f43f5e", address: "0x91A4...22D8" },
  { id: "W4", name: "PATIENT 04", bpm: 75, spo2: 98, hrv: 66, temp: "36.5°C", color: "#fbbf24", address: "0x62C7...19E3" },
  { id: "W5", name: "PATIENT 05", bpm: 69, spo2: 99, hrv: 72, temp: "36.7°C", color: "#a78bfa", address: "0x83B1...90F5" },
];

interface Scene01Props {
  scrollProgress?: number;
}

export function Scene01SmartwatchExperience({ scrollProgress }: Scene01Props = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<number | undefined>(scrollProgress);

  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- 1. THREE.JS SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.background = null;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // FOV 40 for refined compact cinematic framing
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 150);
    camera.position.set(2.1, 2.9, 8.2);
    camera.lookAt(0, 2.3, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
      alpha: true,
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // --- 2. SMARTWATCH GEOMETRIES & MATERIALS ---
    const caseWidth = 1.85;
    const caseHeight = 2.32;
    const caseDepth = 0.44;
    const cornerRadius = 0.46;

    const createRoundedRectShape = (w: number, h: number, r: number) => {
      const shape = new THREE.Shape();
      const hw = w / 2;
      const hh = h / 2;
      shape.moveTo(-hw + r, -hh);
      shape.lineTo(hw - r, -hh);
      shape.quadraticCurveTo(hw, -hh, hw, -hh + r);
      shape.lineTo(hw, hh - r);
      shape.quadraticCurveTo(hw, hh, hw - r, hh);
      shape.lineTo(-hw + r, hh);
      shape.quadraticCurveTo(-hw, hh, -hw, hh - r);
      shape.lineTo(-hw, -hh + r);
      shape.quadraticCurveTo(-hw, -hh, -hw + r, -hh);
      return shape;
    };

    const caseShape = createRoundedRectShape(caseWidth, caseHeight, cornerRadius);
    const caseGeo = new THREE.ExtrudeGeometry(caseShape, {
      depth: caseDepth,
      bevelEnabled: true,
      bevelSegments: 8,
      steps: 2,
      bevelSize: 0.12,
      bevelThickness: 0.12,
    });
    caseGeo.center();

    const titaniumMat = new THREE.MeshStandardMaterial({
      color: 0xdce0e5,
      metalness: 0.94,
      roughness: 0.22,
      envMapIntensity: 1.6,
    });

    const bezelShape = createRoundedRectShape(caseWidth * 0.94, caseHeight * 0.94, cornerRadius * 0.92);
    const bezelGeo = new THREE.ShapeGeometry(bezelShape);
    const bezelMat = new THREE.MeshBasicMaterial({ color: 0x020306 });

    const glassShape = createRoundedRectShape(caseWidth * 0.88, caseHeight * 0.88, cornerRadius * 0.84);
    const glassGeo = new THREE.ShapeGeometry(glassShape);

    // Normalize UV coordinates on glassGeo so the canvas texture maps 100% edge-to-edge
    glassGeo.computeBoundingBox();
    const gBox = glassGeo.boundingBox!;
    const uvAttr = glassGeo.attributes.uv;
    const posAttr = glassGeo.attributes.position;
    const gWidth = gBox.max.x - gBox.min.x;
    const gHeight = gBox.max.y - gBox.min.y;

    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);
      const u = (x - gBox.min.x) / gWidth;
      const v = (y - gBox.min.y) / gHeight;
      uvAttr.setXY(i, u, v);
    }
    uvAttr.needsUpdate = true;

    const strapWidth = 1.36;
    const strapThickness = 0.12;

    // Closed rounded loop path looping smoothly behind the watch case
    const strapPoints = [
      new THREE.Vector3(0, caseHeight / 2 - 0.02, -0.06),
      new THREE.Vector3(0, caseHeight / 2 + 0.28, -0.22),
      new THREE.Vector3(0, caseHeight / 2 + 0.22, -0.65),
      new THREE.Vector3(0, 0.75, -1.05),
      new THREE.Vector3(0, 0.0, -1.16),
      new THREE.Vector3(0, -0.75, -1.05),
      new THREE.Vector3(0, -caseHeight / 2 - 0.22, -0.65),
      new THREE.Vector3(0, -caseHeight / 2 - 0.28, -0.22),
      new THREE.Vector3(0, -caseHeight / 2 + 0.02, -0.06),
    ];
    const strapCurve = new THREE.CatmullRomCurve3(strapPoints);

    const strapProfile = new THREE.Shape();
    const hw = strapWidth / 2;
    const ht = strapThickness / 2;
    strapProfile.moveTo(-hw + 0.04, -ht);
    strapProfile.lineTo(hw - 0.04, -ht);
    strapProfile.quadraticCurveTo(hw, -ht, hw, 0);
    strapProfile.quadraticCurveTo(hw, ht, hw - 0.04, ht);
    strapProfile.lineTo(-hw + 0.04, ht);
    strapProfile.quadraticCurveTo(-hw, ht, -hw, 0);
    strapProfile.quadraticCurveTo(-hw, -ht, -hw + 0.04, -ht);

    const closedStrapGeo = new THREE.ExtrudeGeometry(strapProfile, {
      extrudePath: strapCurve,
      steps: 72,
      bevelEnabled: false,
    });

    const claspGeo = new THREE.BoxGeometry(strapWidth * 1.04, 0.38, 0.16);

    const strapMat = new THREE.MeshStandardMaterial({
      color: 0x121724,
      roughness: 0.88,
      metalness: 0.08,
    });

    // --- 3. FLOATING COMPANION VERTICAL TERMINAL LOGS (SCENE 3) ---
    const termWidth = 2.4;
    const termHeight = 3.5;
    const termDepth = 0.08;
    const termShape = createRoundedRectShape(termWidth, termHeight, 0.18);
    const termGeo = new THREE.ExtrudeGeometry(termShape, {
      depth: termDepth,
      bevelEnabled: true,
      bevelSegments: 4,
      bevelSize: 0.03,
      bevelThickness: 0.03,
    });
    termGeo.center();

    const termChassisMat = new THREE.MeshStandardMaterial({
      color: 0x060b18,
      metalness: 0.92,
      roughness: 0.22,
      transparent: true,
      opacity: 0.94,
    });

    // --- 4. CENTRAL SMART CONTRACT HOLOGRAPHIC VAULT ---
    const contractGroup = new THREE.Group();
    contractGroup.position.set(0, -12, 0);
    scene.add(contractGroup);

    const contractPedestalGeo = new THREE.CylinderGeometry(2.2, 2.5, 0.45, 48);
    const contractPedestalMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.9,
      roughness: 0.3,
    });
    const contractPedestal = new THREE.Mesh(contractPedestalGeo, contractPedestalMat);
    contractPedestal.position.set(0, 0.22, 0);
    contractGroup.add(contractPedestal);

    const contractStandGeo = new THREE.CylinderGeometry(0.28, 0.28, 1.2, 32);
    const contractStandMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.85,
      roughness: 0.25,
    });
    const contractStand = new THREE.Mesh(contractStandGeo, contractStandMat);
    contractStand.position.set(0, 0.95, 0);
    contractGroup.add(contractStand);

    const contractWidth = 3.6;
    const contractHeight = 2.4;
    const contractDepth = 0.15;
    const contractShape = createRoundedRectShape(contractWidth, contractHeight, 0.25);
    const contractGeo = new THREE.ExtrudeGeometry(contractShape, {
      depth: contractDepth,
      bevelEnabled: true,
      bevelSegments: 5,
      bevelSize: 0.04,
      bevelThickness: 0.04,
    });
    contractGeo.center();

    const contractChassisMat = new THREE.MeshStandardMaterial({
      color: 0x0a101f,
      metalness: 0.92,
      roughness: 0.25,
    });
    const contractChassis = new THREE.Mesh(contractGeo, contractChassisMat);
    contractChassis.position.set(0, 2.2, 0);
    contractChassis.rotation.x = -0.12;
    contractGroup.add(contractChassis);

    const contractCanvas = document.createElement("canvas");
    contractCanvas.width = 1024;
    contractCanvas.height = 1024;
    const cctx = contractCanvas.getContext("2d")!;
    const contractTexture = new THREE.CanvasTexture(contractCanvas);
    contractTexture.colorSpace = THREE.SRGBColorSpace;
    contractTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const contractScreenGeo = new THREE.PlaneGeometry(contractWidth * 0.94, contractHeight * 0.94);
    const contractScreenMat = new THREE.MeshBasicMaterial({
      map: contractTexture,
      side: THREE.DoubleSide,
    });
    const contractScreen = new THREE.Mesh(contractScreenGeo, contractScreenMat);
    contractScreen.position.set(0, 2.21, contractDepth / 2 + 0.05);
    contractScreen.rotation.x = -0.12;
    contractGroup.add(contractScreen);

    const contractGlow = new THREE.PointLight(0x00f0ff, 0.9, 8);
    contractGlow.position.set(0, 2.6, 0.8);
    contractGroup.add(contractGlow);

    const updateContractCanvas = (
      watchIdx: number,
      stepProg: number,
      time: number,
      isDeployMode: boolean
    ) => {
      cctx.fillStyle = "#050a14";
      cctx.fillRect(0, 0, 1024, 1024);

      cctx.fillStyle = "#0d182e";
      cctx.fillRect(0, 0, 1024, 110);

      cctx.fillStyle = "#00f0ff";
      cctx.beginPath();
      cctx.roundRect(40, 28, 190, 54, 10);
      cctx.fill();
      cctx.fillStyle = "#000000";
      cctx.font = "700 24px 'JetBrains Mono', monospace";
      cctx.textAlign = "center";
      cctx.fillText("SMART CONTRACT", 135, 63);

      cctx.fillStyle = "#ffffff";
      cctx.font = "700 30px 'JetBrains Mono', monospace";
      cctx.textAlign = "left";
      cctx.fillText("HealthBiometricVault.sol", 255, 65);

      cctx.fillStyle = "rgba(100, 116, 139, 0.8)";
      cctx.font = "600 20px monospace";
      cctx.textAlign = "right";
      cctx.fillText(`EPOCH: ${(Math.floor(time * 2) % 999).toString().padStart(3, "0")} // EVM v1.8`, 984, 65);

      const targetNode = NODES[watchIdx] || NODES[0];

      if (isDeployMode) {
        cctx.fillStyle = "#0a1428";
        cctx.strokeStyle = "#8b5cf6";
        cctx.lineWidth = 2;
        cctx.beginPath();
        cctx.roundRect(40, 140, 944, 95, 12);
        cctx.fill();
        cctx.stroke();

        cctx.fillStyle = "#a78bfa";
        cctx.font = "700 26px 'JetBrains Mono', monospace";
        cctx.textAlign = "left";
        cctx.fillText(`function deployUpdatedModel(bytes32 modelHash, address device)`, 65, 195);

        cctx.fillStyle = "#38bdf8";
        cctx.font = "700 28px 'JetBrains Mono', monospace";
        cctx.fillText(`DISPATCHING MODEL v3.0 → ${targetNode.id} (${targetNode.name})`, 65, 290);

        cctx.fillStyle = "#091224";
        cctx.beginPath();
        cctx.roundRect(40, 330, 944, 300, 16);
        cctx.fill();

        cctx.fillStyle = "#94a3b8";
        cctx.font = "600 22px 'JetBrains Mono', monospace";
        cctx.fillText("CRYPTOGRAPHIC MODEL RELEASE SPECIFICATION:", 70, 380);

        cctx.fillStyle = "#ffffff";
        cctx.fillText(`MODEL ID: FedSTAT_Neural_v3.0.bin`, 70, 430);
        cctx.fillText(`RELEASE HASH: 0x4f8a...3b15 (EVM STATE COMMITTED)`, 70, 475);
        cctx.fillText(`PARAMETERS: 12.6M WEIGHTS // LOSS: 0.0092`, 70, 520);
        cctx.fillText(`TARGET RECIPIENT: ${targetNode.id} (${targetNode.address})`, 70, 565);
        cctx.fillText(`ZERO-KNOWLEDGE AUTH: VERIFIED VIA CONSENSUS [✓]`, 70, 610);

        const badgeY = 670;
        cctx.fillStyle = "rgba(16, 185, 129, 0.15)";
        cctx.strokeStyle = "#10b981";
        cctx.lineWidth = 4;
        cctx.beginPath();
        cctx.roundRect(40, badgeY, 944, 150, 20);
        cctx.fill();
        cctx.stroke();

        cctx.fillStyle = "#10b981";
        cctx.beginPath();
        cctx.arc(120, badgeY + 75, 45, 0, Math.PI * 2);
        cctx.fill();
        cctx.fillStyle = "#000000";
        cctx.font = "900 48px sans-serif";
        cctx.textAlign = "center";
        cctx.fillText("✓", 120, badgeY + 92);

        cctx.fillStyle = "#ffffff";
        cctx.font = "800 36px 'JetBrains Mono', monospace";
        cctx.textAlign = "left";
        cctx.fillText("FEDERATED MODEL v3.0 DEPLOYED", 200, badgeY + 65);
        cctx.fillStyle = "#34d399";
        cctx.font = "700 22px 'JetBrains Mono', monospace";
        cctx.fillText(`TARGET NODE ${targetNode.id} RECEIVED & ACTIVATED WEIGHTS`, 200, badgeY + 110);
      } else {
        cctx.fillStyle = "#0a1428";
        cctx.strokeStyle = "#1e3a8a";
        cctx.lineWidth = 2;
        cctx.beginPath();
        cctx.roundRect(40, 140, 944, 95, 12);
        cctx.fill();
        cctx.stroke();

        cctx.fillStyle = "#00f0ff";
        cctx.font = "700 26px 'JetBrains Mono', monospace";
        cctx.textAlign = "left";
        cctx.fillText(`function verifyBiometricTx(bytes32 txHash, address device)`, 65, 195);

        const txLines = [
          {
            tag: "01",
            title: "TRANSACTION INGESTION",
            detail: `DEVICE: ${targetNode.id} (${targetNode.name}) // ${targetNode.address}`,
            active: stepProg >= 1.0,
            color: targetNode.color,
          },
          {
            tag: "02",
            title: "LINE-BY-LINE CONSENSUS & VALIDATION",
            detail: `TIMESTAMP: 2026-09-16T20:44:00Z | BIOMETRIC HASH: VALID`,
            active: stepProg >= 2.0,
            color: "#38bdf8",
          },
          {
            tag: "03",
            title: "VAULT STATE COMMITMENT",
            detail: `TELEMETRY: ${targetNode.bpm} BPM | ${targetNode.spo2}% SpO2 | ${targetNode.temp} | HRV ${targetNode.hrv}ms`,
            active: stepProg >= 3.0,
            color: "#34d399",
          },
        ];

        let lineY = 270;
        txLines.forEach((tl) => {
          cctx.fillStyle = tl.active ? "rgba(15, 23, 42, 0.95)" : "rgba(10, 16, 30, 0.4)";
          cctx.strokeStyle = tl.active ? tl.color : "rgba(255, 255, 255, 0.08)";
          cctx.lineWidth = tl.active ? 2 : 1;
          cctx.beginPath();
          cctx.roundRect(40, lineY, 944, 115, 14);
          cctx.fill();
          cctx.stroke();

          cctx.fillStyle = tl.active ? tl.color : "#475569";
          cctx.beginPath();
          cctx.arc(85, lineY + 57, 24, 0, Math.PI * 2);
          cctx.fill();
          cctx.fillStyle = "#000000";
          cctx.font = "800 22px monospace";
          cctx.textAlign = "center";
          cctx.fillText(tl.tag, 85, lineY + 65);

          cctx.fillStyle = tl.active ? "#ffffff" : "#64748b";
          cctx.font = "700 26px 'JetBrains Mono', monospace";
          cctx.textAlign = "left";
          cctx.fillText(tl.title, 130, lineY + 48);

          cctx.fillStyle = tl.active ? tl.color : "#475569";
          cctx.font = "600 20px 'JetBrains Mono', monospace";
          cctx.fillText(tl.detail, 130, lineY + 86);

          if (tl.active) {
            cctx.fillStyle = "#10b981";
            cctx.font = "700 28px sans-serif";
            cctx.textAlign = "right";
            cctx.fillText("✓", 945, lineY + 65);
          }

          lineY += 135;
        });

        if (stepProg >= 3.8) {
          const verifY = 700;
          cctx.fillStyle = "rgba(16, 185, 129, 0.15)";
          cctx.strokeStyle = "#10b981";
          cctx.lineWidth = 4;
          cctx.beginPath();
          cctx.roundRect(40, verifY, 944, 180, 20);
          cctx.fill();
          cctx.stroke();

          cctx.fillStyle = "#10b981";
          cctx.beginPath();
          cctx.arc(135, verifY + 90, 52, 0, Math.PI * 2);
          cctx.fill();
          cctx.fillStyle = "#000000";
          cctx.font = "900 58px sans-serif";
          cctx.textAlign = "center";
          cctx.fillText("✓", 135, verifY + 110);

          cctx.fillStyle = "#ffffff";
          cctx.font = "800 42px 'JetBrains Mono', monospace";
          cctx.textAlign = "left";
          cctx.fillText("VERIFIED TRANSACTION", 225, verifY + 85);
          cctx.fillStyle = "#34d399";
          cctx.font = "700 24px 'JetBrains Mono', monospace";
          cctx.fillText(`STATUS: 0x1 SUCCESS // COMMITTED TO HEALTH LEDGER`, 225, verifY + 128);
        }
      }

      contractTexture.needsUpdate = true;
    };

    // --- 5. ELEVATED FEDERATED AI NEURAL SERVER TOWER ---
    const serverGroup = new THREE.Group();
    serverGroup.position.set(0, -16, 0);
    scene.add(serverGroup);

    const srvPlatformGeo = new THREE.CylinderGeometry(2.0, 2.3, 0.35, 40);
    const srvPlatformMat = new THREE.MeshStandardMaterial({
      color: 0x090d18,
      metalness: 0.95,
      roughness: 0.2,
    });
    const srvPlatform = new THREE.Mesh(srvPlatformGeo, srvPlatformMat);
    srvPlatform.position.set(0, 0.18, 0);
    serverGroup.add(srvPlatform);

    const srvWidth = 3.8;
    const srvHeight = 2.8;
    const srvDepth = 1.6;
    const srvShape = createRoundedRectShape(srvWidth, srvHeight, 0.2);
    const srvGeo = new THREE.ExtrudeGeometry(srvShape, {
      depth: srvDepth,
      bevelEnabled: true,
      bevelSegments: 6,
      bevelSize: 0.05,
      bevelThickness: 0.05,
    });
    srvGeo.center();

    const srvChassisMat = new THREE.MeshStandardMaterial({
      color: 0x05070d,
      metalness: 0.96,
      roughness: 0.18,
    });
    const srvChassis = new THREE.Mesh(srvGeo, srvChassisMat);
    srvChassis.position.set(0, 1.8, 0);
    serverGroup.add(srvChassis);

    const serverCanvas = document.createElement("canvas");
    serverCanvas.width = 1024;
    serverCanvas.height = 1024;
    const sctx = serverCanvas.getContext("2d")!;
    const serverTexture = new THREE.CanvasTexture(serverCanvas);
    serverTexture.colorSpace = THREE.SRGBColorSpace;
    serverTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const srvScreenGeo = new THREE.PlaneGeometry(srvWidth * 0.92, srvHeight * 0.88);
    const srvScreenMat = new THREE.MeshBasicMaterial({
      map: serverTexture,
      side: THREE.DoubleSide,
    });
    const srvScreen = new THREE.Mesh(srvScreenGeo, srvScreenMat);
    srvScreen.position.set(0, 1.8, srvDepth / 2 + 0.06);
    serverGroup.add(srvScreen);

    // AI Synaptic Tensor Core
    const coreGeo = new THREE.IcosahedronGeometry(0.55, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xc084fc,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const serverCore = new THREE.Mesh(coreGeo, coreMat);
    serverCore.position.set(0, 3.85, 0);
    serverGroup.add(serverCore);

    const haloGeo = new THREE.TorusGeometry(0.85, 0.035, 16, 64);
    const haloMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.rotation.x = Math.PI / 2;
    haloMesh.position.set(0, 3.85, 0);
    serverGroup.add(haloMesh);

    const serverGlow = new THREE.PointLight(0xa855f7, 1.2, 10);
    serverGlow.position.set(0, 3.8, 1.2);
    serverGroup.add(serverGlow);

    const updateServerCanvas = (phaseText: string, activeIdx: number, time: number) => {
      sctx.fillStyle = "#04060c";
      sctx.fillRect(0, 0, 1024, 1024);

      sctx.fillStyle = "#0c1120";
      sctx.fillRect(0, 0, 1024, 110);

      sctx.fillStyle = "#a855f7";
      sctx.beginPath();
      sctx.roundRect(40, 28, 200, 54, 10);
      sctx.fill();
      sctx.fillStyle = "#ffffff";
      sctx.font = "800 22px 'JetBrains Mono', monospace";
      sctx.textAlign = "center";
      sctx.fillText("AI COMPUTE CLUSTER", 140, 63);

      sctx.fillStyle = "#ffffff";
      sctx.font = "800 32px 'JetBrains Mono', monospace";
      sctx.textAlign = "left";
      sctx.fillText("Federated Neural Hub", 265, 66);

      sctx.fillStyle = "#38bdf8";
      sctx.font = "600 20px monospace";
      sctx.textAlign = "right";
      sctx.fillText("GPU H100 x 8 // ACTIVE", 984, 65);

      sctx.fillStyle = "#0b1428";
      sctx.strokeStyle = "#38bdf8";
      sctx.lineWidth = 2;
      sctx.beginPath();
      sctx.roundRect(40, 140, 944, 90, 14);
      sctx.fill();
      sctx.stroke();

      sctx.fillStyle = "#94a3b8";
      sctx.font = "700 18px monospace";
      sctx.textAlign = "left";
      sctx.fillText("FEDERATED LEARNING PIPELINE STATE:", 65, 172);

      sctx.fillStyle = "#00f0ff";
      sctx.font = "800 28px 'JetBrains Mono', monospace";
      sctx.fillText(phaseText, 65, 210);

      const metrics = [
        { label: "GLOBAL MODEL ACCURACY", val: "99.64%", color: "#34d399" },
        { label: "FEDERATED LOSS (FedAvg)", val: "0.0092 ΔW", color: "#c084fc" },
      ];

      metrics.forEach((m, idx) => {
        const mx = 40 + idx * 480;
        sctx.fillStyle = "#090f1d";
        sctx.beginPath();
        sctx.roundRect(mx, 255, 464, 110, 14);
        sctx.fill();

        sctx.fillStyle = "#64748b";
        sctx.font = "700 18px monospace";
        sctx.textAlign = "left";
        sctx.fillText(m.label, mx + 25, 290);

        sctx.fillStyle = m.color;
        sctx.font = "800 38px 'JetBrains Mono', monospace";
        sctx.fillText(m.val, mx + 25, 340);
      });

      sctx.fillStyle = "#080e1c";
      sctx.beginPath();
      sctx.roundRect(40, 395, 944, 280, 16);
      sctx.fill();

      sctx.fillStyle = "#cbd5e1";
      sctx.font = "600 22px 'JetBrains Mono', monospace";
      sctx.textAlign = "left";

      const epochNum = (Math.floor(time) % 50) + 1;
      sctx.fillText(`[EPOCH ${epochNum}] AGGREGATING GRADIENTS: W1, W2, W3, W4, W5 (ZERO-KNOWLEDGE VER)`, 65, 445);
      sctx.fillText(`[NEURAL WEIGHTS] COMPUTED TENSOR SHIFT: ΔW = Σ(n_k / N) * W_k`, 65, 495);
      sctx.fillText(`[OPTIMIZATION] BACKPROPAGATION CONVERGED // LR: 0.001 // ADAMW`, 65, 545);
      sctx.fillText(`[COMPILED RELEASE] HealthModel_v3.0.onnx (HASH: 0x4f8a...3b15)`, 65, 595);
      sctx.fillText(`[DISPATCH STATUS] SMART CONTRACT ENCLAVE: DEPLOYING ONE-BY-ONE TO WATCH`, 65, 645);

      sctx.fillStyle = "#94a3b8";
      sctx.font = "700 20px monospace";
      sctx.fillText("SEQUENTIAL WATCH MODEL DEPLOYMENT (v3.0 DOWNLOAD):", 40, 725);

      const nodeSpacing = 185;
      NODES.forEach((n, idx) => {
        const nx = 40 + idx * nodeSpacing;
        const isDone = deployedMapRef.current[idx];
        const isTarget = idx === activeIdx;

        sctx.fillStyle = isDone ? "rgba(16, 185, 129, 0.2)" : isTarget ? "rgba(56, 189, 248, 0.2)" : "rgba(15, 23, 42, 0.6)";
        sctx.strokeStyle = isDone ? "#10b981" : isTarget ? "#38bdf8" : "#334155";
        sctx.lineWidth = isTarget ? 3 : 1.5;
        sctx.beginPath();
        sctx.roundRect(nx, 755, 170, 95, 12);
        sctx.fill();
        sctx.stroke();

        sctx.fillStyle = isDone ? "#10b981" : isTarget ? "#ffffff" : "#94a3b8";
        sctx.font = "800 26px 'JetBrains Mono', monospace";
        sctx.textAlign = "center";
        sctx.fillText(n.id, nx + 85, 795);

        sctx.font = "700 15px monospace";
        sctx.fillText(isDone ? "v3.0 INSTALLED" : isTarget ? "DEPLOYING..." : "PENDING", nx + 85, 830);
      });

      serverTexture.needsUpdate = true;
    };

    // --- 6. BEAMS & DATA PACKETS ---
    const uplinkBeamGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 2.8, 0),
      new THREE.Vector3(0, 6.4, -0.8),
    ]);
    const uplinkBeamMat = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      linewidth: 3,
      transparent: true,
      opacity: 0.85,
    });
    const uplinkBeam = new THREE.Line(uplinkBeamGeo, uplinkBeamMat);
    uplinkBeam.visible = false;
    scene.add(uplinkBeam);

    const upPacketGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const upPacketMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const upPacket = new THREE.Mesh(upPacketGeo, upPacketMat);
    upPacket.visible = false;
    scene.add(upPacket);

    const downBeamGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 1.2, 0),
      new THREE.Vector3(0, 0, 0),
    ]);
    const downBeamMat = new THREE.LineBasicMaterial({
      color: 0xc084fc,
      linewidth: 3,
      transparent: true,
      opacity: 0.85,
    });
    const downlinkBeam = new THREE.Line(downBeamGeo, downBeamMat);
    downlinkBeam.visible = false;
    scene.add(downlinkBeam);

    const downPacketGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const downPacketMat = new THREE.MeshBasicMaterial({ color: 0xc084fc });
    const downPacket = new THREE.Mesh(downPacketGeo, downPacketMat);
    downPacket.visible = false;
    scene.add(downPacket);

    // --- 7. SMARTWATCH & COMPANION FLOATING LOG FACTORY ---
    interface WatchNodeInstance {
      watchGroup: THREE.Group;
      terminalGroup: THREE.Group;
      updateDisplays: (time: number) => void;
      ringPos: THREE.Vector3;
      ringRot: THREE.Euler;
      termPos: THREE.Vector3;
      termRot: THREE.Euler;
      nodeData: NodeData;
    }

    const nodesList: WatchNodeInstance[] = [];
    const ringGroup = new THREE.Group();
    scene.add(ringGroup);

    const deployedMapRef = { current: [false, false, false, false, false] };
    const verifiedMapRef = { current: [false, false, false, false, false] };

    const createSmartwatchAndTerminal = (node: NodeData, index: number): WatchNodeInstance => {
      // 1. Smartwatch
      const watchGroup = new THREE.Group();

      const dcanvas = document.createElement("canvas");
      dcanvas.width = 1024;
      dcanvas.height = 1280;
      const ctx = dcanvas.getContext("2d")!;
      const dtexture = new THREE.CanvasTexture(dcanvas);
      dtexture.colorSpace = THREE.SRGBColorSpace;
      dtexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

      const ecgPoints: number[] = [];
      const maxPts = 120;
      for (let i = 0; i < maxPts; i++) ecgPoints.push(0.5);
      let localTick = 0;

      const updateWatchDisplay = (time: number) => {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, 1024, 1280);

        const bgGrad = ctx.createRadialGradient(512, 640, 260, 512, 640, 680);
        bgGrad.addColorStop(0, "rgba(6, 12, 24, 0.98)");
        bgGrad.addColorStop(1, "#020408");
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 1024, 1280);

        // 1. Top Header Bar
        ctx.fillStyle = "rgba(180, 195, 220, 0.9)";
        ctx.font = "800 32px -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif";
        ctx.textAlign = "left";
        ctx.fillText(`${node.id} // ${node.name}`, 60, 85);

        const isModelDeployed = deployedMapRef.current[index];
        const isVerified = verifiedMapRef.current[index];

        ctx.fillStyle = isModelDeployed ? "rgba(168, 85, 247, 0.3)" : isVerified ? "rgba(16, 185, 129, 0.28)" : `${node.color}28`;
        ctx.beginPath();
        ctx.roundRect(620, 48, 344, 54, 27);
        ctx.fill();

        ctx.fillStyle = isModelDeployed ? "#c084fc" : isVerified ? "#10b981" : node.color;
        ctx.beginPath();
        ctx.arc(648, 75, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = "800 20px -apple-system, BlinkMacSystemFont, sans-serif";
        ctx.textAlign = "left";
        ctx.fillText(
          isModelDeployed ? "AI MODEL v3.0 ✓" : isVerified ? "TX VERIFIED ✓" : "ENCLAVE ACTIVE",
          668,
          82
        );

        ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(60, 128);
        ctx.lineTo(964, 128);
        ctx.stroke();

        // 2. Big Heart Rate & Live Clock
        const rateFactor = node.bpm / 60;
        const pulseCycle = (time * rateFactor) % 1;
        const pulseScale = 1 + Math.sin(pulseCycle * Math.PI) * 0.18;

        ctx.save();
        ctx.translate(115, 225);
        ctx.scale(pulseScale, pulseScale);
        ctx.fillStyle = "#ff2d55";
        ctx.shadowColor = "#ff2d55";
        ctx.shadowBlur = 24;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-28, -28, -56, 12, 0, 50);
        ctx.bezierCurveTo(56, 12, 28, -28, 0, 0);
        ctx.fill();
        ctx.restore();

        ctx.shadowBlur = 0;
        ctx.fillStyle = "#ffffff";
        ctx.font = "800 134px -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";
        ctx.textAlign = "left";
        ctx.fillText(node.bpm.toString(), 195, 260);

        ctx.fillStyle = "rgba(255, 45, 85, 0.95)";
        ctx.font = "800 36px -apple-system, BlinkMacSystemFont, sans-serif";
        ctx.fillText("BPM", 460, 252);

        const hours = (14 + Math.floor(time / 3600)) % 24;
        const mins = (32 + Math.floor(time / 60)) % 60;
        const secs = Math.floor(time % 60);
        ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
        ctx.font = "700 34px 'JetBrains Mono', monospace";
        ctx.textAlign = "right";
        ctx.fillText(
          `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`,
          964,
          252
        );

        // 3. Live Streaming ECG Waveform Section
        localTick++;
        if (localTick % 2 === 0) {
          ecgPoints.shift();
          const cyclePos = (time * 2.8) % 1;
          let yVal = 0.5;
          if (cyclePos > 0.18 && cyclePos < 0.22) yVal = 0.55;
          else if (cyclePos >= 0.22 && cyclePos < 0.26) yVal = 0.42;
          else if (cyclePos >= 0.26 && cyclePos < 0.32) yVal = 0.92;
          else if (cyclePos >= 0.32 && cyclePos < 0.38) yVal = 0.22;
          else if (cyclePos >= 0.38 && cyclePos < 0.44) yVal = 0.62;
          else if (cyclePos >= 0.55 && cyclePos < 0.72) {
            yVal = 0.5 + Math.sin(((cyclePos - 0.55) / 0.17) * Math.PI) * 0.14;
          }
          yVal += (Math.random() - 0.5) * 0.03;
          ecgPoints.push(yVal);
        }

        const graphX = 60;
        const graphY = 320;
        const graphW = 904;
        const graphH = 360;

        ctx.fillStyle = "rgba(10, 20, 38, 0.6)";
        ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(graphX, graphY, graphW, graphH, 20);
        ctx.fill();
        ctx.stroke();

        ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
        ctx.lineWidth = 1;
        for (let gy = graphY + 60; gy < graphY + graphH; gy += 60) {
          ctx.beginPath();
          ctx.moveTo(graphX, gy);
          ctx.lineTo(graphX + graphW, gy);
          ctx.stroke();
        }

        ctx.shadowColor = node.color;
        ctx.shadowBlur = 20;
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 5;
        ctx.beginPath();
        const stepX = graphW / (maxPts - 1);
        for (let i = 0; i < ecgPoints.length; i++) {
          const px = graphX + i * stepX;
          const py = graphY + graphH - ecgPoints[i] * graphH;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;

        // 4. Tri-Metric Physiological Cards (Full Width 3 Columns)
        const metricsList = [
          { label: "SpO2", val: `${node.spo2}%`, sub: "PERFUSION", color: "#34d399" },
          { label: "TEMP", val: node.temp, sub: "HOMEOSTASIS", color: "#fbbf24" },
          { label: "HRV", val: `${node.hrv}ms`, sub: "AUTONOMIC", color: "#a78bfa" },
        ];

        const cardW = 280;
        const cardH = 260;
        const startCardX = 60;
        const gap = 32;
        const cardY = 720;

        metricsList.forEach((m, idx) => {
          const cx = startCardX + idx * (cardW + gap);
          ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
          ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.roundRect(cx, cardY, cardW, cardH, 20);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = "rgba(160, 175, 205, 0.85)";
          ctx.font = "700 24px -apple-system, BlinkMacSystemFont, sans-serif";
          ctx.textAlign = "left";
          ctx.fillText(m.label, cx + 24, cardY + 54);

          ctx.fillStyle = m.color;
          ctx.font = "800 60px -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";
          ctx.fillText(m.val, cx + 24, cardY + 145);

          ctx.fillStyle = "rgba(148, 163, 184, 0.7)";
          ctx.font = "700 18px monospace";
          ctx.fillText(m.sub, cx + 24, cardY + 215);
        });

        // 5. Bottom Hardware Enclave Cryptographic Footer
        const footX = 60;
        const footY = 1025;
        const footW = 904;
        const footH = 195;

        ctx.fillStyle = "rgba(8, 15, 30, 0.75)";
        ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(footX, footY, footW, footH, 20);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#34d399";
        ctx.beginPath();
        ctx.arc(footX + 35, footY + 45, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#ffffff";
        ctx.font = "800 24px 'JetBrains Mono', monospace";
        ctx.textAlign = "left";
        ctx.fillText("HARDWARE ENCLAVE SECURE // APPLE S9 SIP", footX + 60, footY + 52);

        ctx.fillStyle = "#94a3b8";
        ctx.font = "600 20px 'JetBrains Mono', monospace";
        ctx.fillText("ZERO-KNOWLEDGE PROOF READY // 256-BIT ENCRYPTED TELEMETRY", footX + 35, footY + 105);

        ctx.fillStyle = node.color;
        ctx.font = "700 22px 'JetBrains Mono', monospace";
        ctx.fillText(`DEVICE WALLET: ${node.address} [SECP256K1]`, footX + 35, footY + 155);

        dtexture.needsUpdate = true;
      };

      updateWatchDisplay(0);

      const caseMesh = new THREE.Mesh(caseGeo, titaniumMat);
      caseMesh.castShadow = true;
      caseMesh.receiveShadow = true;
      watchGroup.add(caseMesh);

      const bezelMesh = new THREE.Mesh(bezelGeo, bezelMat);
      bezelMesh.position.set(0, 0, caseDepth / 2 + 0.125);
      watchGroup.add(bezelMesh);

      const displayMat = new THREE.MeshBasicMaterial({ map: dtexture });
      const displayMesh = new THREE.Mesh(glassGeo, displayMat);
      displayMesh.position.set(0, 0, caseDepth / 2 + 0.128);
      watchGroup.add(displayMesh);

      const crownGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.26, 32);
      const crownMesh = new THREE.Mesh(crownGeo, titaniumMat);
      crownMesh.rotation.z = Math.PI / 2;
      crownMesh.position.set(caseWidth / 2 + 0.18, 0.45, 0);
      watchGroup.add(crownMesh);

      const btnGeo = new THREE.BoxGeometry(0.12, 0.65, 0.16);
      const btnMesh = new THREE.Mesh(btnGeo, titaniumMat);
      btnMesh.position.set(caseWidth / 2 + 0.14, -0.45, 0);
      watchGroup.add(btnMesh);

      const strapMesh = new THREE.Mesh(closedStrapGeo, strapMat);
      strapMesh.castShadow = true;
      strapMesh.receiveShadow = true;
      watchGroup.add(strapMesh);

      const claspMesh = new THREE.Mesh(claspGeo, titaniumMat);
      claspMesh.position.set(0, 0, -1.16);
      claspMesh.castShadow = true;
      claspMesh.receiveShadow = true;
      watchGroup.add(claspMesh);

      const localGlow = new THREE.PointLight(node.color, 0.35, 2.2);
      localGlow.position.set(0, 0, 0.6);
      watchGroup.add(localGlow);

      // 2. Floating Companion Vertical Terminal Log Screen (Scene 3)
      const terminalGroup = new THREE.Group();
      terminalGroup.position.set(0, -10, 0);

      const termCanvas = document.createElement("canvas");
      termCanvas.width = 1024;
      termCanvas.height = 1440;
      const tctx = termCanvas.getContext("2d")!;
      const termTexture = new THREE.CanvasTexture(termCanvas);
      termTexture.colorSpace = THREE.SRGBColorSpace;
      termTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

      const updateTerminalDisplay = (time: number) => {
        tctx.fillStyle = "#070b16";
        tctx.fillRect(0, 0, 1024, 1440);

        // Header bar
        tctx.fillStyle = "#0f172a";
        tctx.fillRect(0, 0, 1024, 110);

        const dotColors = ["#ff5f56", "#ffbd2e", "#27c93f"];
        dotColors.forEach((col, dIdx) => {
          tctx.fillStyle = col;
          tctx.beginPath();
          tctx.arc(50 + dIdx * 38, 55, 13, 0, Math.PI * 2);
          tctx.fill();
        });

        tctx.fillStyle = "#ffffff";
        tctx.font = "700 32px 'JetBrains Mono', monospace";
        tctx.textAlign = "left";
        tctx.fillText(`${node.id.toLowerCase()}_biometric.log`, 185, 66);

        tctx.fillStyle = `${node.color}33`;
        tctx.beginPath();
        tctx.roundRect(750, 26, 230, 58, 12);
        tctx.fill();
        tctx.fillStyle = node.color;
        tctx.font = "800 28px monospace";
        tctx.textAlign = "center";
        tctx.fillText("WEEK 37", 865, 66);

        const baseSec = Math.floor(time);
        const ms = Math.floor((time % 1) * 1000);
        const pad = (n: number, z = 2) => n.toString().padStart(z, "0");

        const logLines = [
          {
            tag: "TIMESTAMP",
            text: `2026-09-16T20:44:${pad(baseSec % 60)}.${ms.toString().padStart(3, "0")}Z`,
            color: "#94a3b8",
          },
          {
            tag: "DEVICE_ID",
            text: `ID: ${node.id} // HW_ENC: APPLE_S9_SIP`,
            color: node.color,
          },
          {
            tag: "HEART_RATE",
            text: `RATE: ${node.bpm} BPM // SINUS_RHYTHM_OK`,
            color: "#ff2d55",
          },
          {
            tag: "SPO2_LEVEL",
            text: `O2 SAT: ${node.spo2}% // PERFUSION_STABLE`,
            color: "#34d399",
          },
          {
            tag: "SKIN_TEMP",
            text: `TEMP: ${node.temp} // HOMEOSTASIS_NOMINAL`,
            color: "#fbbf24",
          },
          {
            tag: "HRV_METRIC",
            text: `RMSSD: ${node.hrv}ms // SYMPATHETIC_BALANCED`,
            color: "#a78bfa",
          },
          {
            tag: "LOCAL_HASH",
            text: `BLAKE3: 0x${node.id}8f...4e19 [VERIFIED]`,
            color: "#38bdf8",
          },
          {
            tag: "VAULT_SYNC",
            text: `STATUS: READY FOR SMART CONTRACT TX`,
            color: "#10b981",
          },
        ];

        let startY = 200;
        const lineSpacing = 145;

        logLines.forEach((l, lIdx) => {
          tctx.fillStyle = "rgba(15, 23, 42, 0.75)";
          tctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
          tctx.lineWidth = 1.5;
          tctx.beginPath();
          tctx.roundRect(40, startY - 45, 944, 120, 14);
          tctx.fill();
          tctx.stroke();

          tctx.fillStyle = `${l.color}22`;
          tctx.beginPath();
          tctx.roundRect(65, startY - 26, 210, 48, 10);
          tctx.fill();

          tctx.fillStyle = l.color;
          tctx.font = "800 22px 'JetBrains Mono', monospace";
          tctx.textAlign = "center";
          tctx.fillText(l.tag, 170, startY + 6);

          tctx.fillStyle = "#ffffff";
          tctx.font = "600 24px 'JetBrains Mono', monospace";
          tctx.textAlign = "left";
          tctx.fillText(l.text, 305, startY + 8);

          tctx.fillStyle = "#475569";
          tctx.font = "700 20px monospace";
          tctx.textAlign = "right";
          tctx.fillText(`0${lIdx + 1}`, 950, startY + 8);

          startY += lineSpacing;
        });

        termTexture.needsUpdate = true;
      };

      updateTerminalDisplay(0);

      const termChassis = new THREE.Mesh(termGeo, termChassisMat);
      termChassis.castShadow = true;
      termChassis.receiveShadow = true;
      terminalGroup.add(termChassis);

      const termScreenGeo = new THREE.PlaneGeometry(termWidth * 0.94, termHeight * 0.94);
      const termScreenMat = new THREE.MeshBasicMaterial({
        map: termTexture,
        side: THREE.DoubleSide,
      });
      const termScreen = new THREE.Mesh(termScreenGeo, termScreenMat);
      termScreen.position.set(0, 0, termDepth / 2 + 0.02);
      terminalGroup.add(termScreen);

      const updateDisplays = (time: number) => {
        updateWatchDisplay(time);
        updateTerminalDisplay(time);
      };

      return {
        watchGroup,
        terminalGroup,
        updateDisplays,
        ringPos: new THREE.Vector3(),
        ringRot: new THREE.Euler(),
        termPos: new THREE.Vector3(),
        termRot: new THREE.Euler(),
        nodeData: node,
      };
    };

    // Calculate Ring & Terminal Positions for the 5 Nodes
    const ringRadius = 5.2; // Perfectly sized so no watches are cut off
    const termRadius = 7.6; // Hovering vertical logs in Scene 3

    for (let i = 0; i < NODES.length; i++) {
      const nodeInst = createSmartwatchAndTerminal(NODES[i], i);
      const theta = (i / NODES.length) * Math.PI * 2 - Math.PI / 2;

      const wx = Math.cos(theta) * ringRadius;
      const wz = Math.sin(theta) * ringRadius;
      nodeInst.ringPos.set(wx, 0, wz);
      nodeInst.ringRot.set(-Math.PI / 2, 0, -theta - Math.PI / 2);

      nodeInst.watchGroup.position.copy(nodeInst.ringPos);
      nodeInst.watchGroup.rotation.copy(nodeInst.ringRot);
      ringGroup.add(nodeInst.watchGroup);

      // Terminal position: elevated and tilted towards the camera
      const tx = Math.cos(theta) * termRadius;
      const tz = Math.sin(theta) * termRadius;
      nodeInst.termPos.set(tx, 1.4, tz);
      // Tilted back slightly and facing center-camera
      nodeInst.termRot.set(-0.45, -theta - Math.PI / 2, 0);

      nodeInst.terminalGroup.position.copy(nodeInst.termPos);
      nodeInst.terminalGroup.rotation.copy(nodeInst.termRot);
      ringGroup.add(nodeInst.terminalGroup);

      nodesList.push(nodeInst);
    }

    // --- 8. LIGHTING & ENVIRONMENT ---
    const groundGeo = new THREE.PlaneGeometry(70, 70);
    const groundMat = new THREE.ShadowMaterial({
      opacity: 0.35,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.3;
    ground.receiveShadow = true;
    scene.add(ground);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight1.position.set(10, 20, 12);
    dirLight1.castShadow = true;
    dirLight1.shadow.mapSize.width = 2048;
    dirLight1.shadow.mapSize.height = 2048;
    dirLight1.shadow.bias = -0.0001;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 1.4);
    dirLight2.position.set(-12, 14, -8);
    scene.add(dirLight2);

    const bottomGlow = new THREE.DirectionalLight(0xa855f7, 0.8);
    bottomGlow.position.set(0, -6, 4);
    scene.add(bottomGlow);

    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.8);
    scene.add(ambientLight);

    // --- 9. SCROLL & INTERACTIVE ORBIT CONTROLS ---
    let targetProgress = 0.0;
    let smoothProgress = 0.0;
    let dragRotX = 0;
    let dragRotY = 0;
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    // Gentle scroll increment so animation never jumps or cuts off abruptly
    let lastInteractTime = 0;

    const onWheel = (e: WheelEvent) => {
      if (scrollProgressRef.current !== undefined) return;
      e.preventDefault();
      lastInteractTime = Date.now();
      targetProgress = THREE.MathUtils.clamp(targetProgress + e.deltaY * 0.00022, 0.0, 1.0);
    };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      lastInteractTime = Date.now();
      startX = e.clientX;
      startY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      lastInteractTime = Date.now();
      const dx = (e.clientX - startX) * 0.004;
      const dy = (e.clientY - startY) * 0.004;
      startX = e.clientX;
      startY = e.clientY;
      dragRotY += dx;
      dragRotX = THREE.MathUtils.clamp(dragRotX + dy, -0.4, 0.4);
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    let touchStartY = 0;
    let touchStartX = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        lastInteractTime = Date.now();
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (scrollProgressRef.current !== undefined) return;
      if (e.touches.length === 1) {
        lastInteractTime = Date.now();
        const dy = e.touches[0].clientY - touchStartY;
        const dx = e.touches[0].clientX - touchStartX;
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;

        targetProgress = THREE.MathUtils.clamp(targetProgress - dy * 0.0007, 0.0, 1.0);
        dragRotY += dx * 0.004;
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      lastInteractTime = Date.now();
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        targetProgress = THREE.MathUtils.clamp(targetProgress + 0.05, 0, 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        targetProgress = THREE.MathUtils.clamp(targetProgress - 0.05, 0, 1);
      }
    };

    const domElem = renderer.domElement;
    domElem.addEventListener("wheel", onWheel, { passive: false });
    domElem.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    domElem.addEventListener("touchstart", onTouchStart, { passive: true });
    domElem.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    // --- 10. CONNECTED CHOREOGRAPHY ANIMATION LOOP ---
    const clock = new THREE.Clock();
    let animFrameId: number;

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Progress drive: external scroll progress or gentle auto-advance when user is idle
      if (scrollProgressRef.current !== undefined) {
        targetProgress = THREE.MathUtils.clamp(scrollProgressRef.current, 0.0, 1.0);
      } else if (Date.now() - lastInteractTime > 2500 && !isDragging) {
        targetProgress = (targetProgress + 0.00035) % 1.0;
      }

      // Silky smooth interpolation
      smoothProgress = THREE.MathUtils.lerp(smoothProgress, targetProgress, 0.07);
      const p = smoothProgress;

      // Update watch faces and terminal displays
      for (let i = 0; i < nodesList.length; i++) {
        nodesList[i].updateDisplays(elapsedTime);
      }

      // Rotate Server Core & Halo
      serverCore.rotation.x = elapsedTime * 0.4;
      serverCore.rotation.y = elapsedTime * 0.6;
      haloMesh.rotation.z = -elapsedTime * 0.3;

      // --- EXPANSIVE CAMERA POSITIONING & FRAMING ---
      let baseCamPos = new THREE.Vector3();
      let baseCamTarget = new THREE.Vector3();

      if (p < 0.18) {
        // Stage 1: Hero close-up watch (compact, centered)
        const k = p / 0.18;
        baseCamPos.lerpVectors(new THREE.Vector3(2.1, 2.9, 8.2), new THREE.Vector3(0, 21.0, 4.5), k);
        baseCamTarget.lerpVectors(new THREE.Vector3(0, 2.3, 0), new THREE.Vector3(0, 0, 0), k);
      } else if (p < 0.36) {
        // Stage 2: 5 Watches Circular Ring Model (compact centered overview)
        const k = (p - 0.18) / 0.18;
        baseCamPos.lerpVectors(new THREE.Vector3(0, 21.0, 4.5), new THREE.Vector3(0, 22.5, 6.0), k);
        baseCamTarget.lerpVectors(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0.3, 0), k);
      } else if (p < 0.54) {
        // Stage 3: Straight Vertical Floating Terminal Logs (compact front view)
        const k = (p - 0.36) / 0.18;
        baseCamPos.lerpVectors(new THREE.Vector3(0, 22.5, 6.0), new THREE.Vector3(0, 3.8, 12.5), k);
        baseCamTarget.lerpVectors(new THREE.Vector3(0, 0.3, 0), new THREE.Vector3(0, 2.3, 0.9), k);
      } else if (p < 0.76) {
        // Stage 4: Pure Clean Front View of Central Smart Contract Verification (compact front view)
        const k = (p - 0.54) / 0.22;
        baseCamPos.lerpVectors(new THREE.Vector3(0, 2.4, 11.2), new THREE.Vector3(0, 2.4, 11.8), k);
        baseCamTarget.lerpVectors(new THREE.Vector3(0, 2.3, 0.9), new THREE.Vector3(0, 2.3, 0.9), k);
      } else {
        // Stage 5: Pure Clean Front View of Elevated AI Server + Smart Contract (compact front view)
        const k = Math.min(1.0, (p - 0.76) / 0.24);
        baseCamPos.lerpVectors(new THREE.Vector3(0, 2.4, 11.8), new THREE.Vector3(0, 4.2, 16.5), k);
        baseCamTarget.lerpVectors(new THREE.Vector3(0, 2.3, 0.9), new THREE.Vector3(0, 3.8, 0.0), k);
      }

      // Apply subtle interactive rotation parallax
      const camX = baseCamPos.x + dragRotY * 3.5;
      const camY = Math.max(1.5, baseCamPos.y + dragRotX * 3.5);
      const camZ = baseCamPos.z;
      camera.position.lerp(new THREE.Vector3(camX, camY, camZ), 0.1);
      camera.lookAt(baseCamTarget);

      // --- STAGE 1 & 2: WATCH EXPANSION (HERO -> CIRCULAR RING) ---
      if (p < 0.18) {
        const k = p / 0.18;
        // Hero watch floats above ground, centered, then smoothly glides down into ring position
        const heroPos = new THREE.Vector3(0, 2.3, 0);
        const heroRot = new THREE.Euler(0.12, -0.22, 0.0);
        nodesList[0].watchGroup.position.lerpVectors(heroPos, nodesList[0].ringPos, k);
        nodesList[0].watchGroup.rotation.x = THREE.MathUtils.lerp(heroRot.x, nodesList[0].ringRot.x, k);
        nodesList[0].watchGroup.rotation.y = THREE.MathUtils.lerp(heroRot.y, nodesList[0].ringRot.y, k);
        nodesList[0].watchGroup.rotation.z = THREE.MathUtils.lerp(heroRot.z, nodesList[0].ringRot.z, k);
        nodesList[0].watchGroup.visible = true;

        // Other watches emerge smoothly
        for (let i = 1; i < nodesList.length; i++) {
          const spawnProg = Math.max(0, Math.min(1, (k - 0.1) / 0.9));
          const spawnPos = new THREE.Vector3(0, -3, 0);
          nodesList[i].watchGroup.position.lerpVectors(spawnPos, nodesList[i].ringPos, spawnProg);
          nodesList[i].watchGroup.rotation.copy(nodesList[i].ringRot);
          nodesList[i].watchGroup.scale.setScalar(spawnProg);
          nodesList[i].watchGroup.visible = spawnProg > 0.01;
        }
      } else {
        // Fully deployed circular ring
        for (let i = 0; i < nodesList.length; i++) {
          nodesList[i].watchGroup.position.copy(nodesList[i].ringPos);
          nodesList[i].watchGroup.rotation.copy(nodesList[i].ringRot);
          nodesList[i].watchGroup.scale.setScalar(1.0);
          nodesList[i].watchGroup.visible = true;
        }
      }

      // --- STAGE 3: FLOATING VERTICAL TERMINAL LOGS (SCENE 3) ---
      if (p < 0.32) {
        // Hidden before Scene 3
        for (let i = 0; i < nodesList.length; i++) {
          nodesList[i].terminalGroup.position.set(0, -10, 0);
          nodesList[i].terminalGroup.visible = false;
        }
      } else if (p < 0.54) {
        // Scene 3: Floating straight vertical terminal logs rise and face camera clearly
        const riseProg = Math.min(1.0, (p - 0.32) / 0.08);
        for (let i = 0; i < nodesList.length; i++) {
          const n = nodesList[i];
          n.terminalGroup.visible = true;
          const startPos = new THREE.Vector3(n.termPos.x, -5, n.termPos.z);
          n.terminalGroup.position.lerpVectors(startPos, n.termPos, riseProg);
          n.terminalGroup.rotation.copy(n.termRot);
          n.terminalGroup.scale.setScalar(riseProg);
        }
      } else {
        // Smoothly descend as Smart Contract emerges
        const sinkProg = Math.min(1.0, (p - 0.54) / 0.06);
        for (let i = 0; i < nodesList.length; i++) {
          const n = nodesList[i];
          const endPos = new THREE.Vector3(n.termPos.x, -6, n.termPos.z);
          n.terminalGroup.position.lerpVectors(n.termPos, endPos, sinkProg);
          n.terminalGroup.scale.setScalar(1.0 - sinkProg);
          if (sinkProg >= 0.99) n.terminalGroup.visible = false;
        }
      }

      // --- STAGE 4: SMART CONTRACT ELEVATION & SEQUENTIAL VERIFICATION ---
      if (p < 0.50) {
        contractGroup.position.set(0, -12, 0.9);
        contractGroup.visible = false;
        downlinkBeam.visible = false;
        downPacket.visible = false;
      } else {
        contractGroup.visible = true;
        const riseProg = Math.min(1.0, (p - 0.50) / 0.06);
        contractGroup.position.set(0, THREE.MathUtils.lerp(-12, 0, riseProg), 0.9);

        // Sequential Verification (0.56 -> 0.76)
        if (p >= 0.56 && p < 0.76) {
          const tVerif = (p - 0.56) / 0.20;
          const currentIdx = Math.min(NODES.length - 1, Math.floor(tVerif * NODES.length));
          const subProgress = (tVerif * NODES.length) % 1.0;
          const step = Math.min(4.0, subProgress * 4.5);

          // Update verified flags
          for (let i = 0; i < NODES.length; i++) {
            if (i < currentIdx) verifiedMapRef.current[i] = true;
            else if (i === currentIdx) verifiedMapRef.current[i] = step >= 3.8;
            else verifiedMapRef.current[i] = false;
          }

          updateContractCanvas(currentIdx, step, elapsedTime, false);

          const curWatch = nodesList[currentIdx];
          if (curWatch && curWatch.watchGroup) {
            const watchPos = curWatch.watchGroup.position.clone().add(new THREE.Vector3(0, 0.2, 0));
            const contractPoint = contractGroup.position.clone().add(new THREE.Vector3(0, 0.6, 0));

            downBeamGeo.setFromPoints([watchPos, contractPoint]);
            downlinkBeam.visible = true;
            (downlinkBeam.material as THREE.LineBasicMaterial).color.set(curWatch.nodeData.color);

            const packetProg = (subProgress * 2.5 + elapsedTime * 1.5) % 1.0;
            downPacket.position.lerpVectors(watchPos, contractPoint, packetProg);
            (downPacket.material as THREE.MeshBasicMaterial).color.set(curWatch.nodeData.color);
            downPacket.visible = step < 3.8;
          }
        }
      }

      // --- STAGE 5: AI NEURAL SERVER ELEVATION & SEQUENTIAL MODEL DOWNLINK ---
      if (p < 0.76) {
        serverGroup.position.set(0, -16, -1.2);
        serverGroup.visible = false;
        uplinkBeam.visible = false;
        upPacket.visible = false;
      } else {
        serverGroup.visible = true;
        const srvRise = Math.min(1.0, (p - 0.76) / 0.06);
        serverGroup.position.set(0, THREE.MathUtils.lerp(-16, 4.4, srvRise), -1.2);

        const tAi = (p - 0.82) / 0.18;

        if (tAi < 0.22) {
          // Phase 1: Uplink to AI Server
          uplinkBeam.visible = true;
          (uplinkBeam.material as THREE.LineBasicMaterial).color.set(0x00f0ff);
          const upProg = (elapsedTime * 2.0) % 1.0;
          upPacket.position.lerpVectors(new THREE.Vector3(0, 2.8, 0), new THREE.Vector3(0, 6.4, -0.8), upProg);
          upPacket.visible = true;

          downlinkBeam.visible = false;
          downPacket.visible = false;
          updateServerCanvas("1/4 UPLINK: AGGREGATING GRADIENTS (FedAvg)", -1, elapsedTime);
          updateContractCanvas(0, 4.0, elapsedTime, true);
        } else if (tAi < 0.44) {
          // Phase 2: Neural Training & Global Weight Optimization
          uplinkBeam.visible = false;
          upPacket.visible = false;
          downlinkBeam.visible = false;
          downPacket.visible = false;

          serverCore.scale.setScalar(1.0 + Math.sin(elapsedTime * 8) * 0.18);
          updateServerCanvas("2/4 TRAINING: OPTIMIZING GLOBAL WEIGHTS (ΔW)", -1, elapsedTime);
          updateContractCanvas(0, 4.0, elapsedTime, true);
        } else if (tAi < 0.58) {
          // Phase 3: Smart Contract Model Release Authorization
          uplinkBeam.visible = true;
          (uplinkBeam.material as THREE.LineBasicMaterial).color.set(0xa855f7);
          const authProg = (elapsedTime * 2.2) % 1.0;
          upPacket.position.lerpVectors(new THREE.Vector3(0, 6.4, -0.8), new THREE.Vector3(0, 2.8, 0), authProg);
          upPacket.visible = true;

          downlinkBeam.visible = false;
          downPacket.visible = false;
          updateServerCanvas("3/4 SMART CONTRACT AUTHORIZING RELEASE v3.0", -1, elapsedTime);
          updateContractCanvas(0, 4.0, elapsedTime, true);
        } else {
          // Phase 4: Downlink to Smartwatches strictly ONE AFTER THE OTHER
          const deployProg = Math.min(1.0, (tAi - 0.58) / 0.42);
          const currentDeployIdx = Math.min(NODES.length - 1, Math.floor(deployProg * NODES.length));
          const subProgress = (deployProg * NODES.length) % 1.0;

          // Update Deployed Map
          for (let i = 0; i < NODES.length; i++) {
            if (i < currentDeployIdx) deployedMapRef.current[i] = true;
            else if (i === currentDeployIdx) deployedMapRef.current[i] = subProgress > 0.65;
            else deployedMapRef.current[i] = false;
          }

          // Beam from Contract (0, 1.2, 0) to targeted watch
          const targetWatch = nodesList[currentDeployIdx];
          if (targetWatch && targetWatch.watchGroup) {
            const contractPoint = new THREE.Vector3(0, 1.2, 0);
            const watchPoint = targetWatch.watchGroup.position.clone().add(new THREE.Vector3(0, 0.2, 0));

            downBeamGeo.setFromPoints([contractPoint, watchPoint]);
            downlinkBeam.visible = true;
            (downlinkBeam.material as THREE.LineBasicMaterial).color.set(0xc084fc);

            const packetProg = (subProgress * 2.0 + elapsedTime * 1.5) % 1.0;
            downPacket.position.lerpVectors(contractPoint, watchPoint, packetProg);
            (downPacket.material as THREE.MeshBasicMaterial).color.set(0xc084fc);
            downPacket.visible = subProgress < 0.85;
          }

          uplinkBeam.visible = false;
          upPacket.visible = false;

          updateServerCanvas(`4/4 DOWNLINK: DEPLOYING → ${NODES[currentDeployIdx].id}`, currentDeployIdx, elapsedTime);
          updateContractCanvas(currentDeployIdx, 4.0, elapsedTime, true);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("keydown", onKeyDown);
      domElem.removeEventListener("wheel", onWheel);
      domElem.removeEventListener("mousedown", onMouseDown);
      domElem.removeEventListener("touchstart", onTouchStart);
      domElem.removeEventListener("touchmove", onTouchMove);
      cancelAnimationFrame(animFrameId);
      renderer.dispose();
      caseGeo.dispose();
      bezelGeo.dispose();
      glassGeo.dispose();
      closedStrapGeo.dispose();
      claspGeo.dispose();
      termGeo.dispose();
      contractGeo.dispose();
      srvGeo.dispose();
      coreGeo.dispose();
      haloGeo.dispose();
      groundGeo.dispose();
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[440px] bg-transparent select-none overflow-hidden font-sans">
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
      />
    </div>
  );
}
