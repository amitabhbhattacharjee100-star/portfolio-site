// Central content store for the portfolio so pages stay in sync with one source of truth.

export const personalInfo = {
  fullName: 'Amitabh Bhattacharjee',
  headline:
    'Software Engineering Technology — Artificial Intelligence Student at Centennial College | Student Innovation & Entrepreneurship Ambassador at COIE',
  tagline: 'AI • Python • React • Software Development • Project Management',
  email: 'amitabhbhattacharjee100@gmail.com',
  location: 'Scarborough, Ontario, Canada',
  linkedin: 'https://linkedin.com/in/amitabh-bhattacharjee-6541b33b7',
  github: 'https://github.com/amitabhbhattacharjee100',
  resumeUrl: '/resume.pdf',
  missionStatement:
    'I build practical, human-centred software — from responsive web apps to AI-powered agents — and pair it with an entrepreneurial mindset to turn ideas into working products.',
  summary:
    'I am a Software Engineering Technology — Artificial Intelligence student at Centennial College with a strong interest in artificial intelligence, software development, project management, entrepreneurship, and business technology. I enjoy building practical technology projects and learning how AI can be used to solve real-world problems, with experience in Python, web development, React, databases, AI concepts, software engineering, and collaborative project work.',
  secondarySummary:
    'I currently serve as a Student Innovation & Entrepreneurship Ambassador with the Centre of Innovation and Entrepreneurship (COIE), supporting student innovation, entrepreneurship, and technology-focused initiatives. I have also participated in AI-focused hackathons, giving me experience working under deadlines, solving problems, collaborating with others, and presenting technical ideas.',
};

export const openToRoles = [
  'Software Developer Intern',
  'Software Engineering Intern',
  'AI Intern',
  'Technology Intern',
  'Project Management Intern',
  'Business Technology Intern',
  'Data Analyst Intern',
  'Junior Developer',
  'Web Developer Intern',
  'IT / Technical Support',
  'Innovation Intern',
  'FinTech Intern',
];

export const skills = [
  'Artificial Intelligence',
  'Python',
  'Software Development',
  'React.js',
  'JavaScript',
  'HTML',
  'CSS',
  'Git',
  'GitHub',
  'SQL',
  'Database Management',
  'Software Engineering',
  'Object-Oriented Programming',
  'Web Development',
  'Problem Solving',
  'Project Management',
  'Teamwork',
  'Communication',
  'Leadership',
  'Entrepreneurship',
  'Innovation',
  'Customer Service',
];

export const experience = [
  {
    id: 'coie-ambassador',
    role: 'Student Innovation & Entrepreneurship Ambassador',
    organization: 'Centre of Innovation and Entrepreneurship (COIE), Centennial College',
    dates: 'Current',
    bullets: [
      'Support student innovation and entrepreneurship initiatives at Centennial College.',
      'Promote programs, workshops, events, and opportunities available through COIE.',
      'Engage with students interested in entrepreneurship, innovation, startups, and technology.',
      'Collaborate with students and staff to increase participation in innovation-focused activities.',
      'Develop communication, leadership, networking, and event-support experience.',
    ],
  },
  {
    id: 'dollarama',
    role: 'Team Member / Store Associate',
    organization: 'Dollarama',
    dates: 'Ontario, Canada',
    bullets: [
      'Assist customers and provide friendly and efficient service.',
      'Support daily store operations, merchandising, stocking, and organization.',
      'Work effectively with team members in a fast-paced retail environment.',
      'Maintain accuracy, responsibility, and professionalism during assigned duties.',
      'Develop customer service, communication, teamwork, and time-management skills.',
    ],
  },
];

export const projects = [
  {
    id: 'react-portfolio',
    title: 'React Developer Portfolio',
    role: 'Front-End Developer',
    description:
      'Created and deployed a personal portfolio using React to showcase software development projects, technical skills, education, and professional experience.',
    outcome: 'Live, deployed site built with React, JavaScript, HTML, CSS, GitHub, and Vercel.',
    accent: '#3f7d6e',
  },
  {
    id: 'ai-agent-project',
    title: 'AI Agent Project',
    role: 'AI Developer',
    description:
      'Developed an intelligent agent using Python and explored agent behaviour, environment interaction, conditions, and automated decision-making.',
    outcome: 'Strengthened applied Python, AI reasoning, and problem-solving skills.',
    accent: '#5a4fcf',
  },
  {
    id: 'ai-agents-hackathon',
    title: 'AI Agents Hackathon (Winner)',
    role: 'Team Builder & AI Engineer',
    description:
      'Participated in a Centennial College AI-focused hackathon involving artificial intelligence, teamwork, problem solving, and rapid solution development.',
    outcome: 'Won 1st place; developed AI, innovation, teamwork, presentation, and rapid prototyping skills.',
    accent: '#f2a154',
  },
];

export const education = [
  {
    id: 'centennial',
    school: 'Centennial College',
    location: 'Ontario, Canada',
    credential: 'Software Engineering Technology — Artificial Intelligence',
    dates: 'Expected Graduation: April 2028',
    details: [
      'Artificial Intelligence',
      'Python Programming',
      'Software Engineering',
      'Web Development',
      'React',
      'Database Concepts',
      'Object-Oriented Programming',
      'Data Structures',
      'Statistics and Linear Algebra',
      'Software Testing',
      'Systems Analysis',
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
      'Responsive, accessible websites built with HTML5, CSS3, JavaScript, and React, focused on clean layouts and user-friendly interfaces.',
    icon: '🌐',
  },
  {
    id: 'software-development',
    title: 'Software Development',
    description:
      'Python and object-oriented application development built on solid software engineering and testing fundamentals.',
    icon: '🛠️',
  },
  {
    id: 'ai-automation',
    title: 'AI & Automation Solutions',
    description:
      'AI-powered agents and workflow automation that apply artificial intelligence fundamentals to real-world problems.',
    icon: '🤖',
  },
  {
    id: 'project-consulting',
    title: 'Project Management & Business Technology',
    description:
      'Rapid prototyping, project coordination, and digital business model guidance informed by entrepreneurship program experience.',
    icon: '💡',
  },
];
