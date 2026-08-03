export const profile = {
  name: 'Alok Pal',
  firstName: 'Alok',
  lastName: 'Pal',
  roles: [
    'Full-Stack Developer',
    'MERN Stack Engineer',
    'DevOps Practitioner',
    'Backend Systems Designer',
  ],
  tagline: 'Building production MERN applications with DevOps discipline.',
  email: 'alokp5491@gmail.com',
  phone: '+91 9319368847',
  phoneHref: '+919319368847',
  location: 'Ghaziabad, India',
  github: 'https://github.com/alokpal17',
  githubHandle: 'alokpal17',
  linkedin: 'https://linkedin.com/in/alok-pal08',
  linkedinHandle: 'alok-pal08',
  summary:
    "I'm a Full-Stack Developer specializing in the MERN stack with hands-on DevOps skills — from containerizing multi-service apps with Docker to shipping CI/CD pipelines on GitHub Actions. I care about clean architecture, REST design, and the boring details that make software reliable in production.",
};

export const education = {
  degree: 'B.Tech in Computer Science & Engineering',
  school: 'JSS University, Noida',
  period: '2024 — 2028',
  cgpa: '8.9',
  detail: 'Focused on data structures, system design, and full-stack engineering.',
};

export const skillGroups: {
  title: string;
  icon: string;
  items: string[];
}[] = [
  {
    title: 'Languages',
    icon: 'Code2',
    items: ['C++', 'Python', 'C', 'SQL'],
  },
  {
    title: 'Core Concepts',
    icon: 'Brain',
    items: ['Data Structures & Algorithms', 'Object-Oriented Design', 'DBMS', 'Complexity Analysis', 'JWT'],
  },
  {
    title: 'Frontend',
    icon: 'LayoutDashboard',
    items: ['React.js', 'TypeScript', 'HTML', 'CSS'],
  },
  {
  title: 'Backend',
  icon: 'Server',
  items: ['Node.js', 'Express.js', 'REST APIs', 'MVC Architecture'], // System Design removed
  },
  {
    title: 'Database',
    icon: 'Database',
    items: ['MongoDB'],
  },
  {
    title: 'DevOps',
    icon: 'Container',
    items: ['Docker', 'Kubernetes', 'CI/CD', 'GitHub Actions'],
  },
  {
  title: 'Currently Learning',
  icon: 'BookOpen', // or whatever icon fits your set
  items: ['System Design'],
  },
  {
    title: 'Tools',
    icon: 'Wrench',
    items: ['Git', 'GitHub', 'Postman', 'Netlify', 'Render', 'Cloudinary'],
  },
];

export type Project = {
  id: string;
  name: string;
  tagline: string;
  stack: string[];
  live?: string;
  liveLabel?: string;
  badges: string[];
  highlights: string[];
  accent: 'emerald' | 'cyan' | 'violet';
};

export const projects: Project[] = [
  {
    id: 'fuzztube',
    name: 'FuzzTube',
    tagline: 'Full-Stack Social Video Platform',
    stack: ['React', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'Cloudinary', 'JWT', 'Docker'],
    live: 'https://fuzztube.netlify.app',
    liveLabel: 'fuzztube.netlify.app',
    badges: ['Production', 'MERN', 'DevOps'],
    accent: 'emerald',
    highlights: [
      'Owned full SDLC (design, coding, testing, deployment) of a production, distributed MERN platform combining YouTube-style video streaming and Twitter-style microblogging, serving real users.',
      'Designed 15+ REST API endpoints on an MVC architecture with JWT auth and bcrypt password hashing.',
      'Validated API correctness through Postman-driven test suites covering auth, uploads, and notification triggers.',
      'Integrated Cloudinary for video/image uploads with real-time progress tracking; built an event-driven notifications system for likes, comments, and subscriptions.',
      'Containerized the full stack with Docker (Dockerfiles for backend + frontend), orchestrated multi-service builds with Docker Compose, published images to Docker Hub.',
      'Built a GitHub Actions CI/CD pipeline that builds, tests, and pushes Docker images on every push to main. Deployed frontend on Netlify, backend on Render, with production CORS and environment-based config.',
    ],
  },
  {
    id: 'traffic',
    name: 'Smart Traffic Management System',
    tagline: 'Smart India Hackathon 2025',
    stack: ['Python', 'OpenCV', 'React.js', 'JavaScript', 'REST APIs'],
    badges: ['Hackathon', 'Computer Vision', 'Distributed'],
    accent: 'cyan',
    highlights: [
      'Designed a real-time vehicle-density algorithm using OpenCV that detects vehicle counts and dynamically computes signal-timing adjustments across a distributed set of intersection nodes.',
      'Built a React dashboard consuming REST APIs to visualize live traffic flow and signal timing across multiple intersections.',
      'Collaborated in a team to design system architecture and present the algorithmic approach at SIH 2025.',
    ],
  },
];

export const stats = [
  { label: 'REST Endpoints', value: '15', suffix: '+' },
  { label: 'Tech Stack', value: '20', suffix: '+' },
  { label: 'Projects Shipped', value: '2', suffix: '' },
  { label: 'API Test Suites', value: 'Full', suffix: '' },
];
