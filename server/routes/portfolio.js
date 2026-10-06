const express = require('express');
const { authenticateToken, optionalAuthentication, requireAdmin } = require('../middleware/auth');
const {
  getContacts,
  getEducation,
  getProjects,
  createContact,
  updateContact,
  deleteContact,
  createEducation,
  updateEducation,
  deleteEducation,
  createProject,
  updateProject,
  deleteProject,
} = require('../data/repository');

const router = express.Router();

router.get('/portfolio', optionalAuthentication, async (req, res) => {
  res.json({
    contacts: req.user ? await getContacts(req.accessToken) : [],
    education: await getEducation(),
    projects: await getProjects(),
  });
});

router.get('/contacts', authenticateToken, async (req, res) => {
  res.json(await getContacts(req.accessToken));
});

router.post('/contacts', authenticateToken, async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email and message are required.' });
  }

  const item = await createContact({ name, email, message }, req.accessToken, req.user.id);
  return res.status(201).json(item);
});

router.put('/contacts/:id', authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;
  const item = await updateContact(id, req.body, req.accessToken);

  if (!item) {
    return res.status(404).json({ message: 'Contact not found.' });
  }

  return res.json(item);
});

router.delete('/contacts/:id', authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;
  const deleted = await deleteContact(id, req.accessToken);

  if (!deleted) {
    return res.status(404).json({ message: 'Contact not found.' });
  }

  return res.json({ message: 'Contact deleted successfully.' });
});

router.get('/education', async (req, res) => {
  res.json(await getEducation());
});

router.post('/education', authenticateToken, requireAdmin, async (req, res) => {
  const { school, degree, field, startDate, endDate, description } = req.body;

  if (!school || !degree || !field || !startDate) {
    return res.status(400).json({ message: 'School, degree, field and start date are required.' });
  }

  const item = await createEducation({ school, degree, field, startDate, endDate, description }, req.accessToken);
  return res.status(201).json(item);
});

router.put('/education/:id', authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;
  const item = await updateEducation(id, req.body, req.accessToken);

  if (!item) {
    return res.status(404).json({ message: 'Education item not found.' });
  }

  return res.json(item);
});

router.delete('/education/:id', authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;
  const deleted = await deleteEducation(id, req.accessToken);

  if (!deleted) {
    return res.status(404).json({ message: 'Education item not found.' });
  }

  return res.json({ message: 'Education item deleted successfully.' });
});

router.get('/projects', async (req, res) => {
  res.json(await getProjects());
});

router.post('/projects', authenticateToken, requireAdmin, async (req, res) => {
  const { title, description, technologies, link } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required.' });
  }

  const item = await createProject({ title, description, technologies: technologies || [], link }, req.accessToken);
  return res.status(201).json(item);
});

router.put('/projects/:id', authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;
  const item = await updateProject(id, req.body, req.accessToken);

  if (!item) {
    return res.status(404).json({ message: 'Project not found.' });
  }

  return res.json(item);
});

router.delete('/projects/:id', authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;
  const deleted = await deleteProject(id, req.accessToken);

  if (!deleted) {
    return res.status(404).json({ message: 'Project not found.' });
  }

  return res.json({ message: 'Project deleted successfully.' });
});

module.exports = router;

