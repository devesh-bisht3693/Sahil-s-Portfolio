import { Navbar } from './components/Navbar.jsx';
import { Hero } from './components/Hero.jsx';
// import { WorkSection } from './components/WorkSection.jsx';
import { AboutSection } from './components/AboutSection.jsx';
import { ProjectsGallery } from './components/ProjectsGallery.jsx';
import { ServicesSection } from './components/ServicesSection.jsx';
import { ContactSection } from './components/ContactSection.jsx';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Navbar />
      <main>
        <Hero />
        {/* <WorkSection /> */}
        <ProjectsGallery />
        <AboutSection />
        <ServicesSection />
        <ContactSection />
      </main>
    </div>
  );
}

export default App;


