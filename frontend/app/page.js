'use client';

import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import NewsList from '../components/NewsList';
import { TrendingUp, Globe, Search, Zap, X, Flame, BarChart2 } from 'lucide-react';

const COUNTRIES = [
  { code: 'us', name: 'USA',       flag: '🇺🇸' },
  { code: 'gb', name: 'UK',        flag: '🇬🇧' },
  { code: 'ca', name: 'Canada',    flag: '🇨🇦' },
  { code: 'au', name: 'Australia', flag: '🇦🇺' },
  { code: 'in', name: 'India',     flag: '🇮🇳' },
  { code: 'de', name: 'Germany',   flag: '🇩🇪' },
  { code: 'fr', name: 'France',    flag: '🇫🇷' },
  { code: 'et', name: 'Ethiopia',  flag: '🇪🇹' },
];

const TRENDING = ['AI', 'Climate', 'Economy', 'Elections', 'Space', 'Health', 'Crypto', 'Sports'];

const STATS = [
  { icon: Globe,       label: '150+ Countries',  sub: 'World Coverage'  },
  { icon: BarChart2,   label: '80,000+ Sources', sub: 'News Publishers' },
  { icon: Zap,         label: 'Real-time',        sub: 'Live Updates'    },
  { icon: TrendingUp,  label: 'Trending',         sub: 'Top Stories'     },
];

export default function Home() {
  const [search,   setSearch]   = useState('');
  const [category, setCategory] = useState('');
  const [country,  setCountry]  = useState('');

  const handleSearch   = (q) => { setSearch(q);  setCategory(''); setCountry(''); };
  const handleCategory = (c) => { setCategory(c); setSearch(''); };
  const handleCountry  = (c) => { setCountry(country === c ? '' : c); setSearch(''); setCategory(''); };
  const clearAll       = ()  => { setSearch(''); setCategory(''); setCountry(''); };

  const activeFilter = search || category || country;

  return (
    <div className="space-y-10 animate-fade-in">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden rounded-3xl"
        style={{ background: 'linear-gradient(135deg, #0f1f5c 0%, #1a3a9e 25%, #2d4fd6 50%, #4f35c7 75%, #6d28d9 100%)' }}
      >
        {/* Orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-400/15 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-violet-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-indigo-300/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />
          {/* Dot grid */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '28px 28px' }}
          />
        </div>

        <div className="relative z-10 px-6 py-20 text-center max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 glass text-white text-xs font-bold px-5 py-2.5 rounded-full">
            <Flame className="w-3.5 h-3.5 text-orange-300" />
            Real-time Global News
            <span className="live-dot" />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-6xl md:text-8xl font-black tracking-tight text-white leading-none drop-shadow-2xl">
              News<span className="text-blue-200">Flow</span>
            </h1>
            <p className="text-blue-200/60 text-sm font-semibold tracking-[0.2em] uppercase">
              Your Intelligent News Companion
            </p>
          </div>

          <p className="text-blue-100/80 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
            Explore breaking headlines, trending stories, and in-depth coverage from thousands of sources worldwide.
          </p>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto pt-2">
            {STATS.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="glass rounded-2xl p-4 text-center space-y-1">
                <div className="flex justify-center text-blue-200 mb-1">
                  <Icon className="w-4 h-4" />
                </div>
                <p className="text-white font-black text-sm">{label}</p>
                <p className="text-blue-200/60 text-xs font-medium">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trending topics ──────────────────────────────────── */}
      <section className="flex items-center gap-3 overflow-x-auto pb-1">
        <div className="flex items-center gap-2 flex-shrink-0 text-[var(--amber)] bg-[var(--amber-l)] border border-amber-200 dark:border-amber-900/50 px-3.5 py-2 rounded-full text-xs font-black">
          <TrendingUp className="w-3.5 h-3.5" />
          Trending
        </div>
        {TRENDING.map((topic) => (
          <button
            key={topic}
            onClick={() => handleSearch(topic)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold border transition-all duration-200 active:scale-95 ${
              search === topic
                ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-lg shadow-blue-500/30'
                : 'bg-[var(--surface)] text-[var(--muted)] border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--accent-ll)]'
            }`}
          >
            # {topic}
          </button>
        ))}
      </section>

      {/* ── Controls ─────────────────────────────────────────── */}
      <section className="space-y-5">
        <SearchBar onSearch={handleSearch} initialValue={search} />
        <CategoryFilter selected={category} onSelect={handleCategory} />

        {/* Country filter */}
        <div className="flex flex-wrap gap-2 justify-center">
          {COUNTRIES.map((c) => (
            <button
              key={c.code}
              onClick={() => handleCountry(c.code)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all duration-200 active:scale-95 ${
                country === c.code
                  ? 'bg-violet-600 text-white border-violet-600 shadow-lg shadow-violet-500/30 scale-105'
                  : 'bg-[var(--surface)] text-[var(--muted)] border-[var(--border)] hover:border-violet-400 hover:text-violet-600 hover:bg-[var(--purple-l)]'
              }`}
            >
              <span className="text-sm">{c.flag}</span>
              {c.name}
            </button>
          ))}
        </div>

        {/* Active filter pill */}
        {activeFilter && (
          <div className="flex justify-center animate-scale-in">
            <div className="inline-flex items-center gap-2.5 bg-[var(--accent-l)] text-[var(--accent)] text-xs font-bold px-4 py-2 rounded-full border border-blue-200 dark:border-blue-800/60">
              <Search className="w-3 h-3" />
              Filtering:
              <span className="capitalize font-black">
                {search ? `"${search}"` : category || country.toUpperCase()}
              </span>
              <button
                onClick={clearAll}
                className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ── News Grid ─────────────────────────────────────────── */}
      <NewsList search={search} category={category} country={country} />
    </div>
  );
}
