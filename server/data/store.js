const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DATA_FILE = process.env.PORTFOLIO_DATA_FILE || path.join(__dirname, 'portfolio-data.json');
const profileSeed = require('./profile-seed.json');

const defaultUsers = [
  {
    id: 'admin-user',
    name: 'Portfolio Admin',
    email: 'admin@portfolio.com',
    password: bcrypt.hashSync('Admin123!', 10),
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
];

const defaultContacts = [
  {
    id: 'contact-1',
    name: 'Portfolio Admin',
    email: 'admin@portfolio.com',
    message: 'Hello! I would like to discuss a web project opportunity.',
    createdAt: new Date().toISOString(),
  },
];

const defaultEducation = [
  {
    id: 'edu-1',
    school: 'Centennial College',
    degree: 'Advanced Diploma',
    field: 'Web Application Development',
    startDate: '2024-09-01',
    endDate: '2026-04-30',
    description: 'Focused on full-stack web development, database design, and cloud deployment.',
  },
];

const defaultProjects = [
  {
    id: 'project-1',
    title: 'Portfolio Website',
    description: 'Built a modern portfolio application with authentication, dashboard, and forms.',
    technologies: ['React', 'Node.js', 'MongoDB'],
    link: 'https://example.com',
  },
];

let state = {
  users: [],
  contacts: [],
  education: [],
  projects: [],
};

function loadState() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      state = {
        users: defaultUsers,
        contacts: defaultContacts,
        education: profileSeed.education.map((item, i) => ({ ...item, id: `personal-education-${i + 1}` })),
        projects: profileSeed.projects.map((item, i) => ({ ...item, id: `personal-project-${i + 1}` })),
      };
      saveState();
      return;
    }

    const file = fs.readFileSync(DATA_FILE, 'utf8');
    const parsed = JSON.parse(file);
    state = {
      users: Array.isArray(parsed.users) ? parsed.users : defaultUsers,
      contacts: Array.isArray(parsed.contacts) ? parsed.contacts : defaultContacts,
      education: Array.isArray(parsed.education) ? parsed.education : defaultEducation,
      projects: Array.isArray(parsed.projects) ? parsed.projects : defaultProjects,
    };
  } catch (error) {
    state = {
      users: defaultUsers,
      contacts: defaultContacts,
      education: defaultEducation,
      projects: defaultProjects,
    };
    saveState();
  }
}

function saveState() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(state, null, 2));
}

function ensureDefaultAdmin() {
  const adminExists = state.users.some((user) => user.email === 'admin@portfolio.com');
  if (!adminExists) {
    state.users.unshift({
      id: 'admin-user',
      name: 'Portfolio Admin',
      email: 'admin@portfolio.com',
      password: bcrypt.hashSync('Admin123!', 10),
      role: 'admin',
      createdAt: new Date().toISOString(),
    });
    saveState();
  }
}

function generateId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

// Vercel uses MongoDB, because its application files cannot store runtime data.
if (!process.env.VERCEL && !process.env.SUPABASE_URL) {
  loadState();
  ensureDefaultAdmin();
}

module.exports = {
  state,
  saveState,
  getUsers: () => state.users,
  getContacts: () => state.contacts,
  getEducation: () => state.education,
  getProjects: () => state.projects,
  findUserByEmail: (email) => state.users.find((user) => user.email.toLowerCase() === String(email).toLowerCase()),
  findUserById: (id) => state.users.find((user) => user.id === id),
  createUser: (user) => {
    const newUser = {
      ...user,
      id: user.id || generateId('user'),
      createdAt: new Date().toISOString(),
    };
    state.users.push(newUser);
    saveState();
    return newUser;
  },
  createContact: (contact) => {
    const newContact = {
      ...contact,
      id: contact.id || generateId('contact'),
      createdAt: new Date().toISOString(),
    };
    state.contacts.unshift(newContact);
    saveState();
    return newContact;
  },
  updateContact: (id, updates) => {
    const index = state.contacts.findIndex((item) => item.id === id);
    if (index === -1) return null;
    state.contacts[index] = { ...state.contacts[index], ...updates };
    saveState();
    return state.contacts[index];
  },
  deleteContact: (id) => {
    const filtered = state.contacts.filter((item) => item.id !== id);
    const deleted = state.contacts.length !== filtered.length;
    state.contacts = filtered;
    if (deleted) saveState();
    return deleted;
  },
  createEducation: (item) => {
    const newItem = { ...item, id: item.id || generateId('education') };
    state.education.unshift(newItem);
    saveState();
    return newItem;
  },
  updateEducation: (id, updates) => {
    const index = state.education.findIndex((item) => item.id === id);
    if (index === -1) return null;
    state.education[index] = { ...state.education[index], ...updates };
    saveState();
    return state.education[index];
  },
  deleteEducation: (id) => {
    const filtered = state.education.filter((item) => item.id !== id);
    const deleted = state.education.length !== filtered.length;
    state.education = filtered;
    if (deleted) saveState();
    return deleted;
  },
  createProject: (item) => {
    const newItem = { ...item, id: item.id || generateId('project') };
    state.projects.unshift(newItem);
    saveState();
    return newItem;
  },
  updateProject: (id, updates) => {
    const index = state.projects.findIndex((item) => item.id === id);
    if (index === -1) return null;
    state.projects[index] = { ...state.projects[index], ...updates };
    saveState();
    return state.projects[index];
  },
  deleteProject: (id) => {
    const filtered = state.projects.filter((item) => item.id !== id);
    const deleted = state.projects.length !== filtered.length;
    state.projects = filtered;
    if (deleted) saveState();
    return deleted;
  },
};
