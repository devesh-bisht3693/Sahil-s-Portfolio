import { motion } from 'framer-motion';

const services = [
  {
    title: 'Brand Identity & Logo Design',
    description:
      'Complete visual identities, from logo to typography, colour palettes, and usage guidelines.',
    items: ['Logo suites', 'Brand guidelines', 'Visual systems'],
  },
  {
    title: 'Social & Campaign Design',
    description:
      'Cohesive content across social platforms, helping brands show up consistently and memorably.',
    items: ['Instagram carousels', 'Campaign kits', 'Story templates'],
  },
  {
    title: 'Editorial & Layout',
    description:
      'Sharp, considered layouts for decks, presentations, brochures, and digital publications.',
    items: ['Pitch decks', 'Brochures', 'Whitepapers and Newsletter'],
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="border-b border-slate-800/80 bg-slate-950/90">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-heading">Services</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
              Design support, tailored to where your brand is today.
            </h2>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-slate-400 sm:text-sm">
            Whether you need a full identity from scratch or a refresh of your current visuals, we
            can shape a process that works around your timeline and budget.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: index * 0.05, ease: [0.19, 1, 0.22, 1] }}
              className="space-y-4 rounded-2xl border border-cyan-300 bg-slate-950/70 p-4 transition-colors transition-shadow duration-300 hover:border-cyan-300 hover:shadow-[0_0_30px_rgba(56,189,248,0.7)]"
            >
              <h3 className="text-sm font-semibold text-slate-50 sm:text-[0.95rem]">
                {service.title}
              </h3>
              <p className="mt-2 text-[0.8rem] leading-relaxed text-slate-300">
                {service.description}
              </p>
              <ul className="mt-3 space-y-1.5 text-[0.75rem] text-slate-300">
                {service.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-[3px] w-5 rounded-full bg-cyan-400/70" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


