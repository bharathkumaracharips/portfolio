"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export type ProjectCategory = "PROTOCOL" | "DAPPS" | "FULL-STACK" | "LEARNING" | "DEFAULT";

interface WorkPreviewCanvasProps {
  category: ProjectCategory;
}

export function WorkPreviewCanvas({ category }: WorkPreviewCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<ProjectCategory>(category);
  categoryRef.current = category;

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    let rafId: number;
    const W = el.clientWidth || 800;
    const H = el.clientHeight || 900;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020406, 0.02);

    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 120);
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;
    el.appendChild(renderer.domElement);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const k = new THREE.DirectionalLight(0xffffff, 1.8);
    k.position.set(6, 10, 6); scene.add(k);
    const p1 = new THREE.PointLight(0x00f0ff, 8, 25); p1.position.set(-4, 5, 6); scene.add(p1);
    const p2 = new THREE.PointLight(0x00ff66, 5, 20); p2.position.set(5, -4, 4); scene.add(p2);
    const p3 = new THREE.PointLight(0x818cf8, 4, 18); p3.position.set(0, -5, 3); scene.add(p3);

    /* ──────────────────────────────────────────────────────────
       SCENE A — PROTOCOL: Sovereign Layer-1 Genesis
       Dense sovereign chain: massive core + 20 orbital nodes + 3 rings + particle corona
    ────────────────────────────────────────────────────────── */
    const sA = new THREE.Group(); scene.add(sA);

    // Central core — large octahedron
    const aCoreM = new THREE.MeshStandardMaterial({ color: 0x010c1e, emissive: 0x00f0ff, emissiveIntensity: 1.3, metalness: 0.98, roughness: 0.04 });
    const aCore = new THREE.Mesh(new THREE.OctahedronGeometry(1.1, 3), aCoreM);
    sA.add(aCore);

    // Wireframe shell
    const aShell = new THREE.Mesh(new THREE.IcosahedronGeometry(1.6, 1),
      new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true, transparent: true, opacity: 0.18 }));
    sA.add(aShell);

    // 3 concentric rings at different angles
    [[2.6, 0.016, Math.PI / 2.2, 0, 0x00f0ff, 0.6],
     [3.2, 0.011, Math.PI / 4,  Math.PI / 3, 0x00ff66, 0.45],
     [3.8, 0.008, Math.PI / 6,  Math.PI / 1.5, 0x38bdf8, 0.3]
    ].forEach(([r, t, rx, ry, color, op]) => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(r as number, t as number, 12, 140),
        new THREE.MeshBasicMaterial({ color: color as number, transparent: true, opacity: op as number }));
      ring.rotation.x = rx as number; ring.rotation.y = ry as number;
      sA.add(ring);
    });

    // 20 orbiting pallet nodes across 3 orbital radii
    const aPallets: { mesh: THREE.Mesh; orbitR: number; speed: number; phase: number; inclination: number }[] = [];
    for (let i = 0; i < 20; i++) {
      const r = [2.0, 2.8, 3.6][i % 3];
      const isHub = i < 4;
      const mesh = new THREE.Mesh(
        isHub ? new THREE.IcosahedronGeometry(0.22, 0) : new THREE.BoxGeometry(0.18, 0.18, 0.18),
        new THREE.MeshStandardMaterial({
          color: 0x040d1c, emissive: i % 3 === 0 ? 0x00f0ff : i % 3 === 1 ? 0x00ff66 : 0x38bdf8,
          emissiveIntensity: isHub ? 1.2 : 0.75, metalness: 0.9, roughness: 0.1,
        })
      );
      sA.add(mesh);
      aPallets.push({ mesh, orbitR: r, speed: 0.35 + Math.random() * 0.3, phase: (i / 20) * Math.PI * 2, inclination: (Math.random() - 0.5) * Math.PI * 0.5 });
    }

    // Particle corona
    const aCoronaBuf = new Float32Array(300 * 3);
    for (let i = 0; i < 300; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 4 + Math.random() * 3;
      aCoronaBuf[i*3] = r * Math.sin(phi) * Math.cos(theta);
      aCoronaBuf[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
      aCoronaBuf[i*3+2] = r * Math.cos(phi);
    }
    const aCorona = new THREE.Points(
      Object.assign(new THREE.BufferGeometry(), { attributes: { position: new THREE.BufferAttribute(aCoronaBuf, 3) } }),
      new THREE.PointsMaterial({ color: 0x00f0ff, size: 0.05, transparent: true, opacity: 0.5 })
    );
    sA.add(aCorona);

    /* ──────────────────────────────────────────────────────────
       SCENE B — DAPPS: ZK Proof Verification Circuit
       Complex proof lattice: 6 validator nodes in hexagon + proof beams + central prism + data streams
    ────────────────────────────────────────────────────────── */
    const sB = new THREE.Group(); scene.add(sB);

    const bHexPositions = Array.from({ length: 6 }, (_, i) => {
      const angle = (i / 6) * Math.PI * 2;
      return new THREE.Vector3(Math.cos(angle) * 2.4, Math.sin(angle) * 2.4, 0);
    });
    const bColors = [0x38bdf8, 0x00f0ff, 0x818cf8, 0x38bdf8, 0x00f0ff, 0x818cf8];
    const bNodes: THREE.Mesh[] = [];

    bHexPositions.forEach((pos, i) => {
      const m = new THREE.Mesh(new THREE.DodecahedronGeometry(0.42, 0),
        new THREE.MeshStandardMaterial({ color: 0x030c1e, emissive: bColors[i], emissiveIntensity: 1.0, metalness: 0.92, roughness: 0.06 }));
      m.position.copy(pos);
      sB.add(m);
      bNodes.push(m);
      // Per-node ring
      const rg = new THREE.Mesh(new THREE.TorusGeometry(0.65, 0.01, 8, 50),
        new THREE.MeshBasicMaterial({ color: bColors[i], transparent: true, opacity: 0.6 }));
      rg.rotation.x = Math.PI / 2; m.add(rg);
    });

    // Full hexagonal + star beam network
    const bBeamPts: THREE.Vector3[] = [];
    for (let i = 0; i < 6; i++) {
      for (let j = i + 1; j < 6; j++) {
        bBeamPts.push(bHexPositions[i].clone(), bHexPositions[j].clone());
      }
    }
    sB.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(bBeamPts),
      new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.22 })));

    // Central proof prism
    const bPrism = new THREE.Mesh(new THREE.OctahedronGeometry(0.6, 0),
      new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x38bdf8, emissiveIntensity: 2.2, metalness: 1.0, roughness: 0.0 }));
    sB.add(bPrism);

    // Outer icosahedron cage
    sB.add(new THREE.Mesh(new THREE.IcosahedronGeometry(3.5, 1),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.08 })));

    // Particle data streams along beam paths
    const bStreamBuf = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 0.5 + Math.random() * 3;
      bStreamBuf[i*3] = Math.cos(a) * r;
      bStreamBuf[i*3+1] = Math.sin(a) * r;
      bStreamBuf[i*3+2] = (Math.random() - 0.5) * 1.5;
    }
    const bStream = new THREE.Points(
      Object.assign(new THREE.BufferGeometry(), { attributes: { position: new THREE.BufferAttribute(bStreamBuf, 3) } }),
      new THREE.PointsMaterial({ color: 0x818cf8, size: 0.06, transparent: true, opacity: 0.6 })
    );
    sB.add(bStream);

    /* ──────────────────────────────────────────────────────────
       SCENE C — FULL-STACK: Async Data Pipeline
       Twin counter-rotating helices + data packets + central fusion reactor
    ────────────────────────────────────────────────────────── */
    const sC = new THREE.Group(); scene.add(sC);

    const HELIX_N = 120;
    const cBufA = new Float32Array(HELIX_N * 3);
    const cBufB = new Float32Array(HELIX_N * 3);
    for (let i = 0; i < HELIX_N; i++) {
      const t = (i / HELIX_N) * Math.PI * 5;
      const y = (i / HELIX_N) * 6.5 - 3.25;
      cBufA[i*3] = Math.cos(t) * 1.5; cBufA[i*3+1] = y; cBufA[i*3+2] = Math.sin(t) * 1.5;
      cBufB[i*3] = -Math.cos(t) * 1.5; cBufB[i*3+1] = y; cBufB[i*3+2] = -Math.sin(t) * 1.5;
    }

    const makeHelix = (buf: Float32Array, color: number) => {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(buf, 3));
      sC.add(new THREE.Points(geo, new THREE.PointsMaterial({ color, size: 0.11, transparent: true, opacity: 0.95 })));
      sC.add(new THREE.Line(geo, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.4 })));
    };
    makeHelix(cBufA, 0x00e599);
    makeHelix(cBufB, 0x00f0ff);

    // Cross-strand bridges every 12 points
    const cBridgePts: THREE.Vector3[] = [];
    for (let i = 0; i < HELIX_N; i += 10) {
      cBridgePts.push(
        new THREE.Vector3(cBufA[i*3], cBufA[i*3+1], cBufA[i*3+2]),
        new THREE.Vector3(cBufB[i*3], cBufB[i*3+1], cBufB[i*3+2]),
      );
    }
    sC.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(cBridgePts),
      new THREE.LineBasicMaterial({ color: 0x00e599, transparent: true, opacity: 0.25 })));

    // Fusion reactor core
    const cReactor = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32),
      new THREE.MeshStandardMaterial({ color: 0x010a10, emissive: 0x00e599, emissiveIntensity: 2.5, metalness: 0.95, roughness: 0.0 }));
    sC.add(cReactor);
    const cReactorRing = new THREE.Mesh(new THREE.TorusGeometry(0.9, 0.015, 12, 80),
      new THREE.MeshBasicMaterial({ color: 0x00e599, transparent: true, opacity: 0.7 }));
    sC.add(cReactorRing);

    // Ambient data particles
    const cAmbBuf = new Float32Array(150 * 3);
    for (let i = 0; i < 150; i++) {
      cAmbBuf[i*3] = (Math.random() - 0.5) * 6;
      cAmbBuf[i*3+1] = (Math.random() - 0.5) * 8;
      cAmbBuf[i*3+2] = (Math.random() - 0.5) * 4;
    }
    sC.add(new THREE.Points(
      Object.assign(new THREE.BufferGeometry(), { attributes: { position: new THREE.BufferAttribute(cAmbBuf, 3) } }),
      new THREE.PointsMaterial({ color: 0x38bdf8, size: 0.04, transparent: true, opacity: 0.5 })
    ));

    /* ──────────────────────────────────────────────────────────
       SCENE D — LEARNING: Knowledge Network
       Neural-like knowledge graph: random node positions, pulsing connections, teacher hubs
    ────────────────────────────────────────────────────────── */
    const sD = new THREE.Group(); scene.add(sD);

    const D_NODES = 35;
    const dPositions: THREE.Vector3[] = [];
    const dMeshes: { mesh: THREE.Mesh; mat: THREE.MeshStandardMaterial; phase: number; isHub: boolean }[] = [];

    for (let i = 0; i < D_NODES; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 1.5 + Math.random() * 2.8;
      const pos = new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
      dPositions.push(pos);
      const isHub = i < 5;
      const mat = new THREE.MeshStandardMaterial({
        color: 0x03070f, emissive: isHub ? 0xf59e0b : 0x818cf8,
        emissiveIntensity: isHub ? 1.3 : 0.5, metalness: 0.85, roughness: 0.12,
      });
      const mesh = new THREE.Mesh(
        isHub ? new THREE.IcosahedronGeometry(0.32, 0) : new THREE.OctahedronGeometry(0.14, 0),
        mat
      );
      mesh.position.copy(pos);
      sD.add(mesh);
      dMeshes.push({ mesh, mat, phase: Math.random() * Math.PI * 2, isHub });
    }

    // Connect nearby nodes
    const dEdgePts: THREE.Vector3[] = [];
    for (let i = 0; i < D_NODES; i++) {
      const sorted = dPositions.map((p, j) => ({ j, d: dPositions[i].distanceTo(p) }))
        .filter(x => x.j !== i).sort((a, b) => a.d - b.d).slice(0, 3);
      sorted.forEach(({ j }) => { if (j > i) { dEdgePts.push(dPositions[i], dPositions[j]); } });
    }
    sD.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(dEdgePts),
      new THREE.LineBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.18 })));

    // Outer wire sphere
    sD.add(new THREE.Mesh(new THREE.IcosahedronGeometry(4.5, 1),
      new THREE.MeshBasicMaterial({ color: 0xf59e0b, wireframe: true, transparent: true, opacity: 0.05 })));

    // ── Mouse parallax
    const mouse = new THREE.Vector2();
    const tMouse = new THREE.Vector2();
    el.addEventListener("mousemove", (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      tMouse.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      tMouse.y = -((e.clientY - r.top) / r.height - 0.5) * 2;
    });

    // ── Resize
    const onResize = () => {
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // ── Scene routing
    const allScenes = [sA, sB, sC, sD];
    const catIdx: Record<ProjectCategory, number> = { PROTOCOL: 0, DAPPS: 1, "FULL-STACK": 2, LEARNING: 3, DEFAULT: 0 };
    allScenes.forEach((g, i) => { g.scale.setScalar(i === catIdx[categoryRef.current] ? 1 : 0.001); g.visible = i === catIdx[categoryRef.current]; });

    const clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      mouse.x += (tMouse.x - mouse.x) * 0.04;
      mouse.y += (tMouse.y - mouse.y) * 0.04;
      camera.position.x = mouse.x * 1.2;
      camera.position.y = mouse.y * 0.8;
      camera.lookAt(0, 0, 0);

      const active = catIdx[categoryRef.current];
      allScenes.forEach((g, i) => {
        const target = i === active ? 1 : 0.001;
        g.scale.lerp(new THREE.Vector3(target, target, target), 0.065);
        g.visible = g.scale.x > 0.008;
      });

      // Scene A
      aCore.rotation.y = t * 0.35; aCore.rotation.x = t * 0.2;
      aShell.rotation.y = -t * 0.22; aShell.rotation.z = t * 0.1;
      sA.children.filter(c => c instanceof THREE.Mesh && (c as THREE.Mesh).geometry instanceof THREE.TorusGeometry)
        .forEach((r, i) => { r.rotation.z = t * [0.15, -0.2, 0.12][i] || 0; });
      aPallets.forEach(({ mesh, orbitR, speed, phase, inclination }) => {
        const angle = t * speed + phase;
        mesh.position.set(
          Math.cos(angle) * orbitR,
          Math.sin(angle * 0.5 + inclination) * orbitR * 0.35,
          Math.sin(angle) * orbitR
        );
        mesh.rotation.x = t * 2; mesh.rotation.y = t * 1.5;
      });
      aCorona.rotation.y = t * 0.04; aCorona.rotation.x = t * 0.02;
      aCoreM.emissiveIntensity = 1.1 + Math.sin(t * 2.2) * 0.35;

      // Scene B
      bNodes.forEach((n, i) => {
        n.rotation.y = t * 0.6 + i; n.rotation.x = t * 0.4;
        n.position.y = bHexPositions[i].y + Math.sin(t * 0.8 + i * 1.2) * 0.15;
      });
      bPrism.rotation.y = t * 1.8; bPrism.rotation.z = t * 1.1;
      (bPrism.material as THREE.MeshStandardMaterial).emissiveIntensity = 1.8 + Math.sin(t * 3) * 0.6;
      sB.rotation.y = t * 0.08;
      bStream.rotation.z = t * 0.2;

      // Scene C
      sC.rotation.y = t * 0.14;
      cReactorRing.rotation.z = t * 0.9; cReactorRing.rotation.x = t * 0.4;
      (cReactor.material as THREE.MeshStandardMaterial).emissiveIntensity = 2.0 + Math.sin(t * 3.5) * 0.7;

      // Scene D
      dMeshes.forEach(({ mesh, mat, phase, isHub }) => {
        mat.emissiveIntensity = (isHub ? 1.0 : 0.35) + Math.sin(t * 1.8 + phase) * (isHub ? 0.6 : 0.25);
        if (isHub) { mesh.rotation.y = t * 0.5; mesh.rotation.x = t * 0.3; }
      });
      sD.rotation.y = t * 0.07;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" />;
}
