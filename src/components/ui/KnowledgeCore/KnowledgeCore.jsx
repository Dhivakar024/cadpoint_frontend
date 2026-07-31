import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function KnowledgeCore() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. FULL-SCREEN SCENE & CAMERA SETUP
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 25);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);

    // 2. BRAND COLOR LIGHTING (Red & Dark Navy Ambient Glows)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    // Brand Red Point Light
    const redGlowLight = new THREE.PointLight(0xef4444, 7, 45);
    redGlowLight.position.set(10, 8, 5);
    scene.add(redGlowLight);

    // Dark Navy / Cyan Accent Light
    const cyanGlowLight = new THREE.PointLight(0x06b6d4, 6, 40);
    cyanGlowLight.position.set(-10, -6, 5);
    scene.add(cyanGlowLight);

    // Main Network Group
    const networkGroup = new THREE.Group();
    scene.add(networkGroup);

    // 3. ELEGANT CONSTELLATION NETWORK NODES
    const nodeCount = 140;
    const nodes = [];
    const nodeGeo = new THREE.SphereGeometry(0.04, 12, 12);
    const nodeMatRed = new THREE.MeshBasicMaterial({ color: 0xf87171 });
    const nodeMatCyan = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });

    // Distribute nodes across canvas width/height
    for (let i = 0; i < nodeCount; i++) {
      const isRightSide = i % 3 !== 0;
      const x = isRightSide
        ? (Math.random() * 20 - 4)
        : (Math.random() * 16 - 16);

      const y = (Math.random() - 0.5) * 18;
      const z = (Math.random() - 0.5) * 12;

      const position = new THREE.Vector3(x, y, z);
      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.005,
        (Math.random() - 0.5) * 0.005,
        (Math.random() - 0.5) * 0.003
      );

      const mesh = new THREE.Mesh(nodeGeo, i % 2 === 0 ? nodeMatRed : nodeMatCyan);
      mesh.position.copy(position);
      networkGroup.add(mesh);

      nodes.push({ position, velocity, mesh, originalPos: position.clone() });
    }

    // 4. DYNAMIC SYNAPSE CONNECTIONS
    const maxConnectDistance = 3.6;
    const linePositions = new Float32Array(nodeCount * nodeCount * 6);
    const lineColors = new Float32Array(nodeCount * nodeCount * 6);

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });

    const networkLines = new THREE.LineSegments(lineGeo, lineMat);
    networkGroup.add(networkLines);

    // 5. FLOATING MICRO DUST PARTICLES
    const particleCount = 450;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 38;
      particlePos[i + 1] = (Math.random() - 0.5) * 26;
      particlePos[i + 2] = (Math.random() - 0.5) * 20;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      color: 0xef4444,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 6. MOUSE PARALLAX INTERACTION
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      mouseX = (x / rect.width) * 0.4;
      mouseY = (y / rect.height) * 0.4;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 7. ANIMATION LOOP (60 FPS)
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Mouse lerp
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      networkGroup.position.x = targetX * 1.5;
      networkGroup.position.y = -targetY * 1.5;

      // Update node positions
      nodes.forEach((node) => {
        node.position.add(node.velocity);

        if (Math.abs(node.position.x - node.originalPos.x) > 2.5) node.velocity.x *= -1;
        if (Math.abs(node.position.y - node.originalPos.y) > 2.5) node.velocity.y *= -1;
        if (Math.abs(node.position.z - node.originalPos.z) > 2.5) node.velocity.z *= -1;

        node.mesh.position.copy(node.position);
      });

      // Update Lines & Energy Pulses
      let vertexIdx = 0;
      let colorIdx = 0;
      const positionsAttr = lineGeo.attributes.position;
      const colorsAttr = lineGeo.attributes.color;

      const pArr = positionsAttr.array;
      const cArr = colorsAttr.array;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dist = nodes[i].position.distanceTo(nodes[j].position);

          if (dist < maxConnectDistance) {
            pArr[vertexIdx] = nodes[i].position.x;
            pArr[vertexIdx + 1] = nodes[i].position.y;
            pArr[vertexIdx + 2] = nodes[i].position.z;

            pArr[vertexIdx + 3] = nodes[j].position.x;
            pArr[vertexIdx + 4] = nodes[j].position.y;
            pArr[vertexIdx + 5] = nodes[j].position.z;
            vertexIdx += 6;

            const pulseWave = Math.sin(elapsedTime * 2.0 - dist * 0.5) * 0.5 + 0.5;
            const r = (i % 2 === 0 ? 0.93 : 0.02) * pulseWave;
            const g = (i % 2 === 0 ? 0.26 : 0.71) * pulseWave;
            const b = (i % 2 === 0 ? 0.26 : 0.83) * pulseWave;

            cArr[colorIdx] = r;
            cArr[colorIdx + 1] = g;
            cArr[colorIdx + 2] = b;

            cArr[colorIdx + 3] = r;
            cArr[colorIdx + 4] = g;
            cArr[colorIdx + 5] = b;
            colorIdx += 6;
          }
        }
      }

      lineGeo.setDrawRange(0, vertexIdx / 3);
      positionsAttr.needsUpdate = true;
      colorsAttr.needsUpdate = true;

      particleSystem.rotation.y = elapsedTime * 0.01;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <div ref={containerRef} className="w-full h-full" />

      {/* Floating Glass Pills positioned around outer areas */}
      <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
        <div className="w-full max-w-7xl h-full relative">
          <div className="absolute top-10 right-36 px-3.5 py-1.5 rounded-full glass-panel text-[11px] font-semibold text-red-400 border border-red-500/30 shadow-lg backdrop-blur-md animate-bounce" style={{ animationDuration: '6s' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block mr-2 animate-pulse" />
            Artificial Intelligence
          </div>
          <div className="absolute top-28 right-12 px-3.5 py-1.5 rounded-full glass-panel text-[11px] font-semibold text-cyan-300 border border-cyan-500/30 shadow-lg backdrop-blur-md animate-bounce" style={{ animationDuration: '7s' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block mr-2 animate-pulse" />
            Software Development
          </div>
          <div className="absolute top-48 right-6 px-3.5 py-1.5 rounded-full glass-panel text-[11px] font-semibold text-blue-300 border border-blue-500/30 shadow-lg backdrop-blur-md animate-bounce" style={{ animationDuration: '6.5s' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block mr-2 animate-pulse" />
            Cloud Computing
          </div>
          <div className="absolute top-68 right-16 px-3.5 py-1.5 rounded-full glass-panel text-[11px] font-semibold text-red-300 border border-red-500/30 shadow-lg backdrop-blur-md animate-bounce" style={{ animationDuration: '7.5s' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block mr-2 animate-pulse" />
            Cyber Security
          </div>
          <div className="absolute bottom-44 right-28 px-3.5 py-1.5 rounded-full glass-panel text-[11px] font-semibold text-cyan-300 border border-cyan-500/30 shadow-lg backdrop-blur-md animate-bounce" style={{ animationDuration: '8s' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block mr-2 animate-pulse" />
            Data Science
          </div>
          <div className="absolute bottom-20 right-10 px-3.5 py-1.5 rounded-full glass-panel text-[11px] font-semibold text-amber-300 border border-amber-500/30 shadow-lg backdrop-blur-md animate-bounce" style={{ animationDuration: '9s' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block mr-2 animate-pulse" />
            Finance & Accounting
          </div>
          <div className="absolute bottom-12 right-64 px-3.5 py-1.5 rounded-full glass-panel text-[11px] font-semibold text-red-400 border border-red-500/30 shadow-lg backdrop-blur-md animate-bounce" style={{ animationDuration: '8.5s' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block mr-2 animate-pulse" />
            Digital Marketing
          </div>
          <div className="absolute top-96 right-48 px-3.5 py-1.5 rounded-full glass-panel text-[11px] font-semibold text-indigo-300 border border-indigo-500/30 shadow-lg backdrop-blur-md animate-bounce" style={{ animationDuration: '7.2s' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 inline-block mr-2 animate-pulse" />
            Multimedia & Design
          </div>
          <div className="absolute bottom-36 right-80 px-3.5 py-1.5 rounded-full glass-panel text-[11px] font-semibold text-emerald-300 border border-emerald-500/30 shadow-lg backdrop-blur-md animate-bounce" style={{ animationDuration: '8s' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block mr-2 animate-pulse" />
            CADD Engineering
          </div>
          <div className="absolute top-80 right-8 px-3.5 py-1.5 rounded-full glass-panel text-[11px] font-semibold text-teal-300 border border-teal-500/30 shadow-lg backdrop-blur-md animate-bounce" style={{ animationDuration: '9.5s' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 inline-block mr-2 animate-pulse" />
            Automation & RPA
          </div>
        </div>
      </div>
    </div>
  );
}

export default KnowledgeCore;
