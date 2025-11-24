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

            <div className="mt-6 grid gap-4 text-sm text-slate-200 sm:grid-cols-3">
              <div className="glass-panel rounded-xl p-4">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                  Focus
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-50">
                  Branding, editorial &amp; social design
                </p>
              </div>
              <div className="glass-panel rounded-xl p-4">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                  Tools
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-50">
                  Adobe CC, Figma, Procreate, Blender (basic)
                </p>
              </div>
              <div className="glass-panel rounded-xl p-4">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                  Based in
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-50">
                  Open to remote &amp; global clients
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
            className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950/70 p-4"
          >
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
              Skills snapshot
            </h3>
            <div className="space-y-3 text-[0.78rem] text-slate-200">
              <div className="flex items-center justify-between gap-4">
                <span>Visual identity &amp; logo design</span>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[0.7rem] text-emerald-300">
                  Advanced
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Layout &amp; editorial</span>
                <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-[0.7rem] text-cyan-300">
                  Advanced
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Social media &amp; campaign design</span>
                <span className="rounded-full bg-fuchsia-500/10 px-2 py-0.5 text-[0.7rem] text-fuchsia-300">
                  Advanced
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
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


