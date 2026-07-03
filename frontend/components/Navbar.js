'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Sun, Moon, Menu, X, Newspaper, Flame, Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

const NAV_LINKS = [
  { href: '/',                        label: 'Home'     },
  { href: '/?category=technology',    label: 'Tech'     },
  { href: '/?category=business',      label: 'Business' },
  { href: '/?category=sports',        label: 'Sports'   },
  { href: '/docs',                    label: 'App Docs', external: false },
];

const TICKER_ITEMS = [
  '🔴 BREAKING: Global markets react to latest economic data',
  '⚡ Tech giants announce major AI breakthroughs',
  '🌍 World leaders gather for climate summit',
  '📈 Stock markets hit record highs amid optimism',
  '🚀 Space agency reveals next-generation mission plans',
  '🏆 Sports: Championship finals set for this weekend',
];

const DAYS   = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const G = {
  bg:     'linear-gradient(135deg, var(--gold-from), var(--gold-via), var(--gold-to))',
  border: '1px solid var(--gold-border)',
  pill:   { background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.22)' },
  text:   { color: 'var(--gold-text)' },
  muted:  { color: 'var(--gold-muted)' },
};

export default function Navbar() {
  const [dark,     setDark]     = useState(false);
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [now,      setNow]      = useState(null);
  const [showCal,  setShowCal]  = useState(false);
  const [calDate,  setCalDate]  = useState(new Date());
  const calRef = useRef(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'));
    setNow(new Date());
    setCalDate(new Date());

    const tick     = setInterval(() => setNow(new Date()), 1000);
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll);

    const onClickOut = (e) => {
      if (calRef.current && !calRef.current.contains(e.target)) setShowCal(false);
    };
    document.addEventListener('mousedown', onClickOut);

    return () => {
      clearInterval(tick);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('mousedown', onClickOut);
    };
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  const prevMonth = () => setCalDate(new Date(calDate.getFullYear(), calDate.getMonth() - 1, 1));
  const nextMonth = () => setCalDate(new Date(calDate.getFullYear(), calDate.getMonth() + 1, 1));

  const year      = calDate.getFullYear();
  const month     = calDate.getMonth();
  const daysCount = new Date(year, month + 1, 0).getDate();
  const firstDay  = new Date(year, month, 1).getDay();
  const today     = new Date();

  const timeStr = now ? now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '';
  const dateStr = now ? now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }) : '';

  return (
    <header className="sticky top-0 z-50">

      {/* Breaking news ticker */}
      <div className="text-xs font-bold overflow-hidden h-8 flex items-center"
        style={{ background: G.bg, color: 'var(--gold-text)' }}>
        <div className="flex-shrink-0 flex items-center gap-1.5 px-4 h-full" style={{ background: 'rgba(0,0,0,0.2)' }}>
          <Flame className="w-3 h-3 animate-pulse" />
          BREAKING
        </div>
        <div className="overflow-hidden flex-1">
          <div className="flex gap-16 animate-ticker whitespace-nowrap">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i} className="opacity-90">{item}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div
        className="transition-all duration-500"
        style={{
          background: scrolled ? 'color-mix(in srgb, var(--gold-via) 92%, black)' : G.bg,
          borderBottom: G.border,
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.18)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-3">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group select-none flex-shrink-0">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)' }}>
                <Newspaper className="w-[18px] h-[18px]" style={G.text} strokeWidth={2.5} />
              </div>
              <span className="font-black text-[1.2rem] tracking-tight leading-none" style={G.text}>
                News<span style={G.muted}>Flow</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {NAV_LINKS.map(({ href, label, external }) =>
                external ? (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-white/15"
                    style={G.text}>
                    {label}
                  </a>
                ) : (
                  <Link key={label} href={href}
                    className="px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-white/15"
                    style={G.text}>
                    {label}
                  </Link>
                )
              )}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2 ml-auto">

              {/* Date & Clock + Calendar */}
              <div className="relative" ref={calRef}>
                <button
                  onClick={() => setShowCal(!showCal)}
                  className="hidden md:flex items-center gap-2.5 px-3.5 py-2 rounded-xl transition-all duration-200 hover:bg-white/15"
                  style={G.pill}
                >
                  <Calendar className="w-3.5 h-3.5 flex-shrink-0" style={G.muted} strokeWidth={2.5} />
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-[11px] font-black tracking-tight" style={G.text}>{dateStr}</span>
                    <span className="text-[10px] font-bold font-mono mt-0.5 flex items-center gap-1" style={G.muted}>
                      <Clock className="w-2.5 h-2.5" />
                      {timeStr}
                    </span>
                  </div>
                </button>

                {/* Calendar popup */}
                {showCal && (
                  <div className="absolute right-0 top-full mt-2 w-72 rounded-2xl shadow-2xl overflow-hidden animate-slide-down z-50"
                    style={{ background: 'var(--surface)', border: G.border }}>

                    <div className="flex items-center justify-between px-4 py-3"
                      style={{ background: G.bg }}>
                      <button onClick={prevMonth}
                        className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/25 transition-colors"
                        style={{ background: 'rgba(255,255,255,0.15)', color: 'var(--gold-text)' }}>
                        <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
                      </button>
                      <span className="text-sm font-black tracking-tight" style={G.text}>
                        {MONTHS[month]} {year}
                      </span>
                      <button onClick={nextMonth}
                        className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/25 transition-colors"
                        style={{ background: 'rgba(255,255,255,0.15)', color: 'var(--gold-text)' }}>
                        <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
                      </button>
                    </div>

                    <div className="flex items-center justify-center gap-2 py-2.5 border-b"
                      style={{ background: 'var(--surface2)', borderColor: 'var(--gold-border)' }}>
                      <Clock className="w-3.5 h-3.5" style={{ color: 'var(--gold-via)' }} />
                      <span className="text-sm font-black font-mono tracking-widest" style={{ color: 'var(--text)' }}>
                        {timeStr}
                      </span>
                    </div>

                    <div className="grid grid-cols-7 px-3 pt-3 pb-1">
                      {DAYS.map((d) => (
                        <div key={d} className="text-center text-[10px] font-black uppercase tracking-wider py-1"
                          style={{ color: 'var(--muted2)' }}>
                          {d}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 px-3 pb-4 gap-y-1">
                      {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
                      {Array.from({ length: daysCount }).map((_, i) => {
                        const day = i + 1;
                        const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
                        const isWeekend = (firstDay + i) % 7 === 0 || (firstDay + i) % 7 === 6;
                        return (
                          <div key={day}
                            className="flex items-center justify-center h-8 w-8 mx-auto rounded-xl text-xs font-bold transition-all duration-150 cursor-default select-none hover:bg-[var(--surface2)]"
                            style={
                              isToday
                                ? { background: G.bg, color: 'var(--gold-text)', boxShadow: '0 2px 12px rgba(0,0,0,0.2)', transform: 'scale(1.1)' }
                                : isWeekend
                                ? { color: 'var(--gold-via)' }
                                : { color: 'var(--text)' }
                            }
                          >
                            {day}
                          </div>
                        );
                      })}
                    </div>

                    <div className="px-4 pb-3">
                      <span className="text-xs font-medium" style={{ color: 'var(--muted)' }}>
                        Today:{' '}
                        <span className="font-black" style={{ color: 'var(--gold-via)' }}>
                          {today.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Live badge */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
                style={{ ...G.pill, color: 'var(--gold-text)' }}>
                <span className="live-dot" />
                Live
              </div>

              {/* Dark / Light toggle */}
              <button
                onClick={toggleDark}
                aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 hover:bg-white/15"
                style={{ ...G.pill, color: 'var(--gold-text)' }}
              >
                {dark
                  ? <Sun  className="w-4 h-4" style={{ color: 'var(--gold-muted)' }} strokeWidth={2.5} />
                  : <Moon className="w-4 h-4" style={{ color: 'var(--gold-muted)' }} strokeWidth={2.5} />
                }
                <span className="hidden sm:inline">{dark ? 'Light' : 'Dark'}</span>
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setOpen(!open)}
                className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-200 hover:bg-white/15"
                style={{ ...G.pill, color: 'var(--gold-text)' }}
              >
                {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {open && (
            <div className="lg:hidden pb-4 pt-2 space-y-0.5 animate-slide-down"
              style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>

              <div className="flex items-center gap-3 px-4 py-3 mb-1 rounded-xl"
                style={G.pill}>
                <Calendar className="w-4 h-4" style={G.muted} />
                <div>
                  <p className="text-xs font-black" style={G.text}>{dateStr}</p>
                  <p className="text-[10px] font-bold font-mono" style={G.muted}>{timeStr}</p>
                </div>
              </div>

              {NAV_LINKS.map(({ href, label, external }) =>
                external ? (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all hover:bg-white/15"
                    style={G.text}>
                    {label}
                  </a>
                ) : (
                  <Link key={label} href={href} onClick={() => setOpen(false)}
                    className="flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all hover:bg-white/15"
                    style={G.text}>
                    {label}
                  </Link>
                )
              )}

              <button onClick={toggleDark}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all hover:bg-white/15"
                style={G.text}>
                {dark
                  ? <Sun  className="w-4 h-4" style={G.muted} strokeWidth={2.5} />
                  : <Moon className="w-4 h-4" style={G.muted} strokeWidth={2.5} />
                }
                {dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
