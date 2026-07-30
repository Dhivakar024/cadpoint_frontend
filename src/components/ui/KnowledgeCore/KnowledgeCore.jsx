import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ORBIT_DOMAINS } from './orbit-config';
import { generateSphericalPoint, generateSynapseLines } from './utils';
import { createParticleSphere } from './ParticleSphere';

export function KnowledgeCore() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. SCENE, CAMERA & RENDERER SETUP
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0.2, 18.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;

    container.appendChild(renderer.domElement);

    // 2. CINEMATIC LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const purpleKeyLight = new THREE.PointLight(0xa855f7, 10, 35);
    purpleKeyLight.position.set(4, 5, 6);
    scene.add(purpleKeyLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 10, 35);
    cyanLight.position.set(-5, -4, 6);
    scene.add(cyanLight);

    const centerGlowLight = new THREE.PointLight(0xd946ef, 8, 20);
    centerGlowLight.position.set(0, 0, 0);
    scene.add(centerGlowLight);

    // Main Core Group Container
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 3. SOFT ATMOSPHERIC VOLUMETRIC BEAM (Non-blocking background atmosphere)
    const beamGeo = new THREE.CylinderGeometry(0.5, 3.2, 20, 32, 1, true);
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.04,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const volumetricBeam = new THREE.Mesh(beamGeo, beamMat);
    volumetricBeam.position.set(0, 2, -1);
    scene.add(volumetricBeam);

    // 4. HOLOGRAPHIC PEDESTAL RINGS AT BOTTOM
    const baseGroup = new THREE.Group();
    baseGroup.position.set(0, -3.8, 0);
    scene.add(baseGroup);

    for (let r = 1; r <= 4; r++) {
      const pRingGeo = new THREE.RingGeometry(r * 0.7, r * 0.7 + 0.04, 64);
      const pRingMat = new THREE.MeshBasicMaterial({
        color: r % 2 === 0 ? 0x06b6d4 : 0xa855f7,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.35 - r * 0.06,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const pRing = new THREE.Mesh(pRingGeo, pRingMat);
      pRing.rotation.x = Math.PI / 2;
      baseGroup.add(pRing);
    }

    // 5. CENTRAL CRYSTALLINE GEODESIC CORE SPHERE
    const coreSphereGroup = new THREE.Group();
    mainGroup.add(coreSphereGroup);

    // Outer Glass Geodesic Shell
    const glassGeo = new THREE.IcosahedronGeometry(2.5, 3);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xe0e7ff,
      emissive: 0x4c1d95,
      emissiveIntensity: 0.25,
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.9,
      thickness: 1.2,
      transparent: true,
      opacity: 0.7,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      ior: 1.45,
      reflectivity: 0.9,
    });
    const glassSphere = new THREE.Mesh(glassGeo, glassMat);
    coreSphereGroup.add(glassSphere);

    // Inner Wireframe Facets
    const innerWireGeo = new THREE.IcosahedronGeometry(2.48, 3);
    const innerWireMat = new THREE.MeshBasicMaterial({
      color: 0xc084fc,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
    const innerWireframe = new THREE.Mesh(innerWireGeo, innerWireMat);
    coreSphereGroup.add(innerWireframe);

    // Connected Neural Synapse Nodes
    const nodeCount = 100;
    const nodePositions = [];
    const nodeGeo = new THREE.SphereGeometry(0.04, 12, 12);
    const nodeMatPurple = new THREE.MeshBasicMaterial({ color: 0xf0abfc });
    const nodeMatCyan = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });

    for (let i = 0; i < nodeCount; i++) {
      const pos = generateSphericalPoint(2.1);
      nodePositions.push(pos);

      const nMesh = new THREE.Mesh(nodeGeo, i % 2 === 0 ? nodeMatPurple : nodeMatCyan);
      nMesh.position.copy(pos);
      coreSphereGroup.add(nMesh);
    }

    // Synapse Connecting Lines
    const linePositions = generateSynapseLines(nodePositions, 1.1);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const neuralLines = new THREE.LineSegments(lineGeo, lineMat);
    coreSphereGroup.add(neuralLines);

    // Glowing Inner Energy Core
    const starburstGeo = new THREE.SphereGeometry(0.95, 32, 32);
    const starburstMat = new THREE.MeshStandardMaterial({
      color: 0xd946ef,
      emissive: 0xa855f7,
      emissiveIntensity: 4.0,
      roughness: 0.1,
    });
    const starburstCore = new THREE.Mesh(starburstGeo, starburstMat);
    coreSphereGroup.add(starburstCore);

    // 6. ELEGANT COUNTER-ROTATING ENERGY RINGS
    const ring1Geo = new THREE.TorusGeometry(4.2, 0.025, 16, 120);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const energyRing1 = new THREE.Mesh(ring1Geo, ring1Mat);
    energyRing1.rotation.x = Math.PI / 3;
    scene.add(energyRing1);

    const ring2Geo = new THREE.TorusGeometry(4.8, 0.025, 16, 120);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xd946ef,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const energyRing2 = new THREE.Mesh(ring2Geo, ring2Mat);
    energyRing2.rotation.x = -Math.PI / 4;
    energyRing2.rotation.y = Math.PI / 6;
    scene.add(energyRing2);

    // 7. ORBITING CRYSTAL DOMAIN OBJECTS
    const domainGroup = new THREE.Group();
    scene.add(domainGroup);

    const cubeGeo = new THREE.BoxGeometry(0.65, 0.65, 0.65);
    const coreCubeGeo = new THREE.BoxGeometry(0.28, 0.28, 0.28);
    const orbitRadius = 5.8;
    const domainCubes = [];

    ORBIT_DOMAINS.forEach((domain, i) => {
      const angle = (i / ORBIT_DOMAINS.length) * Math.PI * 2;
      const isCyan = i % 2 === 0;

      const cubeGlassMat = new THREE.MeshPhysicalMaterial({
        color: domain.color,
        emissive: domain.accent,
        emissiveIntensity: 0.35,
        metalness: 0.1,
        roughness: 0.1,
        transmission: 0.85,
        thickness: 0.6,
        transparent: true,
        opacity: 0.85,
        reflectivity: 0.9,
      });
      const glassCube = new THREE.Mesh(cubeGeo, cubeGlassMat);

      const innerCoreMat = new THREE.MeshBasicMaterial({
        color: isCyan ? 0x38bdf8 : 0xf0abfc,
      });
      const innerCore = new THREE.Mesh(coreCubeGeo, innerCoreMat);
      glassCube.add(innerCore);

      const cubeObj = {
        mesh: glassCube,
        angle: angle,
        speed: 0.0025 + (i % 2) * 0.001,
        elevation: Math.sin(i * 1.5) * 1.2,
        radius: orbitRadius,
      };

      glassCube.position.x = Math.cos(angle) * cubeObj.radius;
      glassCube.position.z = Math.sin(angle) * cubeObj.radius;
      glassCube.position.y = cubeObj.elevation;

      domainGroup.add(glassCube);
      domainCubes.push(cubeObj);
    });

    // 8. DRIFTING PARTICLES DUST
    const particleSystem = createParticleSphere(500);
    scene.add(particleSystem);

    // 9. MOUSE PARALLAX INTERACTION
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      mouseX = (x / rect.width) * 0.6;
      mouseY = (y / rect.height) * 0.6;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 10. ANIMATION LOOP
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Mouse lerp
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Core Rotation & Parallax
      mainGroup.rotation.y = elapsedTime * 0.22 + targetX;
      mainGroup.rotation.x = Math.sin(elapsedTime * 0.15) * 0.1 - targetY;
      coreSphereGroup.rotation.y = elapsedTime * 0.3;

      // Starburst Pulse
      const pulse = 1 + Math.sin(elapsedTime * 2.5) * 0.08;
      starburstCore.scale.set(pulse, pulse, pulse);
      lineMat.opacity = 0.35 + Math.sin(elapsedTime * 3) * 0.15;

      // Counter-Rotating Energy Rings
      energyRing1.rotation.z = elapsedTime * 0.12;
      energyRing2.rotation.z = -elapsedTime * 0.15;

      // Base Pedestal Rotation
      baseGroup.rotation.y = -elapsedTime * 0.08;

      // Orbiting Domain Cubes
      domainCubes.forEach((cube) => {
        cube.angle += cube.speed;
        cube.mesh.position.x = Math.cos(cube.angle) * cube.radius;
        cube.mesh.position.z = Math.sin(cube.angle) * cube.radius;
        cube.mesh.position.y = cube.elevation + Math.sin(elapsedTime * 1.5 + cube.angle) * 0.25;

        cube.mesh.rotation.x += 0.01;
        cube.mesh.rotation.y += 0.012;
      });

      // Drifting Particles
      particleSystem.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // RESIZE HANDLER
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
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
    <div className="relative w-full h-[480px] sm:h-[550px] lg:h-[620px] flex items-center justify-center">
      {/* Three.js WebGL Canvas */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating Glass Badges */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-full max-w-lg h-full relative">
          {ORBIT_DOMAINS.slice(0, 4).map((domain) => (
            <div
              key={domain.id}
              className={`absolute ${domain.position} px-3 py-1 rounded-full glass-panel text-[11px] font-semibold ${domain.badgeColor} shadow-lg animate-bounce`}
              style={{ animationDuration: domain.bounceDuration }}
            >
              {domain.badgeText}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default KnowledgeCore;
