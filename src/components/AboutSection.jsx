import { motion } from 'framer-motion';

export function AboutSection() {
  return (
    <section id="about" className="border-b border-slate-800/80 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          {/* ── Left: Text content ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          >
            <p className="section-heading">About</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
              Designing structured systems with expressive impact.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-[0.95rem]">
              I am a Visual Designer focused on building scalable design systems across campaigns,
              product launches, technical communication, and brand identity. My work balances
              precision with creativity — translating complex ideas into clear, high-impact visuals.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-[0.95rem]">
              From enterprise co-branded campaigns and performance media to long-form editorial
              systems and social content, I design with structure, hierarchy, and consistency at the core.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-[0.95rem]">
              I collaborate with cross-functional teams, marketing leads, and product stakeholders
              to deliver visuals that scale across digital, retail, and print environments.
            </p>
          </motion.div>

          {/* ── Right: Info containers ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
            className="grid gap-4 text-sm text-slate-200 sm:grid-cols-2"
          >
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
                Adobe Creative Cloud, Figma, Procreate, Blender (basic), Canva
              </p>
            </div>
            <div className="space-y-4 rounded-2xl border border-cyan-300 bg-slate-950/70 p-4 transition-colors transition-shadow duration-300 hover:border-cyan-300 hover:shadow-[0_0_30px_rgba(56,189,248,0.7)]">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                AI Tools
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-50">
                Google Imagen at Freepik, Nano Banana at Envato, Artlist, Deepseek, Gemini, Claude
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

            {/* Skills snapshot — spans full width of right column */}
            <div className="sm:col-span-2 space-y-4 rounded-2xl border border-cyan-300 bg-slate-950/70 p-4 transition-colors transition-shadow duration-300 hover:border-cyan-300 hover:shadow-[0_0_30px_rgba(56,189,248,0.7)]">
              <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                Skills snapshot
              </h3>
              <div className="space-y-3 text-[0.78rem] text-slate-200">
                <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4">
                  <span>Campaign &amp; performance design</span>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[0.7rem] text-emerald-300">
                    Advanced
                  </span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4">
                  <span>Technical &amp; editorial systems</span>
                  <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-[0.7rem] text-cyan-300">
                    Strong
                  </span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4">
                  <span>Visual identity &amp; branding</span>
                  <span className="rounded-full bg-fuchsia-500/10 px-2 py-0.5 text-[0.7rem] text-fuchsia-300">
                    Strong
                  </span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4">
                  <span>Motion &amp; micro-interactions</span>
                  <span className="rounded-full bg-sky-500/10 px-2 py-0.5 text-[0.7rem] text-sky-300">
                    Intermediate
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


