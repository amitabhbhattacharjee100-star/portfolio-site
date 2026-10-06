const Link = ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>;
import { ArrowRight, BrainCircuit, Code2, Rocket } from '../components/Icons';

export default function Home() {
  return (
    <section className="hero-section page-section">
      <div className="container hero-grid">
        <div>
          <p className="eyebrow">SOFTWARE ENGINEERING • ARTIFICIAL INTELLIGENCE</p>
          <h1>Hi, I’m <span>Amitabh Bhattacharjee.</span></h1>
          <p className="hero-copy">
            I am a Software Engineering – Artificial Intelligence student at Centennial College who enjoys building clean web experiences, software solutions, and practical AI-powered projects.
          </p>
          <div className="hero-actions">
            <Link to="/projects" className="btn btn-primary">View My Projects <ArrowRight size={18} /></Link>
            <Link to="/about" className="btn btn-secondary">About Me</Link>
          </div>
        </div>
        <div className="hero-card" aria-label="Mission statement">
          <img className="profile-placeholder" src="/profile.jpg" alt="Amitabh Bhattacharjee" />
          <h2>Mission Statement</h2>
          <p>
            My goal is to combine software engineering, AI, and creative problem solving to build useful products that make technology easier and more productive for people and businesses.
          </p>
        </div>
      </div>
      <div className="container feature-grid">
        <article className="feature-card"><Code2 /><h3>Web Development</h3><p>Responsive front-end experiences using HTML, CSS, JavaScript, and React.</p></article>
        <article className="feature-card"><BrainCircuit /><h3>AI & Automation</h3><p>Exploring AI agents, machine learning fundamentals, and workflow automation.</p></article>
        <article className="feature-card"><Rocket /><h3>Rapid Prototyping</h3><p>Turning ideas into practical software prototypes with a focus on usability.</p></article>
      </div>
    </section>
  );
}

