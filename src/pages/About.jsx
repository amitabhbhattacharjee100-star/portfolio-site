import profilePhoto from '../assets/profile.jpg';
import { experience, openToRoles, personalInfo, skills } from '../data/portfolioData.js';
import './About.css';

function About() {
  return (
    <div className="section about-page">
      <span className="eyebrow">About Me</span>
      <h1 className="section-heading">{personalInfo.fullName}</h1>
      <p className="about-headline">{personalInfo.headline}</p>

      <div className="about-grid">
        <img
          src={profilePhoto}
          alt={`Head and shoulders portrait of ${personalInfo.fullName}`}
          className="about-photo"
        />

        <div className="about-copy">
          <p>{personalInfo.summary}</p>
          <p>{personalInfo.secondarySummary}</p>

          <a href={personalInfo.resumeUrl} target="_blank" rel="noreferrer" className="btn btn-primary resume-link">
            📄 View My Resume (PDF)
          </a>
        </div>
      </div>

      <div className="about-subsection">
        <h2>Experience</h2>
        <div className="experience-list">
          {experience.map((job) => (
            <div key={job.id} className="experience-card card">
              <div className="experience-header">
                <h3>{job.role}</h3>
                <span className="experience-dates">{job.dates}</span>
              </div>
              <p className="experience-org">{job.organization}</p>
              <ul>
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="about-subsection">
        <h2>Skills</h2>
        <div className="pill-group">
          {skills.map((skill) => (
            <span key={skill} className="pill">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="about-subsection">
        <h2>Open to Opportunities</h2>
        <div className="pill-group">
          {openToRoles.map((role) => (
            <span key={role} className="pill pill-outline">
              {role}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
