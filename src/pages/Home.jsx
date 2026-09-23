import { Link, useLocation } from 'react-router-dom';
import { personalInfo, projects } from '../data/portfolioData.js';
import './Home.css';

function Home() {
  const featuredProjects = projects.slice(0, 2);
  const location = useLocation();
  const submittedName = location.state?.submittedName;

  return (
    <div className="home-page">
      <section className="hero section">
        {submittedName && (
          <div className="success-banner" role="status">
            Thanks{submittedName ? `, ${submittedName}` : ''}! Your message was received — I&rsquo;ll get back to you soon.
          </div>
        )}
        <span className="eyebrow">Welcome</span>
        <h1 className="hero-title">
          Hi, I&rsquo;m {personalInfo.fullName.split(' ')[0]} — I design and build software with purpose.
        </h1>
        <p className="hero-lead">{personalInfo.summary}</p>

        <div className="hero-actions">
          <Link to="/about" className="btn btn-primary">
            Meet Me →
          </Link>
          <Link to="/projects" className="btn btn-outline">
            See My Work
          </Link>
        </div>

        <div className="mission-card card">
          <h2>Mission Statement</h2>
          <p>{personalInfo.missionStatement}</p>
        </div>
      </section>

      <section className="section highlights">
        <h2 className="section-heading">A quick highlight reel</h2>
        <p className="section-subheading">
          A snapshot of recent work — visit the Projects page for the full story.
        </p>
        <div className="highlight-grid">
          {featuredProjects.map((project) => (
            <div key={project.id} className="highlight-card card" style={{ borderTopColor: project.accent }}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <Link to="/projects" className="highlight-link">
                Read more →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
