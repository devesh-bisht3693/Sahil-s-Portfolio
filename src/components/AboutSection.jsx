import { motion } from 'framer-motion';

export function AboutSection() {
  return (
    <section id="about" className="border-b border-slate-800/80 bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-start">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          >
            <p className="section-heading">About</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
              Balancing clean systems with expressive details.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-[0.95rem]">
              With experience across branding, editorial, and digital design, I help brands find
              the sweet spot between minimal and memorable. My work is driven by typography,
              colour, and layout that feels intentional across every touchpoint.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-[0.95rem]">
              I&apos;ve collaborated with startups, studios, and creators to build design systems,
              campaigns, and visuals that scale across social, web, and print.
            </p>

            <div className="mt-6 grid gap-4 text-sm text-slate-200 sm:grid-cols-2">
              <div className="space-y-4 rounded-2xl border border-cyan-300 bg-slate-950/70 p-4 transition-colors transition-shadow duration-300 hover:border-cyan-300 hover:shadow-[0_0_30px_rgba(56,189,248,0.7)]">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                  Focus
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-50">
                  Branding, visual identity &amp; digital creatives
                </p>
              </div>
              <div className="space-y-4 rounded-2xl border border-cyan-300 bg-slate-950/70 p-4 transition-colors transition-shadow duration-300 hover:border-cyan-300 hover:shadow-[0_0_30px_rgba(56,189,248,0.7)]">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                  Tools
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-50">
                  Adobe Creative cloud , Figma , Procreate , Blender (basic) , Canva , Fiverr , Upwork , Freelancer , etc.
                </p>
              </div>
              <div className="space-y-4 rounded-2xl border border-cyan-300 bg-slate-950/70 p-4 transition-colors transition-shadow duration-300 hover:border-cyan-300 hover:shadow-[0_0_30px_rgba(56,189,248,0.7)]">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                  AI Tools
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-50">
                  Google Imagen at Freepik , Nano Banana at Envato and other such like Artlist , Deepseek , Gemini , Claude , etc.
                </p>
              </div>
              <div className="space-y-4 rounded-2xl border border-cyan-300 bg-slate-950/70 p-4 transition-colors transition-shadow duration-300 hover:border-cyan-300 hover:shadow-[0_0_30px_rgba(56,189,248,0.7)]">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                  Based in
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-50">
                  Delhi, open to on-site roles with remote work as required.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
            className="space-y-4 rounded-2xl border border-cyan-300 bg-slate-950/70 p-4 transition-colors transition-shadow duration-300 hover:border-cyan-300 hover:shadow-[0_0_30px_rgba(56,189,248,0.7)]"
          >
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
              Skills snapshot
            </h3>
            <div className="space-y-3 text-[0.78rem] text-slate-200">
              <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4">
                <span>Visual identity &amp; logo design</span>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[0.7rem] text-emerald-300">
                  Advanced
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4">
                <span>Layout &amp; editorial</span>
                <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-[0.7rem] text-cyan-300">
                  Advanced
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4">
                <span>Social media &amp; campaign design</span>
                <span className="rounded-full bg-fuchsia-500/10 px-2 py-0.5 text-[0.7rem] text-fuchsia-300">
                  Advanced
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4">
                <span>Motion &amp; micro-interactions</span>
                <span className="rounded-full bg-sky-500/10 px-2 py-0.5 text-[0.7rem] text-sky-300">
                  Intermediate
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


