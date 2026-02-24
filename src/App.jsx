import { motion } from 'framer-motion';
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

        {/* ── Portfolio intro banner ── */}
        <section className="relative overflow-hidden border-b border-slate-200 dark:border-slate-800/80 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900/50 dark:to-slate-950 transition-colors">
          {/* Decorative glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-[40rem] rounded-full bg-cyan-500/[0.06] blur-[100px]" />
          </div>

          <div className="relative mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-24 text-center">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              className="space-y-4"
            >
              <p className="section-heading">
                Welcome to my portfolio
              </p>
              <div className="mx-auto h-px w-12 bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />
              <h2 className="text-xl font-bold leading-snug tracking-tight text-slate-900 dark:text-slate-50 sm:text-2xl md:text-3xl transition-colors">
                The work showcased here reflects my creative contributions across{' '}
                <span className="bg-gradient-to-r from-cyan-500 to-sky-500 dark:from-cyan-300 dark:to-sky-400 bg-clip-text text-transparent">
                  professional projects
                </span>{' '}
                and{' '}
                <span className="bg-gradient-to-r from-sky-500 to-fuchsia-500 dark:from-sky-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
                  collaborations
                </span>.
              </h2>
            </motion.div>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        </section>

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
