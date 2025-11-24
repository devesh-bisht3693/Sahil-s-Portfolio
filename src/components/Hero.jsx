import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] },
  },
};

const gradientOrb =
  'pointer-events-none absolute rounded-full blur-3xl opacity-40 bg-gradient-to-br from-cyan-400 via-sky-500 to-fuchsia-500';

export function Hero() {
  return (
    <section className="noise-bg relative overflow-hidden border-b border-slate-800/80">
      <div className={`${gradientOrb} -left-40 top-[-6rem] h-72 w-72`} />
      <div className={`${gradientOrb} -right-16 bottom-[-5rem] h-72 w-72`} />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-20 pt-16 md:flex-row md:items-center md:px-6 md:pb-24 md:pt-20 lg:gap-16">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex-1 space-y-6"
        >
          <span className="pill bg-slate-900/70 text-[0.68rem]">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Available for freelance projects
          </span>

          <div className="space-y-4">
            <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-slate-50 sm:text-5xl lg:text-[3.3rem]">
              Crafting bold visual stories for brands that want to be seen.
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-slate-300/90 sm:text-base">
              I&apos;m Sahil, a graphic designer specialising in brand identity, editorial, and
              digital visuals. I blend clean typography, expressive color, and motion to build
              experiences that feel as good as they look.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a href="#work" className="btn-primary">
              View selected work
            </a>
            <a
              href="/Sahil-Chauhan_Resume 2025.pdf"
              download
              className="btn-ghost"
            >
              Download resume
            </a>
          </div>

          <div className="mt-6 flex flex-wrap gap-4 text-[0.7rem] text-slate-400">
            <div className="flex items-center gap-2">
              <span className="h-1 w-6 rounded-full bg-cyan-400/70" />
              <span>Brand identity &amp; visual systems</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1 w-6 rounded-full bg-fuchsia-400/70" />
              <span>Social media &amp; campaign visuals</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1 w-6 rounded-full bg-emerald-400/70" />
              <span>Motion, UI accents &amp; layout design</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-1 justify-center md:justify-end"
        >
          <div className="relative h-80 w-full max-w-sm">
            <div className="absolute inset-0 rounded-[2.2rem] border border-slate-700/70 bg-gradient-to-b from-slate-900/80 via-slate-950 to-slate-950 shadow-[0_32px_90px_rgba(15,23,42,0.9)]">
              <div className="absolute inset-px rounded-[2.1rem] bg-[radial-gradient(circle_at_0%_0%,rgba(56,189,248,0.22),transparent_55%),radial-gradient(circle_at_100%_0%,rgba(244,63,94,0.22),transparent_55%),radial-gradient(circle_at_0%_100%,rgba(34,197,94,0.22),transparent_55%)]" />

              <div className="relative flex h-full flex-col justify-between rounded-[2.1rem] p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-slate-400">
                      Designer
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-50">Sahil Chauhan</p>
                  </div>
                  <div className="rounded-full bg-slate-900/70 px-3 py-1 text-[0.7rem] font-medium text-cyan-300">
                    Visual Identity
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="h-40 w-full overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/40">
                    <div className="h-full w-full bg-[conic-gradient(at_0%_0%,#22d3ee_0deg,#e879f9_120deg,#22c55e_240deg,#22d3ee_360deg)] opacity-80" />
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-[0.65rem] text-slate-300">
                    <div className="glass-panel rounded-xl p-3">
                      <p className="font-semibold text-slate-100">Branding</p>
                      <p className="mt-1 text-[0.65rem] text-slate-400">Identity &amp; logos</p>
                    </div>
                    <div className="glass-panel rounded-xl p-3">
                      <p className="font-semibold text-slate-100">Social</p>
                      <p className="mt-1 text-[0.65rem] text-slate-400">Campaign visuals</p>
                    </div>
                    <div className="glass-panel rounded-xl p-3">
                      <p className="font-semibold text-slate-100">Editorial</p>
                      <p className="mt-1 text-[0.65rem] text-slate-400">Layout &amp; print</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


