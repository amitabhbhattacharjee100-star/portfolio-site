import { services } from '../data/portfolioData.js';
import './Services.css';

function Services() {
  return (
    <div className="section">
      <span className="eyebrow">What I Offer</span>
      <h1 className="section-heading">Services</h1>
      <p className="section-subheading">
        A short list of the ways I can help — from building interfaces to prototyping AI-powered
        automation.
      </p>

      <div className="services-grid">
        {services.map((service) => (
          <div key={service.id} className="service-card card">
            <span className="service-icon" aria-hidden="true">
              {service.icon}
            </span>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
