import { personalInfo } from '../data/portfolioData.js';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <p>
        © {year} {personalInfo.fullName}. Built with React for COMP229 — Web Application Development.
      </p>
      <div className="footer-links">
        <a href={personalInfo.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href={personalInfo.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href={`mailto:${personalInfo.email}`}>Email</a>
      </div>
    </footer>
  );
}

export default Footer;
