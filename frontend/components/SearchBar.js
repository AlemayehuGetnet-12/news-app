'use client';

import { useState, useRef } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ onSearch, initialValue = '' }) {
  const [query,    setQuery]    = useState(initialValue);
  const [focused,  setFocused]  = useState(false);
  const inputRef = useRef(null);

  const submit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  const clear = () => {
    setQuery('');
    onSearch('');
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={submit} className="w-full max-w-2xl mx-auto">
      <div className={`flex items-center gap-2 bg-[var(--surface)] rounded-2xl px-4 py-1.5 transition-all duration-300 ${
        focused
          ? 'border-2 border-[var(--accent)] shadow-xl shadow-blue-500/15 ring-4 ring-blue-500/10'
          : 'border-2 border-[var(--border)] shadow-md hover:border-[var(--border2)] hover:shadow-lg'
      }`}>

        <Search className={`w-4 h-4 flex-shrink-0 transition-colors duration-200 ${focused ? 'text-[var(--accent)]' : 'text-[var(--muted)]'}`} strokeWidth={2.5} />

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Search headlines, topics, keywords..."
          className="flex-1 bg-transparent py-2.5 outline-none text-sm font-medium text-[var(--text)] placeholder-[var(--muted2)]"
        />

        {query && (
          <button type="button" onClick={clear}
            className="w-6 h-6 flex items-center justify-center rounded-lg text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface2)] transition-all duration-150">
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        <button
          type="submit"
          disabled={!query.trim()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white
            bg-gradient-to-r from-blue-600 to-indigo-600
            hover:from-blue-500 hover:to-indigo-500
            disabled:opacity-40 disabled:cursor-not-allowed
            shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50
            active:scale-95 transition-all duration-200"
        >
          <Search className="w-3.5 h-3.5" strokeWidth={2.5} />
          Search
        </button>
      </div>
    </form>
  );
}
