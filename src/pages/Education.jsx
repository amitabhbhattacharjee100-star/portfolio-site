import { certifications, education } from '../data/portfolioData.js';
import './Education.css';

function Education() {
  return (
    <div className="section">
      <span className="eyebrow">Background</span>
      <h1 className="section-heading">Education</h1>
      <p className="section-subheading">
        My academic qualifications, coursework, and the certifications that complement my
        classroom learning.
      </p>

      <div className="timeline">
        {education.map((entry) => (
          <div key={entry.id} className="timeline-item card">
            <div className="timeline-header">
              <h2>{entry.school}</h2>
              <span className="timeline-dates">{entry.dates}</span>
            </div>
            <p className="timeline-credential">{entry.credential}</p>
            <p className="timeline-location">{entry.location}</p>
            <ul className="timeline-details">
              {entry.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="cert-panel card">
        <h2>Certifications &amp; Activities</h2>
        <ul>
          {certifications.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Education;
