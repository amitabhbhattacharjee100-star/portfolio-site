import { projects } from '../data/portfolioData.js';
import './Projects.css';

function Projects() {
  return (
    <div className="section">
      <span className="eyebrow">My Work</span>
      <h1 className="section-heading">Projects</h1>
      <p className="section-subheading">
        A selection of projects that show how I combine web development, software engineering, and
        applied AI.
      </p>

      <div className="project-grid">
        {projects.map((project) => (
          <article key={project.id} className="project-card card">
            <div className="project-image" style={{ background: `linear-gradient(135deg, ${project.accent}, #201a2e)` }}>
              <span>{project.title.slice(0, 2).toUpperCase()}</span>
            </div>
            <div className="project-body">
              <h2>{project.title}</h2>
              <p className="project-role">{project.role}</p>
              <p>{project.description}</p>
              <p className="project-outcome">
                <strong>Outcome:</strong> {project.outcome}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Projects;
