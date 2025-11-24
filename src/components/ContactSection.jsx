import { useState } from 'react';
import { motion } from 'framer-motion';

function encode(data) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
}

export function ContactSection() {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    project: '',
  });

  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('submitting');

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': 'contact',
          ...formValues,
        }),
      });

      setStatus('success');
      setFormValues({ name: '', email: '', project: '' });
    } catch (error) {
      setStatus('error');
    }
  };
  return (
    <section id="contact" className="bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          className="grid gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-center"
        >
          <div>
            <p className="section-heading">Contact</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
              Let&apos;s design something memorable together.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-[0.95rem]">
              Share a bit about your project, timeline, and what you&apos;re hoping to create. I aim
              to reply to new enquiries within 1–2 business days.
            </p>

            <div className="mt-6 space-y-2 text-[0.85rem] text-slate-300">
              <p>
                Email:{' '}
                <a
                  href="mailto:sahil.chauhan111171@gmail.com"
                  className="font-medium text-cyan-300 hover:text-cyan-200"
                >
                  sahil.chauhan111171@gmail.com
                </a>
              </p>
              <p>
                Behance / Dribbble links can go here – update with your real profiles to make it
                easy for clients to explore more work.
              </p>
            </div>
          </div>

          <form
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            className="glass-panel space-y-4 rounded-2xl p-4 text-sm"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden">
              <label>
                Don&apos;t fill this out if you&apos;re human:
                <input name="bot-field" />
              </label>
            </p>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-xs font-medium text-slate-200">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-lg border border-slate-700/80 bg-slate-900/70 px-3 py-2 text-xs text-slate-100 outline-none ring-0 transition focus:border-cyan-400/80 focus:ring-1 focus:ring-cyan-400/40"
                  value={formValues.name}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-medium text-slate-200">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-slate-700/80 bg-slate-900/70 px-3 py-2 text-xs text-slate-100 outline-none ring-0 transition focus:border-cyan-400/80 focus:ring-1 focus:ring-cyan-400/40"
                  value={formValues.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="project" className="text-xs font-medium text-slate-200">
                Project details
              </label>
              <textarea
                id="project"
                name="project"
                rows={4}
                placeholder="Tell me about your brand, goals, and timeline."
                className="w-full resize-none rounded-lg border border-slate-700/80 bg-slate-900/70 px-3 py-2 text-xs text-slate-100 outline-none ring-0 transition focus:border-cyan-400/80 focus:ring-1 focus:ring-cyan-400/40"
                value={formValues.project}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="submit"
                className="btn-primary"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Sending…' : 'Send enquiry'}
              </button>
              {status === 'success' && (
                <p className="text-[0.7rem] text-emerald-400">
                  Thanks for reaching out — I&apos;ll get back to you soon.
                </p>
              )}
              {status === 'error' && (
                <p className="text-[0.7rem] text-rose-400">
                  Something went wrong. Please try again or email me directly.
                </p>
              )}
            </div>
          </form>
        </motion.div>

        <div className="mt-10 flex flex-col gap-4 border-t border-slate-800 pt-6 text-[0.75rem] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Sahil Chauhan. All rights reserved.</p>
          <p>
            Designed &amp; built with React, Tailwind CSS, and Framer Motion. Customize the text to
            match your details.
          </p>
        </div>
      </div>
    </section>
  );
}