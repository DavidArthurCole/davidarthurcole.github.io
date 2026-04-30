import snProjectsRaw from './sn-export-compact.json';
export const snProjects: SNProject[] = snProjectsRaw as SNProject[];

export interface Social {
  label: string;
  href: string;
  icon: 'github' | 'linkedin' | 'servicenow' | 'email';
}

export interface Cert {
  name: string;
  issued: string;
  credentialId?: string;
}

export interface SNHighlight {
  title: string;
  description: string;
}

export interface SNProject {
  name: string;
  scope: string;
  description: string;
  type: string;
}

export interface WorkEntry {
  role: string;
  org: string;
  type: string;
  start: string;
  end: string | null;
  bullets: string[];
}

export interface SkillProject {
  name: string;
  href: string;
}

export interface Skill {
  name: string;
  icon: string;
  href: string;
  hoverColor: string;
  tagline: string;
  detail: string;
  relatedProjects?: SkillProject[];
}

export interface Project {
  name: string;
  href: string;
  description: string;
  tags: string[];
}

export const profile = {
  name: 'David Cole',
  pronouns: 'they/them',
  title: 'Applications Developer III - ServiceNow Architect',
  tagline: 'Building enterprise-grade ServiceNow solutions for 20,000+ users.',
  socials: [
    {
      label: 'GitHub',
      href: 'https://github.com/DavidArthurCole',
      icon: 'github',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/davidarthurcole/',
      icon: 'linkedin',
    },
    {
      label: 'ServiceNow Community',
      href: 'https://www.servicenow.com/community/user/viewprofilepage/user-id/431369',
      icon: 'servicenow',
    },
    {
      label: 'Email',
      href: 'mailto:mail@davidarthurcole.me',
      icon: 'email',
    },
  ] as Social[],
};

export const about =
  'ServiceNow Administrator and Developer at Rochester Institute of Technology, ' +
  'maintaining an ITSM, CSM, and ITBM platform serving 20,000+ active users. ' +
  'Day-to-day work spans platform integrations, custom application architecture, ' +
  'Flow Designer automation, and Scripted REST APIs. ' +
  'Outside of work, building and operating a self-hosted homelab - ' +
  'OPNsense router, Docker on bare metal, k3s, Authentik SSO, and more.';

export const certifications: Cert[] = [
  {
    name: 'ServiceNow Certified Application Developer (CAD)',
    issued: 'Feb 2026',
    credentialId: 'e4df5be4-87e7-49c9-ab7c-72e0c004c21f',
  },
  {
    name: 'Suite Certification - Application Developer Core Skills Micro',
    issued: 'Feb 2026',
  },
  {
    name: 'ServiceNow Certified System Administrator (CSA)',
    issued: 'Jan 2026',
    credentialId: 'dcecb8e9-af73-4ce7-8cbc-84145e743eec',
  },
  {
    name: 'ServiceNow Flow Designer',
    issued: 'Jan 2026',
    credentialId: '39ea24ea-9ae7-4245-9e99-99263c76abbd',
  },
  {
    name: 'ServiceNow Integration Hub',
    issued: 'Feb 2026',
    credentialId: '22e5527b-f2b4-4b37-85e3-248e1035a5d3',
  },
];

export const snSkills: string[] = [
  'App Engine Studio',
  'Now Experience UI Builder',
  'Flows',
  'Integration Hub',
  'Workflow Studio',
  'ServiceNow AI Platform',
  'Flow Designer',
  'Scripting and Coding',
  'Platform Analytics',
  'Service Catalog',
];

