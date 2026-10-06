import { useEffect, useState } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import { personalInfo, skills, experience, certifications } from './portfolioData.mjs';
import initialPortfolio from '../server/data/profile-seed.json';
import './portfolio.css';
import './integration.css';

const emptyEducation = {
  school: '',
  degree: '',
  field: '',
  startDate: '',
  endDate: '',
  description: '',
};

const emptyProject = {
  title: '',
  description: '',
  technologies: '',
  link: '',
};

const emptyForm = {
  name: '',
  email: '',
  password: '',
};

function App() {
  const page = window.location.pathname.replace(/\/$/, '') || '/';
  const [authMode, setAuthMode] = useState('signin');
  const [authForm, setAuthForm] = useState(emptyForm);
  const [token, setToken] = useState(localStorage.getItem('portfolio-token') || '');
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('portfolio-user');
    try { return storedUser ? JSON.parse(storedUser) : null; } catch { return null; }
  });
  const [portfolio, setPortfolio] = useState({
    contacts: [],
    education: initialPortfolio.education.map((item, index) => ({ ...item, id: `initial-education-${index}` })),
    projects: initialPortfolio.projects.map((item, index) => ({ ...item, id: `initial-project-${index}` })),
  });
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [educationForm, setEducationForm] = useState(emptyEducation);
  const [projectForm, setProjectForm] = useState(emptyProject);
  const [editingEducationId, setEditingEducationId] = useState(null);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editingContactId, setEditingContactId] = useState(null);
  const [message, setMessage] = useState('');

  const fetchPortfolio = async () => {
    try {
      const response = await fetch('/api/portfolio', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!response.ok) throw new Error('Unable to load saved portfolio changes.');
      const data = await response.json();
      setPortfolio({
        contacts: data.contacts || [],
        education: data.education || [],
        projects: data.projects || [],
      });
    } catch (error) {
      console.error('Failed to load portfolio data', error);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, [token]);

  useEffect(() => {
    if (!token) return;
    fetch('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => { if (!response.ok) throw new Error('Session expired'); return response.json(); })
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          localStorage.setItem('portfolio-user', JSON.stringify(data.user));
        }
      })
      .catch(() => {
        localStorage.removeItem('portfolio-token');
        localStorage.removeItem('portfolio-user');
        setToken('');
        setUser(null);
      });
  }, [token]);

  const updateUserSession = (sessionUser, sessionToken) => {
    setUser(sessionUser);
    setToken(sessionToken);
    localStorage.setItem('portfolio-user', JSON.stringify(sessionUser));
    localStorage.setItem('portfolio-token', sessionToken);
  };

  const handleAuthSubmit = async (event) => {
    event.preventDefault();
    const endpoint = authMode === 'signup' ? '/api/auth/signup' : '/api/auth/signin';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authForm),
      });

      const data = await response.json();
      if (!response.ok) {
        setMessage(data.message || 'Authentication failed.');
        return;
      }

      if (data.confirmationRequired) {
        setAuthForm(emptyForm);
        setAuthMode('signin');
        setMessage(data.message);
        return;
      }
      updateUserSession(data.user, data.token);
      setAuthForm(emptyForm);
      setMessage(authMode === 'signup' ? 'Account created successfully.' : 'Signed in successfully.');
      fetchPortfolio();
    } catch (error) {
      setMessage('Unable to complete authentication.');
    }
  };

  const handleSignout = async () => {
    try {
      await fetch('/api/auth/signout', { headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
      console.error('signout error', error);
    }

    localStorage.removeItem('portfolio-token');
    localStorage.removeItem('portfolio-user');
    setToken('');
    setUser(null);
    setEditingContactId(null);
    setEditingEducationId(null);
    setEditingProjectId(null);
    setContactForm({ name: '', email: '', message: '' });
    setEducationForm(emptyEducation);
    setProjectForm(emptyProject);
    setMessage('You have signed out.');
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(editingContactId ? `/api/contacts/${editingContactId}` : '/api/contacts', {
        method: editingContactId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(contactForm),
      });
      const data = await response.json();
      if (!response.ok) {
        setMessage(data.message || 'Contact form failed.');
        return;
      }
      setContactForm({ name: '', email: '', message: '' });
      setEditingContactId(null);
      setMessage('Your message was submitted successfully.');
      fetchPortfolio();
    } catch (error) {
      setMessage('Unable to submit the contact form.');
    }
  };

  const handleEducationSubmit = async (event) => {
    event.preventDefault();
    if (!user || user.role !== 'admin') {
      setMessage('Only the admin can create or update education entries.');
      return;
    }

    const method = editingEducationId ? 'PUT' : 'POST';
    const endpoint = editingEducationId
      ? `/api/education/${editingEducationId}`
      : '/api/education';

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(educationForm),
      });
      const data = await response.json();
      if (!response.ok) {
        setMessage(data.message || 'Education save failed.');
        return;
      }
      setEducationForm(emptyEducation);
      setEditingEducationId(null);
      setMessage('Education record saved.');
      fetchPortfolio();
    } catch (error) {
      setMessage('Unable to save education record.');
    }
  };

  const handleProjectSubmit = async (event) => {
    event.preventDefault();
    if (!user || user.role !== 'admin') {
      setMessage('Only the admin can create or update project entries.');
      return;
    }

    const method = editingProjectId ? 'PUT' : 'POST';
    const endpoint = editingProjectId ? `/api/projects/${editingProjectId}` : '/api/projects';

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...projectForm,
          technologies: projectForm.technologies
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean),
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setMessage(data.message || 'Project save failed.');
        return;
      }
      setProjectForm(emptyProject);
      setEditingProjectId(null);
      setMessage('Project saved successfully.');
      fetchPortfolio();
    } catch (error) {
      setMessage('Unable to save project.');
    }
  };

  const startEditEducation = (entry) => {
    setEducationForm({
      school: entry.school || '',
      degree: entry.degree || '',
      field: entry.field || '',
      startDate: entry.startDate || '',
      endDate: entry.endDate || '',
      description: entry.description || '',
    });
    setEditingEducationId(entry.id);
  };

  const startEditProject = (entry) => {
    setProjectForm({
      title: entry.title || '',
      description: entry.description || '',
      technologies: Array.isArray(entry.technologies) ? entry.technologies.join(', ') : '',
      link: entry.link || '',
    });
    setEditingProjectId(entry.id);
  };

  const deleteEducationItem = async (id) => {
    if (!user || user.role !== 'admin') return;
    try {
      const response = await fetch(`/api/education/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        const data = await response.json();
        setMessage(data.message || 'Unable to delete education item.');
        return;
      }
      setMessage('Education record removed.');
      fetchPortfolio();
    } catch (error) {
      setMessage('Unable to delete education item.');
    }
  };

  const deleteProjectItem = async (id) => {
    if (!user || user.role !== 'admin') return;
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        const data = await response.json();
        setMessage(data.message || 'Unable to delete project.');
        return;
      }
      setMessage('Project removed.');
      fetchPortfolio();
    } catch (error) {
      setMessage('Unable to delete project.');
    }
  };

  const isAdmin = user && user.role === 'admin';

  const deleteContactItem = async (id) => {
    try {
      const response = await fetch(`/api/contacts/${id}`, {
        method: 'DELETE', headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setMessage('Contact removed.');
      await fetchPortfolio();
    } catch (error) { setMessage(error.message || 'Unable to delete contact.'); }
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">COMP229</p>
          <h1>Amitabh Bhattacharjee</h1>
        </div>
        <div className="user-panel">
          {user ? (
            <>
              <span>Welcome, {user.name}</span>
              <span className="badge">{user.role}</span>
              <button type="button" onClick={handleSignout}>Sign Out</button>
            </>
          ) : (
            <a className="btn btn-primary" href="/signin">Sign In</a>
          )}
        </div>
      </header>
      <nav className="nav-links" aria-label="Primary navigation">
        {Object.entries({ '/': 'Home', '/about': 'About Me', '/projects': 'Projects', '/education': 'Education', '/services': 'Services', '/contact': 'Contact Me', '/signin': 'Account' }).map(([path, label]) => <a key={path} href={path} className={`nav-link ${page === path ? 'active' : ''}`}>{label}</a>)}
      </nav>

      {message && <div className="flash-message">{message}</div>}

      {!user && page === '/signin' && (
        <section className="auth-card">
          <div className="toggle-row">
            <button type="button" className={authMode === 'signin' ? 'active' : ''} onClick={() => setAuthMode('signin')}>
              Sign In
            </button>
            <button type="button" className={authMode === 'signup' ? 'active' : ''} onClick={() => setAuthMode('signup')}>
              Sign Up
            </button>
          </div>

          <form onSubmit={handleAuthSubmit} className="auth-form">
            {authMode === 'signup' && (
              <label>
                Name
                <input
                  type="text"
                  value={authForm.name}
                  onChange={(event) => setAuthForm({ ...authForm, name: event.target.value })}
                placeholder="Your full name"
                required
                />
              </label>
            )}
            <label>
              Email
              <input
                type="email"
                value={authForm.email}
                onChange={(event) => setAuthForm({ ...authForm, email: event.target.value })}
                placeholder="user@example.com"
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={authForm.password}
                onChange={(event) => setAuthForm({ ...authForm, password: event.target.value })}
                placeholder="Password"
                required
                minLength={authMode === 'signup' ? 8 : undefined}
              />
            </label>
            <button type="submit">{authMode === 'signin' ? 'Login' : 'Create Account'}</button>
          </form>

        </section>
      )}
      {page === '/' && <Home />}
      {page === '/about' && <><About /><section className="panel"><h2>Skills</h2><div className="tags">{skills.map(skill => <span className="tag" key={skill}>{skill}</span>)}</div><h2>Experience</h2>{experience.map(item => <article key={item.id}><h3>{item.role}</h3><p>{item.organization}</p><ul>{item.bullets.map(text => <li key={text}>{text}</li>)}</ul></article>)}</section></>}
      {page === '/services' && <Services />}
      {page === '/signin' && user && <section className="panel"><h2>Signed in as {user.name}</h2><p>{isAdmin ? 'Use Projects, Education, and Contact Me to manage your portfolio.' : 'You can view the portfolio and send a contact message.'}</p></section>}

      <main className="content-grid">
        {page === '/contact' && <section className="panel">
          <h2>Contact Form</h2>
          <p><a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a> · {personalInfo.location}</p>
          {!user && <p>Sign in to send a message.</p>}
          <form onSubmit={handleContactSubmit} className="stacked-form">
            <label>
              Name
              <input
                type="text"
                value={contactForm.name}
                onChange={(event) => setContactForm({ ...contactForm, name: event.target.value })}
              />
            </label>
            <label>
              Email
              <input
                type="email"
                value={contactForm.email}
                onChange={(event) => setContactForm({ ...contactForm, email: event.target.value })}
              />
            </label>
            <label>
              Message
              <textarea
                rows="4"
                value={contactForm.message}
                onChange={(event) => setContactForm({ ...contactForm, message: event.target.value })}
              />
            </label>
            <button type="submit" disabled={!user}>{editingContactId ? 'Update Contact' : 'Send Message'}</button>
          </form>
        </section>}

        {page === '/education' && <section className="panel">
          <h2>Education</h2>
          {isAdmin && (
            <form onSubmit={handleEducationSubmit} className="stacked-form">
              <label>
                School
                <input
                  type="text"
                  value={educationForm.school}
                  onChange={(event) => setEducationForm({ ...educationForm, school: event.target.value })}
                />
              </label>
              <label>
                Degree
                <input
                  type="text"
                  value={educationForm.degree}
                  onChange={(event) => setEducationForm({ ...educationForm, degree: event.target.value })}
                />
              </label>
              <label>
                Field
                <input
                  type="text"
                  value={educationForm.field}
                  onChange={(event) => setEducationForm({ ...educationForm, field: event.target.value })}
                />
              </label>
              <div className="inline-fields">
                <label>
                  Start Date
                  <input
                    type="date"
                    value={educationForm.startDate}
                    onChange={(event) => setEducationForm({ ...educationForm, startDate: event.target.value })}
                  />
                </label>
                <label>
                  End Date
                  <input
                    type="date"
                    value={educationForm.endDate}
                    onChange={(event) => setEducationForm({ ...educationForm, endDate: event.target.value })}
                  />
                </label>
              </div>
              <label>
                Description
                <textarea
                  rows="3"
                  value={educationForm.description}
                  onChange={(event) => setEducationForm({ ...educationForm, description: event.target.value })}
                />
              </label>
              <button type="submit">{editingEducationId ? 'Update Education' : 'Add Education'}</button>
            </form>
          )}

          <div className="list">
            {portfolio.education.map((item) => (
              <article key={item.id} className="list-card">
                <h3>{item.school}</h3>
                <p>{item.degree} - {item.field}</p>
                {item.startDate && <small>{item.startDate} to {item.endDate || 'Present'}</small>}
                <p>{item.description}</p>
                {isAdmin && (
                  <div className="list-actions">
                    <button type="button" onClick={() => startEditEducation(item)}>Edit</button>
                    <button type="button" className="danger" onClick={() => deleteEducationItem(item.id)}>Delete</button>
                  </div>
                )}
              </article>
            ))}
          </div>
          <h2>Certifications</h2><ul>{certifications.map(text => <li key={text}>{text}</li>)}</ul>
        </section>}

        {page === '/projects' && <section className="panel">
          <h2>Projects</h2>
          {isAdmin && (
            <form onSubmit={handleProjectSubmit} className="stacked-form">
              <label>
                Title
                <input
                  type="text"
                  value={projectForm.title}
                  onChange={(event) => setProjectForm({ ...projectForm, title: event.target.value })}
                />
              </label>
              <label>
                Description
                <textarea
                  rows="3"
                  value={projectForm.description}
                  onChange={(event) => setProjectForm({ ...projectForm, description: event.target.value })}
                />
              </label>
              <label>
                Technologies
                <input
                  type="text"
                  value={projectForm.technologies}
                  onChange={(event) => setProjectForm({ ...projectForm, technologies: event.target.value })}
                  placeholder="React, Express, MongoDB"
                />
              </label>
              <label>
                Link
                <input
                  type="url"
                  value={projectForm.link}
                  onChange={(event) => setProjectForm({ ...projectForm, link: event.target.value })}
                  placeholder="https://example.com"
                />
              </label>
              <button type="submit">{editingProjectId ? 'Update Project' : 'Add Project'}</button>
            </form>
          )}

          <div className="list">
            {portfolio.projects.map((item) => (
              <article key={item.id} className="list-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="tags">
                  {(item.technologies || []).map((tech) => (
                    <span key={tech} className="tag">{tech}</span>
                  ))}
                </div>
                {item.link && (
                  <a href={item.link} target="_blank" rel="noreferrer">Visit project</a>
                )}
                {isAdmin && (
                  <div className="list-actions">
                    <button type="button" onClick={() => startEditProject(item)}>Edit</button>
                    <button type="button" className="danger" onClick={() => deleteProjectItem(item.id)}>Delete</button>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>}

        {page === '/contact' && user && <section className="panel">
          <h2>Contact Messages</h2>
          <div className="list">
            {portfolio.contacts.map((item) => (
              <article key={item.id} className="list-card">
                <h3>{item.name}</h3>
                <p>{item.email}</p>
                <p>{item.message}</p>
                {isAdmin && <div className="list-actions">
                  <button type="button" onClick={() => {
                    setContactForm({ name: item.name, email: item.email, message: item.message });
                    setEditingContactId(item.id);
                  }}>Edit</button>
                  <button type="button" className="danger" onClick={() => deleteContactItem(item.id)}>Delete</button>
                </div>}
              </article>
            ))}
          </div>
        </section>}
      </main>
      <footer className="footer"><div className="footer-inner"><p>© {new Date().getFullYear()} Amitabh Bhattacharjee</p><a href="https://github.com/amitabhbhattacharjee100-star" target="_blank" rel="noreferrer">GitHub</a></div></footer>
    </div>
  );
}

export default App;

