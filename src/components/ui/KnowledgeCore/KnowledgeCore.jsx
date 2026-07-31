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
    // Adjusted camera position for full-screen immersive depth
    camera.position.set(2.5, 0, 22);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    container.appendChild(renderer.domElement);

    // 2. CINEMATIC AMBIENT & POINT LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    // Deep Purple Key Light (Shifted towards right for balance behind text)
    const purpleLight = new THREE.PointLight(0xa855f7, 12, 45);
    purpleLight.position.set(8, 6, 8);
    scene.add(purpleLight);

    // Vibrant Cyan Rim Light
    const cyanLight = new THREE.PointLight(0x06b6d4, 10, 40);
    cyanLight.position.set(-8, -5, 6);
    scene.add(cyanLight);

    // Magenta Glow Light
    const magentaLight = new THREE.PointLight(0xd946ef, 8, 30);
    magentaLight.position.set(4, -4, 4);
    scene.add(magentaLight);

    // Main Ecosystem Group (Positioned slightly to the right to frame left hero text perfectly)
    const ecosystemGroup = new THREE.Group();
    ecosystemGroup.position.set(3.2, 0, 0);
    scene.add(ecosystemGroup);

    // 3. HOLOGRAPHIC WIREFRAME GLOBE & CORE
    const globeGroup = new THREE.Group();
    ecosystemGroup.add(globeGroup);

    // Outer Faceted Glass Shell
    const glassGeo = new THREE.IcosahedronGeometry(3.8, 3);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xe0e7ff,
      emissive: 0x4c1d95,
      emissiveIntensity: 0.2,
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.92,
      thickness: 1.5,
      transparent: true,
      opacity: 0.55,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      ior: 1.45,
      reflectivity: 0.9,
    });
    const glassGlobe = new THREE.Mesh(glassGeo, glassMat);
    globeGroup.add(glassGlobe);

    // Inner Glowing Wireframe Network
    const wireGeo = new THREE.IcosahedronGeometry(3.76, 3);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xc084fc,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const wireframeGlobe = new THREE.Mesh(wireGeo, wireMat);
    globeGroup.add(wireframeGlobe);

    // Inner Energy Core Pulse
    const corePulseGeo = new THREE.SphereGeometry(1.4, 32, 32);
    const corePulseMat = new THREE.MeshStandardMaterial({
      color: 0xd946ef,
      emissive: 0xa855f7,
      emissiveIntensity: 3.5,
      roughness: 0.1,
    });
    const corePulseSphere = new THREE.Mesh(corePulseGeo, corePulseMat);
    globeGroup.add(corePulseSphere);

    // 4. ANIMATED NETWORK NODES & SYNAPSE LINES
    const nodeCount = 130;
    const nodePositions = [];
    const nodeGeo = new THREE.SphereGeometry(0.045, 12, 12);
    const nodeMatPurple = new THREE.MeshBasicMaterial({ color: 0xf0abfc });
    const nodeMatCyan = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });

    const innerRadius = 3.3;
    for (let i = 0; i < nodeCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * innerRadius;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      nodePositions.push(new THREE.Vector3(x, y, z));

      const nMesh = new THREE.Mesh(nodeGeo, i % 2 === 0 ? nodeMatPurple : nodeMatCyan);
      nMesh.position.set(x, y, z);
      globeGroup.add(nMesh);
    }

    // Connect close nodes with glowing energy lines
    const linePositions = [];
    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < 1.35) {
          linePositions.push(
            nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
            nodePositions[j].x, nodePositions[j].y, nodePositions[j].z
          );
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
    const neuralLines = new THREE.LineSegments(lineGeo, lineMat);
    globeGroup.add(neuralLines);

    // 5. THIN ROTATING HOLOGRAPHIC ENERGY RINGS
    const ring1Geo = new THREE.TorusGeometry(6.2, 0.03, 16, 140);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const energyRing1 = new THREE.Mesh(ring1Geo, ring1Mat);
    energyRing1.rotation.x = Math.PI / 3.2;
    scene.add(energyRing1);

    const ring2Geo = new THREE.TorusGeometry(7.2, 0.03, 16, 140);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xd946ef,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const energyRing2 = new THREE.Mesh(ring2Geo, ring2Mat);
    energyRing2.rotation.x = -Math.PI / 4;
    energyRing2.rotation.y = Math.PI / 6;
    scene.add(energyRing2);

    // 6. ORBITING DOMAIN CRYSTAL OBJECTS
    const domainGroup = new THREE.Group();
    ecosystemGroup.add(domainGroup);

    const cubeGeo = new THREE.BoxGeometry(0.75, 0.75, 0.75);
    const innerCubeGeo = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    const domainCount = 10;
    const orbitRadius = 8.5;
    const domainCubes = [];

    for (let i = 0; i < domainCount; i++) {
      const angle = (i / domainCount) * Math.PI * 2;
      const isCyan = i % 2 === 0;

      const cubeGlassMat = new THREE.MeshPhysicalMaterial({
        color: isCyan ? 0x06b6d4 : 0x9333ea,
        emissive: isCyan ? 0x0284c7 : 0x7c3aed,
        emissiveIntensity: 0.35,
        metalness: 0.1,
        roughness: 0.1,
        transmission: 0.85,
        thickness: 0.7,
        transparent: true,
        opacity: 0.8,
        reflectivity: 0.9,
      });
      const glassCube = new THREE.Mesh(cubeGeo, cubeGlassMat);

      const innerCoreMat = new THREE.MeshBasicMaterial({
        color: isCyan ? 0x38bdf8 : 0xf0abfc,
      });
      const innerCore = new THREE.Mesh(innerCubeGeo, innerCoreMat);
      glassCube.add(innerCore);

      const cubeObj = {
        mesh: glassCube,
        angle: angle,
        speed: 0.0018 + (i % 3) * 0.0006,
        elevation: Math.sin(i * 1.5) * 2.0,
        radius: orbitRadius,
      };

      glassCube.position.x = Math.cos(angle) * cubeObj.radius;
      glassCube.position.z = Math.sin(angle) * cubeObj.radius;
      glassCube.position.y = cubeObj.elevation;

      domainGroup.add(glassCube);
      domainCubes.push(cubeObj);
    }

    // 7. FULL-SCREEN FLOATING DUST PARTICLES
    const particleCount = 700;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 36;
      particlePos[i + 1] = (Math.random() - 0.5) * 28;
      particlePos[i + 2] = (Math.random() - 0.5) * 30;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 8. MOUSE PARALLAX INTERACTION
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      mouseX = (x / rect.width) * 0.5;
      mouseY = (y / rect.height) * 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 9. ANIMATION LOOP (60 FPS)
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Mouse lerp
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      // Slow Ecosystem Rotation & Parallax Tilt
      ecosystemGroup.rotation.y = elapsedTime * 0.15 + targetX;
      ecosystemGroup.rotation.x = Math.sin(elapsedTime * 0.12) * 0.08 - targetY;
      globeGroup.rotation.y = elapsedTime * 0.2;

      // Pulse Energy Center
      const pulse = 1 + Math.sin(elapsedTime * 2.2) * 0.07;
      corePulseSphere.scale.set(pulse, pulse, pulse);
      lineMat.opacity = 0.3 + Math.sin(elapsedTime * 2.8) * 0.12;

      // Counter-Rotating Energy Rings
      energyRing1.rotation.z = elapsedTime * 0.08;   // Clockwise
      energyRing2.rotation.z = -elapsedTime * 0.1;   // Counter-Clockwise

      // Orbiting Domain Cubes
      domainCubes.forEach((cube) => {
        cube.angle += cube.speed;
        cube.mesh.position.x = Math.cos(cube.angle) * cube.radius;
        cube.mesh.position.z = Math.sin(cube.angle) * cube.radius;
        cube.mesh.position.y = cube.elevation + Math.sin(elapsedTime * 1.2 + cube.angle) * 0.35;

        cube.mesh.rotation.x += 0.008;
        cube.mesh.rotation.y += 0.01;
      });

      // Drifting Background Particles
      particleSystem.rotation.y = elapsedTime * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    // RESIZE HANDLER
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
      {/* Full-Screen Three.js Canvas */}
      <div ref={containerRef} className="w-full h-full" />

      {/* Floating 10 Glass Domain Labels repositioning naturally */}
      <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
        <div className="w-full max-w-7xl h-full relative">
          <div className="absolute top-12 left-[48%] px-3.5 py-1.5 rounded-full glass-panel text-[11px] font-semibold text-purple-300 border border-purple-500/30 shadow-lg animate-bounce" style={{ animationDuration: '6s' }}>
            💎 Artificial Intelligence
          </div>
          <div className="absolute top-24 right-10 px-3.5 py-1.5 rounded-full glass-panel text-[11px] font-semibold text-cyan-300 border border-cyan-500/30 shadow-lg animate-bounce" style={{ animationDuration: '7s' }}>
            💎 Software Development
          </div>
          <div className="absolute top-44 right-4 px-3.5 py-1.5 rounded-full glass-panel text-[11px] font-semibold text-blue-300 border border-blue-500/30 shadow-lg animate-bounce" style={{ animationDuration: '6.5s' }}>
            💎 Cloud Computing
          </div>
          <div className="absolute top-64 right-12 px-3.5 py-1.5 rounded-full glass-panel text-[11px] font-semibold text-purple-300 border border-purple-500/30 shadow-lg animate-bounce" style={{ animationDuration: '7.5s' }}>
            💎 Cyber Security
          </div>
          <div className="absolute bottom-40 right-20 px-3.5 py-1.5 rounded-full glass-panel text-[11px] font-semibold text-cyan-300 border border-cyan-500/30 shadow-lg animate-bounce" style={{ animationDuration: '8s' }}>
            💎 Data Science
          </div>
          <div className="absolute bottom-16 right-8 px-3.5 py-1.5 rounded-full glass-panel text-[11px] font-semibold text-amber-300 border border-amber-500/30 shadow-lg animate-bounce" style={{ animationDuration: '9s' }}>
            💎 Finance & Accounting
          </div>
          <div className="absolute bottom-28 left-[45%] px-3.5 py-1.5 rounded-full glass-panel text-[11px] font-semibold text-pink-300 border border-pink-500/30 shadow-lg animate-bounce" style={{ animationDuration: '8.5s' }}>
            💎 Digital Marketing
          </div>
          <div className="absolute bottom-44 left-[50%] px-3.5 py-1.5 rounded-full glass-panel text-[11px] font-semibold text-indigo-300 border border-indigo-500/30 shadow-lg animate-bounce" style={{ animationDuration: '7.2s' }}>
            💎 Multimedia & Design
          </div>
          <div className="absolute top-80 left-[52%] px-3.5 py-1.5 rounded-full glass-panel text-[11px] font-semibold text-emerald-300 border border-emerald-500/30 shadow-lg animate-bounce" style={{ animationDuration: '8s' }}>
            💎 CADD Engineering
          </div>
          <div className="absolute top-96 right-28 px-3.5 py-1.5 rounded-full glass-panel text-[11px] font-semibold text-teal-300 border border-teal-500/30 shadow-lg animate-bounce" style={{ animationDuration: '9.5s' }}>
            💎 Automation & RPA
          </div>
        </div>
      </div>
    </div>
  );
}

export default KnowledgeCore;