export const snHighlights: SNHighlight[] = [
  {
    title: 'Workday Integration',
    description:
      'Architected a bi-directional Workday integration to automate chargeback workflows across the enterprise, syncing HR data into ITSM processes in real time.',
  },
  {
    title: 'Slack API Suite',
    description:
      'Built a custom Script Include and Scripted REST API suite wrapping the full Slack API, enabling reusable Business Rules and Flows to post, update, and react to Slack messages from any part of the platform.',
  },
  {
    title: 'ITSM / SPM / FSM Platform',
    description:
      'Designed and maintained database structures and solution applications for ITSM, SPM, and FSM module implementations serving 20,000+ active users.',
  },
  {
    title: 'Platform Administration',
    description:
      'Day-to-day administration of access controls, update sets, instance health, and release coordination - keeping a production instance stable across multiple concurrent development tracks.',
  },
  {
    title: 'Flow Designer & Integration Hub',
    description:
      'Authored complex multi-step Flows and Integration Hub spokes to automate enterprise workflows across HR, IT, and Finance - reducing manual handling and accelerating fulfillment SLAs.',
  },
  {
    title: 'App Engine & Now Experience',
    description:
      'Built custom scoped applications in App Engine Studio with bespoke Now Experience UI Builder portals for both end-user and fulfiller-facing views.',
  },
  {
    title: 'Scripted REST APIs',
    description:
      'Designed and exposed Scripted REST API endpoints consumed by internal services and third-party platforms for real-time data exchange and event-driven automation.',
  },
  {
    title: 'Service Catalog',
    description:
      'Developed and maintained ITSM, CSM, and ITBM catalog items - including catalog client scripts, UI policies, variable sets, and multi-stage fulfillment workflows.',
  },
];

export const snCommunity = {
  href: 'https://www.servicenow.com/community/user/viewprofilepage/user-id/431369',
  credlyHref: 'https://www.credly.com/users/david-cole.ee1995d9',
};

export const experience: WorkEntry[] = [
  {
    role: 'IT Application Developer',
    org: 'Rochester Institute of Technology',
    type: 'Full-time',
    start: 'Jul 2022',
    end: null,
    bullets: [
      'Administering and developing on a ServiceNow instance supporting 20,000+ active users across ITSM, CSM, and ITBM.',
      'Architected a bi-directional Workday integration to automate chargeback workflows across the enterprise.',
      'Built a custom Slack Script Include and Scripted REST API suite wrapping the full Slack API into reusable Business Rules and Flows.',
      'Designed and maintained database structures and solution applications for ITSM, SPM, and FSM implementations.',
      'Manage platform administration including access controls, update sets, instance health, and ongoing development.',
    ],
  },
  {
    role: 'Junior Programmer Analyst',
    org: 'Rochester Institute of Technology',
    type: 'Full-time',
    start: 'Dec 2021',
    end: 'Jul 2022',
    bullets: [
      'Provided software and development support to enterprise systems and end-user devices.',
    ],
  },
  {
    role: 'Senior IT Technician',
    org: 'Rochester Institute of Technology',
    type: 'Part-time',
    start: 'Oct 2019',
    end: 'Dec 2021',
    bullets: [
      'Provided IT support to enterprise employees and students; trained and mentored fellow technicians.',
      'Handled customer-facing and internal conflict resolution.',
    ],
  },
];

export const education = {
  degree: 'Bachelor of Engineering - Computer Engineering',
  school: 'Rochester Institute of Technology',
  years: '2019 - 2024',
};

