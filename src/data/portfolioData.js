// Central content store for the portfolio so pages stay in sync with one source of truth.

export const personalInfo = {
  fullName: 'Amitabh Bhattacharjee',
  tagline: 'Software Engineering — AI Student & Builder',
  email: 'amitabhbhattacharjee100@gmail.com',
  phone: '+1 (647) 839-6927',
  location: 'Scarborough, Ontario, Canada',
  linkedin: 'https://linkedin.com/in/amitabh-bhattacharjee-6541b33b7',
  github: 'https://github.com/amitabhbhattacharjee100',
  resumeUrl: '/resume.pdf',
  missionStatement:
    'I build practical, human-centred software — from responsive web apps to AI-powered agents — and pair it with an entrepreneurial mindset to turn ideas into working products.',
  summary:
    'Motivated full-time Software Engineering — AI student at Centennial College, returning to studies in Fall 2026 (Expected Graduation: April 2028). Winner of Centennial College\u2019s AI Agents Hackathon 2026 and recognized as a COIE Student Innovation & Entrepreneurship Ambassador and Digital Influencer. Skilled in web development, programming fundamentals (C#, .NET, JavaScript, HTML/CSS, Python, Bash), AI/ML tools, and technology innovation.',
};

export const projects = [
  {
    id: 'ai-agents-hackathon',
    title: 'AI Agents Hackathon 2026 (Winner)',
    role: 'Team Builder & AI Engineer',
    description:
      'Designed and built an AI-powered agent to solve a real-world problem, applying machine learning, automation, and software development in a team-based competition.',
    outcome: 'Won 1st place and was recognized for innovation, teamwork, and rapid prototyping.',
    accent: '#f2a154',
  },
  {
    id: 'responsive-web-suite',
    title: 'Responsive Web Development Suite',
    role: 'Front-End Developer',
    description:
      'Developed responsive websites using HTML, CSS, and JavaScript, applying front-end development principles to create user-friendly interfaces.',
    outcome: 'Delivered multiple accessible, mobile-first sites showcasing layout and UX fundamentals.',
    accent: '#3f7d6e',
  },
  {
    id: 'dotnet-console-toolkit',
    title: 'C# / .NET Console Application Toolkit',
    role: 'Software Developer',
    description:
      'Built console applications using C# and .NET, practicing object-oriented programming, debugging, and software design concepts.',
    outcome: 'Strengthened core software engineering fundamentals and clean-code practices.',
    accent: '#5a4fcf',
  },
  {
    id: 'ai-automation-research',
    title: 'AI & Automation Research Workflows',
    role: 'Researcher & Prototyper',
    description:
      'Explored AI-powered development tools and automation workflows, researching technology solutions to improve productivity and efficiency.',
    outcome: 'Identified automation opportunities that streamline repetitive development tasks.',
    accent: '#c1445e',
  },
];

export const education = [
  {
    id: 'centennial',
    school: 'Centennial College',
    location: 'Ontario, Canada',
    credential: 'Software Engineering — Artificial Intelligence',
    dates: 'Expected Graduation: April 2028',
    details: [
      'HTML & CSS',
      'JavaScript',
      'C#',
      '.NET Development',
      'Bash Scripting',
      'Client-Side Web Development',
      'Artificial Intelligence Fundamentals',
      'Machine Learning',
    ],
  },
  {
    id: 'wcci',
    school: 'Winston Churchill Collegiate Institute',
    location: 'Toronto, Ontario',
    credential: 'Ontario Secondary School Diploma (OSSD)',
    dates: 'Graduated',
    details: [
      'Advanced Functions',
      'Calculus & Vectors',
      'University English',
      'Leadership Club',
      'Volunteer Programs',
      'Academic Excellence Recognition',
    ],
  },
];

export const certifications = [
  'Microsoft Office Training (Fundamentals)',
  'Centennial College Entrepreneurship Programs',
  'COIE Innovation & Entrepreneurship Ambassador',
  'Centennial Digital Influencer Volunteer',
  'Youth Mental Health Ambassador Program',
];

export const services = [
  {
    id: 'web-development',
    title: 'Web Development',
    description:
      'Responsive, accessible websites built with HTML5, CSS3, and JavaScript, focused on clean layouts and user-friendly interfaces.',
    icon: '🌐',
  },
  {
    id: 'software-development',
    title: 'Software Development & Debugging',
    description:
      'C# and .NET console and desktop applications built on solid object-oriented programming and software design fundamentals.',
    icon: '🛠️',
  },
  {
    id: 'ai-automation',
    title: 'AI & Automation Solutions',
    description:
      'AI-powered agents and workflow automation that apply machine learning fundamentals to real-world problems.',
    icon: '🤖',
  },
  {
    id: 'tech-consulting',
    title: 'Technology & Business Consulting',
    description:
      'Rapid prototyping and digital business model guidance for startups, informed by entrepreneurship program experience.',
    icon: '💡',
  },
];
