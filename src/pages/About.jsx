import profilePhoto from '../assets/profile.jpg';
import { personalInfo } from '../data/portfolioData.js';
import './About.css';

function About() {
  return (
    <div className="section about-page">
      <span className="eyebrow">About Me</span>
      <h1 className="section-heading">{personalInfo.fullName}</h1>

      <div className="about-grid">
        <img
          src={profilePhoto}
          alt={`Head and shoulders portrait of ${personalInfo.fullName}`}
          className="about-photo"
        />

        <div className="about-copy">
          <p>{personalInfo.summary}</p>
          <p>
            Based in {personalInfo.location}, I balance full-time studies with hands-on projects,
            student leadership, and a genuine curiosity for how AI and automation can solve
            everyday problems.
          </p>

          <a href={personalInfo.resumeUrl} target="_blank" rel="noreferrer" className="btn btn-primary resume-link">
            📄 View My Resume (PDF)
          </a>
        </div>
      </div>
    </div>
  );
}

export default About;
