import { Download, Github, Linkedin, Mail, MapPin } from '../components/Icons';
import { personalInfo } from '../portfolioData.mjs';

export default function About() {
  return (
    <section className="page-section">
      <div className="container">
        <div className="page-heading">
          <p className="eyebrow">ABOUT ME</p>
          <h1>Amitabh Bhattacharjee</h1>
          <p>A student developer interested in software engineering, artificial intelligence, web development, entrepreneurship, and technology innovation.</p>
        </div>
        <div className="about-grid">
          <div className="profile-panel">
            <img className="profile-large" src="/profile.jpg" alt="Amitabh Bhattacharjee" />
            
          </div>
          <div className="content-card">
            <h2>Who I Am</h2>
            <p>
              {personalInfo.summary}
            </p>
            <p>
              {personalInfo.secondarySummary}
            </p>
            <div className="contact-list">
              <span><MapPin size={17}/> Scarborough, Ontario, Canada</span>
              <a href="mailto:amitabhbhattacharjee100@gmail.com"><Mail size={17}/> Email me</a>
              <a href="https://github.com/amitabhbhattacharjee100-star" target="_blank" rel="noreferrer"><Github size={17}/> GitHub</a>
              <a href="https://linkedin.com/in/amitabh-bhattacharjee-6541b33b7" target="_blank" rel="noreferrer"><Linkedin size={17}/> LinkedIn</a>
            </div>
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn btn-primary"><Download size={18}/> View Resume (PDF)</a>
          </div>
        </div>
      </div>
    </section>
  );
}

