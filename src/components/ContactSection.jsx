import { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from './Toast';

export function ContactSection() {
  const { showToast } = useToast();
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const res = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
        setFormValues({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(data.error || 'Failed to send');
      }
    } catch {
      setStatus('error');
      showToast('Something went wrong. Please try again or email me directly.', 'error');
    }

    setTimeout(() => setStatus('idle'), 3000);
  };

  const inputClasses =
    'w-full rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-900/70 px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 outline-none ring-0 transition-all focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 placeholder:text-slate-400 dark:placeholder:text-slate-500';

  return (
    <section id="contact" className="bg-white dark:bg-slate-950 transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          className="grid gap-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-start"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">Contact</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl transition-colors">
              Let&apos;s design something memorable together.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base transition-colors">
              Share a bit about your project, timeline, and what you&apos;re hoping to create. I aim
              to reply to new enquiries within 1–2 business days.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 transition-colors">Email</p>
                  <a href="mailto:sahilchauhan@email.com" className="text-sm font-medium text-cyan-600 dark:text-cyan-300 hover:text-cyan-500 dark:hover:text-cyan-200 transition-colors">
                    sahilchauhan@email.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 transition-colors">Based in</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100 transition-colors">Delhi, India</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 transition-colors">Response time</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100 transition-colors">1–2 business days</p>
                </div>
              </div>
            </div>
          </div>

          <form
            method="POST"
            action="#"
            onSubmit={handleSubmit}
            className="space-y-4 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/40 p-6 transition-all duration-300 hover:border-cyan-200 dark:hover:border-cyan-400/40 hover:shadow-lg dark:hover:shadow-glow-sm"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-xs font-medium text-slate-700 dark:text-slate-200 transition-colors">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className={inputClasses}
                  value={formValues.name}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-medium text-slate-700 dark:text-slate-200 transition-colors">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className={inputClasses}
                  value={formValues.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="subject" className="text-xs font-medium text-slate-700 dark:text-slate-200 transition-colors">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                placeholder="What's this about?"
                className={inputClasses}
                value={formValues.subject}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="message" className="text-xs font-medium text-slate-700 dark:text-slate-200 transition-colors">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="Tell me about your project, goals, and timeline."
                className={`${inputClasses} resize-none`}
                value={formValues.message}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 dark:bg-cyan-400 px-6 py-3 text-sm font-semibold text-white dark:text-slate-950 shadow-glow-sm transition-all hover:bg-cyan-400 dark:hover:bg-cyan-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {status === 'submitting' ? (
                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending…
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  Send Message
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
