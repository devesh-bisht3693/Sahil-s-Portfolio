import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedCarousel } from './components/FeaturedCarousel';
import { CampaignSection } from './components/CampaignSection';
import { SocialMediaSection } from './components/SocialMediaSection';
import { InfographicsSection } from './components/InfographicsSection';
import { CoBrandedSection } from './components/CoBrandedSection';
import { DisplayAdsSection } from './components/DisplayAdsSection';
import { EditorialSection } from './components/EditorialSection';
import { MotionSection } from './components/MotionSection';
import { YouTubeSection } from './components/YouTubeSection';
import { BrandingSection } from './components/BrandingSection';
import { MiscSection } from './components/MiscSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors">
      <Navbar />
      <main>
        <Hero />
        <FeaturedCarousel />
        <CampaignSection />
        <InfographicsSection />
        <CoBrandedSection />
        <DisplayAdsSection />
        <EditorialSection />
        <SocialMediaSection />
        <MotionSection />
        <YouTubeSection />
        <BrandingSection />
        <MiscSection />
        <AboutSection />
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
