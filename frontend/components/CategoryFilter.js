'use client';

const CATEGORIES = [
  { id: '',              name: 'All',           emoji: '🌐', active: 'bg-slate-800  text-white border-slate-800  shadow-slate-500/30  dark:bg-slate-200  dark:text-slate-900 dark:border-slate-200' },
  { id: 'business',      name: 'Business',      emoji: '💼', active: 'bg-amber-500  text-white border-amber-500  shadow-amber-500/30' },
  { id: 'entertainment', name: 'Entertainment', emoji: '🎬', active: 'bg-pink-500   text-white border-pink-500   shadow-pink-500/30'  },
  { id: 'general',       name: 'General',       emoji: '📰', active: 'bg-blue-600   text-white border-blue-600   shadow-blue-500/30'  },
  { id: 'health',        name: 'Health',        emoji: '🏥', active: 'bg-green-600  text-white border-green-600  shadow-green-500/30' },
  { id: 'science',       name: 'Science',       emoji: '🔬', active: 'bg-purple-600 text-white border-purple-600 shadow-purple-500/30'},
  { id: 'sports',        name: 'Sports',        emoji: '⚽', active: 'bg-orange-500 text-white border-orange-500 shadow-orange-500/30'},
  { id: 'technology',    name: 'Technology',    emoji: '💻', active: 'bg-cyan-600   text-white border-cyan-600   shadow-cyan-500/30'  },
];

export default function CategoryFilter({ selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {CATEGORIES.map((cat) => {
        const isActive = selected === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold border transition-all duration-200 active:scale-95 select-none ${
              isActive
                ? `${cat.active} shadow-lg scale-105`
                : 'bg-[var(--surface)] text-[var(--muted)] border-[var(--border)] hover:border-[var(--border2)] hover:text-[var(--text)] hover:bg-[var(--surface2)] hover:scale-105'
            }`}
          >
            <span className="text-base leading-none">{cat.emoji}</span>
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}
