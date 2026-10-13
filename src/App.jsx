import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import './App.css';

const Home = lazy(() => import('./pages/Home.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Projects = lazy(() => import('./pages/Projects.jsx'));
const Education = lazy(() => import('./pages/Education.jsx'));
const Services = lazy(() => import('./pages/Services.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">
        <Suspense fallback={<p className="section" role="status">Loading page…</p>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/education" element={<Education />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
