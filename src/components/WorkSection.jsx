import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.19, 1, 0.22, 1] },
  }),
};

const projects = [
  {
    title: 'Neon Studio',
    type: 'Brand identity, social design',
    year: '2024',
    palette: ['#22d3ee', '#0ea5e9', '#1e293b'],
    tags: ['Logo', 'Brand system', 'Instagram'],
  },
  {
    title: 'Aurora Festival',
    type: 'Poster series, campaign',
    year: '2023',
    palette: ['#fb7185', '#f97316', '#020617'],
    tags: ['Poster', 'Print', 'OOH'],
  },
  {
    title: 'Shift Labs',
    type: 'Product visuals, UI accents',
    year: '2024',
    palette: ['#22c55e', '#a3e635', '#020617'],
    tags: ['Product visuals', 'Web', 'Motion'],
  },
  {
    title: 'Midnight Coffee',
    type: 'Packaging, art direction',
    year: '2022',
    palette: ['#f97316', '#a855f7', '#020617'],
    tags: ['Packaging', 'Art direction'],
  },
];

export function WorkSection() {
  return (
    <section id="work" className="border-b border-slate-800/80 bg-slate-950/70">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-heading">Selected work</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
              A snapshot of the brands I&apos;ve helped shape.
            </h2>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-slate-400 sm:text-sm">
            Each project is crafted with a focus on storytelling, typography, and color systems
            that feel both expressive and timeless. These are a few favourites.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              custom={index}
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="group relative overflow-hidden rounded-2xl border border-slate-800/90 bg-slate-950/80 p-4 transition duration-300 hover:border-cyan-400/60 hover:shadow-glow"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold text-slate-50 sm:text-lg">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-[0.78rem] text-slate-400">{project.type}</p>
                </div>
                <span className="rounded-full bg-slate-900/80 px-3 py-1 text-[0.68rem] font-medium text-slate-300">
                  {project.year}
                </span>
              </div>

              <div className="mt-4 h-36 overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
                <div className="flex h-full w-full">
                  {project.palette.map((color) => (
                    <div
                      key={color}
                      className="flex-1 transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[0.7rem]">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag-chip">
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-[0.7rem] font-medium text-cyan-300 transition group-hover:text-cyan-200"
                >
                  View project
                  <span className="translate-y-px transition-transform group-hover:translate-x-0.5">
                    ↗
                  </span>
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}


