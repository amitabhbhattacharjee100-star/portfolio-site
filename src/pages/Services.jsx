import { Bot, Code2, Laptop, Wrench } from '../components/Icons';

const services = [
  { icon: Laptop, title: 'Front-End Web Development', text: 'Responsive websites and interfaces using HTML, CSS, JavaScript, and React.' },
  { icon: Code2, title: 'General Programming', text: 'Programming support and small software projects using C#, .NET, Python, and JavaScript.' },
  { icon: Bot, title: 'AI & Automation Prototyping', text: 'Exploring AI-powered workflows, agent concepts, automation solutions, and rapid prototypes.' },
  { icon: Wrench, title: 'Debugging & Technical Support', text: 'Finding software issues, improving code structure, and supporting basic development workflows.' }
];

export default function Services() {
  return (
    <section className="page-section">
      <div className="container">
        <div className="page-heading"><p className="eyebrow">WHAT I CAN DO</p><h1>Services</h1><p>Technical services I can offer while continuing to grow as a software engineering student.</p></div>
        <div className="service-grid">
          {services.map(({ icon: Icon, title, text }) => <article className="service-card" key={title}><div className="service-icon"><Icon /></div><h2>{title}</h2><p>{text}</p></article>)}
        </div>
      </div>
    </section>
  );
}

