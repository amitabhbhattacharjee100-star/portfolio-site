import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { personalInfo } from '../data/portfolioData.js';
import './Contact.css';

const initialForm = {
  firstName: '',
  lastName: '',
  contactNumber: '',
  email: '',
  message: '',
};

function Contact() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialForm);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormValues((previous) => ({ ...previous, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    // Captures the message locally; a real backend endpoint can replace this later.
    navigate('/', {
      state: {
        submittedName: `${formValues.firstName} ${formValues.lastName}`.trim(),
      },
    });
  }

  return (
    <div className="section contact-page">
      <span className="eyebrow">Get In Touch</span>
      <h1 className="section-heading">Contact Me</h1>
      <p className="section-subheading">
        Have a project, question, or opportunity in mind? Send a message below or reach out
        directly.
      </p>

      <div className="contact-grid">
        <aside className="contact-panel card">
          <h2>Contact Details</h2>
          <ul>
            <li>
              <strong>Email:</strong> <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
            </li>
            <li>
              <strong>Location:</strong> {personalInfo.location}
            </li>
            <li>
              <strong>LinkedIn:</strong>{' '}
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer">
                {personalInfo.linkedin.replace('https://', '')}
              </a>
            </li>
            <li>
              <strong>GitHub:</strong>{' '}
              <a href={personalInfo.github} target="_blank" rel="noreferrer">
                {personalInfo.github.replace('https://', '')}
              </a>
            </li>
            <li>
              <strong>Portfolio:</strong>{' '}
              <a href="/">This site</a>
            </li>
          </ul>
        </aside>

        <form className="contact-form card" onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="firstName">
              First Name
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                value={formValues.firstName}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="lastName">
              Last Name
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                value={formValues.lastName}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="form-row">
            <label htmlFor="contactNumber">
              Contact Number
              <input
                id="contactNumber"
                name="contactNumber"
                type="tel"
                required
                value={formValues.contactNumber}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="email">
              Email Address
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formValues.email}
                onChange={handleChange}
              />
            </label>
          </div>

          <label htmlFor="message" className="message-label">
            Message
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              value={formValues.message}
              onChange={handleChange}
            />
          </label>

          <button type="submit" className="btn btn-primary">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
