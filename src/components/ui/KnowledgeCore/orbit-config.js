import { DOMAIN_SHAPES, COLOR_PALETTE } from './types';

export const ORBIT_DOMAINS = [
  {
    id: 'ai',
    title: 'Artificial Intelligence',
    shape: DOMAIN_SHAPES.OCTAHEDRON,
    color: COLOR_PALETTE.purple,
    accent: COLOR_PALETTE.pink,
    badgeColor: 'text-purple-300 border-purple-500/30',
    badgeText: '💎 Artificial Intelligence',
    position: 'top-6 left-2',
    bounceDuration: '6s'
  },
  {
    id: 'software',
    title: 'Software Development',
    shape: DOMAIN_SHAPES.CUBE,
    color: COLOR_PALETTE.cyan,
    accent: COLOR_PALETTE.blue,
    badgeColor: 'text-cyan-300 border-cyan-500/30',
    badgeText: '💎 Software Development',
    position: 'top-14 right-2',
    bounceDuration: '7s'
  },
  {
    id: 'cloud',
    title: 'Cloud Computing',
    shape: DOMAIN_SHAPES.TORUS,
    color: COLOR_PALETTE.blue,
    accent: COLOR_PALETTE.cyan,
    badgeColor: 'text-blue-300 border-blue-500/30',
    badgeText: '💎 Cloud Computing',
    position: 'top-32 left-4',
    bounceDuration: '6.5s'
  },
  {
    id: 'cyber',
    title: 'Cyber Security',
    shape: DOMAIN_SHAPES.DODECAHEDRON,
    color: COLOR_PALETTE.purple,
    accent: COLOR_PALETTE.glowPurple,
    badgeColor: 'text-purple-300 border-purple-500/30',
    badgeText: '💎 Cyber Security',
    position: 'top-36 right-4',
    bounceDuration: '7.5s'
  },
  {
    id: 'finance',
    title: 'Finance & Accounting',
    shape: DOMAIN_SHAPES.CYLINDER,
    color: COLOR_PALETTE.cyan,
    accent: COLOR_PALETTE.blue,
    badgeColor: 'text-amber-300 border-amber-500/30',
    badgeText: '💎 Finance & Accounts',
    position: 'bottom-10 right-6',
    bounceDuration: '9s'
  },
  {
    id: 'digital',
    title: 'Digital Marketing',
    shape: DOMAIN_SHAPES.CONE,
    color: COLOR_PALETTE.pink,
    accent: COLOR_PALETTE.purple,
    badgeColor: 'text-pink-300 border-pink-500/30',
    badgeText: '💎 Digital Marketing',
    position: 'bottom-24 right-8',
    bounceDuration: '8.5s'
  },
  {
    id: 'multimedia',
    title: 'Multimedia Design',
    shape: DOMAIN_SHAPES.ICOHEDRON,
    color: COLOR_PALETTE.purple,
    accent: COLOR_PALETTE.cyan,
    badgeColor: 'text-indigo-300 border-indigo-500/30',
    badgeText: '💎 Multimedia Design',
    position: 'bottom-28 left-6',
    bounceDuration: '7.2s'
  },
  {
    id: 'cadd',
    title: 'CADD Engineering',
    shape: DOMAIN_SHAPES.TETRAHEDRON,
    color: COLOR_PALETTE.cyan,
    accent: COLOR_PALETTE.blue,
    badgeColor: 'text-emerald-300 border-emerald-500/30',
    badgeText: '💎 CADD Engineering',
    position: 'bottom-16 left-4',
    bounceDuration: '8s'
  }
];
