import { useState } from 'react';
import { personalInfo } from '../data/portfolioData.js';
import './Contact.css';

const initialForm = { firstName: '', lastName: '', contactNumber: '', email: '', message: '' };

function Contact() {
  const [formValues, setFormValues] = useState(initialForm);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormValues((previous) => ({ ...previous, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ type: '', message: '' });
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'Your message could not be sent. Please try again later.');
      setStatus({ type: 'success', message: `Thanks, ${formValues.firstName.trim()}! Your message was sent successfully.` });
      setFormValues(initialForm);
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Unable to send your message. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="section contact-page">
      <span className="eyebrow">Get In Touch</span>
      <h1 className="section-heading">Contact Me</h1>
      <p className="section-subheading">
        Have a project, question, or opportunity in mind? Send a message below or reach out directly.
      </p>
      <div className="contact-grid">
        <aside className="contact-panel card">
          <h2>Contact Details</h2>
          <ul>
            <li><strong>Email:</strong> <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a></li>
            <li><strong>Location:</strong> {personalInfo.location}</li>
            <li><strong>LinkedIn:</strong> <a href={personalInfo.linkedin} target="_blank" rel="noreferrer">{personalInfo.linkedin.replace('https://', '')}</a></li>
            <li><strong>GitHub:</strong> <a href={personalInfo.github} target="_blank" rel="noreferrer">{personalInfo.github.replace('https://', '')}</a></li>
            <li><strong>Portfolio:</strong> <a href="/">This site</a></li>
          </ul>
        </aside>
        <form className="contact-form card" onSubmit={handleSubmit}>
          {status.message && <p className={`form-status ${status.type}`} role="status" aria-live="polite">{status.message}</p>}
          <div className="form-row">
            <label htmlFor="firstName">First Name
              <input id="firstName" name="firstName" type="text" autoComplete="given-name" maxLength="80" required value={formValues.firstName} onChange={handleChange} />
            </label>
            <label htmlFor="lastName">Last Name
              <input id="lastName" name="lastName" type="text" autoComplete="family-name" maxLength="80" required value={formValues.lastName} onChange={handleChange} />
            </label>
          </div>
          <div className="form-row">
            <label htmlFor="contactNumber">Contact Number
              <input id="contactNumber" name="contactNumber" type="tel" autoComplete="tel" maxLength="30" required value={formValues.contactNumber} onChange={handleChange} />
            </label>
            <label htmlFor="email">Email Address
              <input id="email" name="email" type="email" autoComplete="email" maxLength="254" required value={formValues.email} onChange={handleChange} />
            </label>
          </div>
          <label htmlFor="message" className="message-label">Message
            <textarea id="message" name="message" rows="5" maxLength="5000" required value={formValues.message} onChange={handleChange} />
          </label>
          <p className="form-privacy-note">Your message and contact details will be stored to help me respond to your request.</p>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>{isSubmitting ? 'Sending…' : 'Send Message'}</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
