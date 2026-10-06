const local = require('./store');
const { isConfigured, supabaseRequest } = require('../config/supabase');

const fields = {
  contacts: ['name', 'email', 'message'],
  education: ['school', 'degree', 'field', 'startDate', 'endDate', 'description'],
  projects: ['title', 'description', 'technologies', 'link'],
};

function cleanData(resource, data) {
  const cleaned = {};
  for (const field of fields[resource]) {
    if (data[field] !== undefined) cleaned[field] = data[field];
  }
  return cleaned;
}

async function getRecords(resource, localGetter, token) {
  if (!isConfigured()) return localGetter();
  return supabaseRequest(`/rest/v1/assignment3_${resource}?select=*&order=createdAt.desc`, 'GET', null, token);
}

async function createRecord(resource, localCreate, data, token, ownerId) {
  const cleaned = cleanData(resource, data);
  if (!isConfigured()) return localCreate(cleaned);
  if (resource === 'contacts') cleaned.owner_id = ownerId;
  const records = await supabaseRequest(`/rest/v1/assignment3_${resource}`, 'POST', cleaned, token);
  return records[0];
}

async function updateRecord(resource, localUpdate, id, data, token) {
  const cleaned = cleanData(resource, data);
  if (!isConfigured()) return localUpdate(id, cleaned);
  const records = await supabaseRequest(`/rest/v1/assignment3_${resource}?id=eq.${encodeURIComponent(id)}`, 'PATCH', cleaned, token);
  return records[0] || null;
}

async function deleteRecord(resource, localDelete, id, token) {
  if (!isConfigured()) return localDelete(id);
  const records = await supabaseRequest(`/rest/v1/assignment3_${resource}?id=eq.${encodeURIComponent(id)}`, 'DELETE', null, token);
  return records.length > 0;
}

module.exports = {
  findUserByEmail: local.findUserByEmail,
  findUserById: local.findUserById,
  createUser: local.createUser,
  getUsers: local.getUsers,
  getContacts: (token) => getRecords('contacts', local.getContacts, token),
  createContact: (data, token, ownerId) => createRecord('contacts', local.createContact, data, token, ownerId),
  updateContact: (id, data, token) => updateRecord('contacts', local.updateContact, id, data, token),
  deleteContact: (id, token) => deleteRecord('contacts', local.deleteContact, id, token),
  getEducation: (token) => getRecords('education', local.getEducation, token),
  createEducation: (data, token) => createRecord('education', local.createEducation, data, token),
  updateEducation: (id, data, token) => updateRecord('education', local.updateEducation, id, data, token),
  deleteEducation: (id, token) => deleteRecord('education', local.deleteEducation, id, token),
  getProjects: (token) => getRecords('projects', local.getProjects, token),
  createProject: (data, token) => createRecord('projects', local.createProject, data, token),
  updateProject: (id, data, token) => updateRecord('projects', local.updateProject, id, data, token),
  deleteProject: (id, token) => deleteRecord('projects', local.deleteProject, id, token),
};
