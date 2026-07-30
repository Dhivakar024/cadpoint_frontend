import * as THREE from 'three';

export function createParticleSphere(particleCount = 500) {
  const particleGeo = new THREE.BufferGeometry();
  const particlePos = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    particlePos[i] = (Math.random() - 0.5) * 24;
    particlePos[i + 1] = (Math.random() - 0.5) * 24;
    particlePos[i + 2] = (Math.random() - 0.5) * 24;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
  const particleMat = new THREE.PointsMaterial({
    size: 0.055,
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending,
  });

  return new THREE.Points(particleGeo, particleMat);
}
