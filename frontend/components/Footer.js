import Link from 'next/link';
import { Newspaper, Globe, ArrowUpRight } from 'lucide-react';

const CATEGORIES = ['Business', 'Technology', 'Sports', 'Health', 'Science', 'Entertainment'];
const RESOURCES  = [
  { href: 'https://newsapi.org',     label: 'NewsAPI'      },
  { href: 'https://nextjs.org',      label: 'Next.js'      },
  { href: 'https://tailwindcss.com', label: 'Tailwind CSS' },
  { href: 'https://expressjs.com',   label: 'Express.js'   },
];

export default function Footer() {
  return (
    <footer className="mt-20 transition-colors duration-300"
      style={{ background: 'linear-gradient(135deg, var(--gold-from), var(--gold-via), var(--gold-to))', borderTop: '1px solid var(--gold-border)' }}>

      {/* Top wave divider */}
      <div className="w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1440 40" className="w-full" style={{ fill: 'var(--bg)' }} preserveAspectRatio="none">
          <path d="M0,40 C360,0 1080,0 1440,40 L1440,0 L0,0 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl backdrop-blur-sm flex items-center justify-center shadow-lg" style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}>
                <Newspaper className="w-5 h-5" style={{ color: 'var(--gold-text)' }} strokeWidth={2.5} />
              </div>
              <span className="font-black text-xl tracking-tight" style={{ color: 'var(--gold-text)' }}>
                News<span style={{ color: 'var(--gold-muted)' }}>Flow</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'color-mix(in srgb, var(--gold-text) 75%, transparent)' }}>
              A modern full-stack news aggregator. Real-time headlines powered by NewsAPI, built with Next.js and Express.
            </p>
            <div className="flex items-center gap-2 text-xs font-medium" style={{ color: 'color-mix(in srgb, var(--gold-muted) 80%, transparent)' }}>
              <span className="live-dot" />
              Updated in real-time
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-5">
            <h4 className="text-xs font-black uppercase tracking-[0.15em]" style={{ color: 'color-mix(in srgb, var(--gold-muted) 70%, transparent)' }}>
              Categories
            </h4>
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat}
                  href={`/?category=${cat.toLowerCase()}`}
                  className="text-sm font-medium transition-colors duration-200 flex items-center gap-1.5 group"
                  style={{ color: 'color-mix(in srgb, var(--gold-text) 75%, transparent)' }}
                >
                  <span className="w-1 h-1 rounded-full transition-colors" style={{ background: 'color-mix(in srgb, var(--gold-muted) 50%, transparent)' }} />
                  {cat}
                </Link>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-5">
            <h4 className="text-xs font-black uppercase tracking-[0.15em]" style={{ color: 'color-mix(in srgb, var(--gold-muted) 70%, transparent)' }}>
              Built With
            </h4>
            <div className="space-y-2.5">
              {RESOURCES.map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-sm font-medium transition-colors duration-200 group"
                  style={{ color: 'color-mix(in srgb, var(--gold-text) 75%, transparent)' }}
                >
                  <span className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 transition-colors" style={{ color: 'color-mix(in srgb, var(--gold-muted) 60%, transparent)' }} />
                    {label}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3" style={{ borderTop: '1px solid var(--gold-border)' }}>
          <p className="text-xs" style={{ color: 'color-mix(in srgb, var(--gold-text) 60%, transparent)' }}>
            © {new Date().getFullYear()}{' '}
            <span className="font-bold" style={{ color: 'color-mix(in srgb, var(--gold-text) 80%, transparent)' }}>Qiyas project NewsFlow</span>.
            All rights reserved. Built by{' '}
            <span className="font-black" style={{ color: 'var(--gold-muted)' }}>Alemayehu Getnet Amare</span>.
            Powered by{' '}
            <a
              href="https://newsapi.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline font-semibold"
              style={{ color: 'var(--gold-muted)' }}
            >
              NewsAPI
            </a>.
          </p>
          <p className="text-xs" style={{ color: 'color-mix(in srgb, var(--gold-text) 50%, transparent)' }}>
            Next.js · Express.js · Node.js · Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