export const skills: Skill[] = [
  {
    name: 'JavaScript',
    icon: 'https://cdn.simpleicons.org/javascript/F7DF1E',
    href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    hoverColor: 'rgba(247, 223, 30, 0.22)',
    tagline: 'ServiceNow scripting backbone',
    detail:
      'Primary language for all ServiceNow platform work - Business Rules, Script Includes, GlideAjax, client-side scripting, Scripted REST APIs, and Flow Designer action scripts. Used daily across the full platform surface.',
  },
  {
    name: 'Java',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
    href: 'https://www.oracle.com/java/',
    hoverColor: 'rgba(237, 139, 0, 0.20)',
    tagline: 'JVM tooling',
    detail:
      'Used for enterprise tooling, build utilities, and backend services in academic and professional contexts. Strong foundation from a Computer Engineering degree with significant JVM coursework.',
  },
  {
    name: 'Python',
    icon: 'https://cdn.simpleicons.org/python/3776AB',
    href: 'https://www.python.org/',
    hoverColor: 'rgba(55, 118, 171, 0.22)',
    tagline: 'Scripting and protobuf',
    detail:
      'Used for automation scripts and reverse-engineering tooling. Built EggIncProtoExtractor to decode and decompile Egg Inc. game binary files using the protobuf library.',
    relatedProjects: [
      { name: 'EggIncProtoExtractor', href: 'https://github.com/DavidArthurCole/EggIncProtoExtractor' },
    ],
  },
  {
    name: 'Vue.js',
    icon: 'https://cdn.simpleicons.org/vuedotjs/4FC08D',
    href: 'https://vuejs.org/',
    hoverColor: 'rgba(79, 192, 141, 0.20)',
    tagline: 'Frontend of choice',
    detail:
      'Framework of choice for all personal frontend projects. Built EggLedger\'s full UI with Vue 3 Composition API, and this portfolio\'s interactive components are Vue islands inside an Astro static shell.',
    relatedProjects: [
      { name: 'EggLedger', href: 'https://github.com/DavidArthurCole/EggLedger' },
    ],
  },
  {
    name: 'Node.js',
    icon: 'https://cdn.simpleicons.org/nodedotjs/5FA04E',
    href: 'https://nodejs.org/',
    hoverColor: 'rgba(95, 160, 78, 0.22)',
    tagline: 'Backend and automation',
    detail:
      'Used for lightweight web servers and automation tooling. Built auto-dymo, a Node.js server that wraps DYMO printer drivers and exposes label printing over a web interface.',
    relatedProjects: [
      { name: 'auto-dymo', href: 'https://github.com/davidArthurCole/auto-dymo' },
    ],
  },
  {
    name: 'Docker',
    icon: 'https://cdn.simpleicons.org/docker/2496ED',
    href: 'https://www.docker.com/',
    hoverColor: 'rgba(36, 150, 237, 0.22)',
    tagline: 'Homelab containers',
    detail:
      'Primary containerization platform across a self-hosted homelab running on bare metal. Containerizes EggLedger, Authentik SSO, and an array of self-hosted services alongside a k3s cluster.',
    relatedProjects: [
      { name: 'EggLedger', href: 'https://github.com/DavidArthurCole/EggLedger' },
    ],
  },
  {
    name: 'Linux',
    icon: 'https://cdn.simpleicons.org/linux/FCC624',
    href: 'https://www.linuxfoundation.org/',
    hoverColor: 'rgba(252, 198, 36, 0.20)',
    tagline: 'Homelab and infrastructure',
    detail:
      'Daily OS for all server infrastructure. Running OPNsense as the network edge router, bare-metal Docker hosts, k3s clusters, and Authentik SSO across the homelab stack.',
  },
  {
    name: 'C++',
    icon: 'https://cdn.simpleicons.org/cplusplus/00599C',
    href: 'https://isocpp.org/',
    hoverColor: 'rgba(0, 89, 157, 0.22)',
    tagline: 'Systems programming',
    detail:
      'Used for low-level systems work and native utilities. Built File Sorter, a C++ executable for reorganizing and recovering files and directory structures after data loss events.',
    relatedProjects: [
      { name: 'File Sorter', href: 'https://github.com/DavidArthurCole/Sorter' },
    ],
  },
  {
    name: 'Shell',
    icon: 'https://cdn.simpleicons.org/gnubash/4EAA25',
    href: 'https://www.gnu.org/software/bash/',
    hoverColor: 'rgba(78, 170, 37, 0.22)',
    tagline: 'Automation and deployment',
    detail:
      'Used for deployment scripts, homelab automation, cron jobs, and general Unix orchestration. The glue layer tying together Docker, k3s, and bare-metal operations across the whole stack.',
  },
];

export const projects: Project[] = [
  {
    name: 'EggLedger',
    href: 'https://github.com/DavidArthurCole/EggLedger',
    description:
      'Game data sync tool for Egg Inc., built with Vue 3 and Go. Live on homelab.',
    tags: ['Vue', 'Go', 'Docker'],
  },
  {
    name: 'EggIncProtoExtractor',
    href: 'https://github.com/DavidArthurCole/EggIncProtoExtractor',
    description:
      'Uses Python and protobuf to extract and decompile Egg Inc. game files into a usable format.',
    tags: ['Python', 'Protobuf'],
  },
  {
    name: 'auto-dymo',
    href: 'https://github.com/davidArthurCole/auto-dymo',
    description: 'Node.js server for printing DYMO labels over the web.',
    tags: ['Node.js'],
  },
  {
    name: 'File Sorter',
    href: 'https://github.com/DavidArthurCole/Sorter',
    description: 'C++ executable for organizing files after data recovery.',
    tags: ['C++'],
  },
];
