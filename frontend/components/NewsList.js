'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { ExternalLink, Clock, Building2, ChevronDown, AlertCircle, RefreshCw, BookOpen } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function NewsList({ search, category, country }) {
  const [articles,    setArticles]    = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error,       setError]       = useState(null);
  const [page,        setPage]        = useState(1);
  const [hasMore,     setHasMore]     = useState(true);
  const [total,       setTotal]       = useState(0);

  useEffect(() => {
    setArticles([]);
    setPage(1);
    setHasMore(true);
    setError(null);
    load(1, true);
  }, [search, category, country]);

  const load = async (p = 1, reset = false) => {
    try {
      reset ? setLoading(true) : setLoadingMore(true);
      setError(null);
      const params = { page: p, pageSize: 12 };
      if (search)   params.search   = search;
      if (category) params.category = category;
      if (country)  params.country  = country;
      const { data } = await axios.get(`${API}/news`, { params });
      const incoming = data.articles || [];
      setArticles((prev) => reset ? incoming : [...prev, ...incoming]);
      setTotal(data.totalResults || 0);
      setHasMore(incoming.length === 12);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load news. Make sure the backend is running on port 5000.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = () => { const next = page + 1; setPage(next); load(next); };

  if (loading) return <SkeletonGrid />;

  if (error) return (
    <div className="flex flex-col items-center gap-5 py-24 text-center animate-fade-in">
      <div className="w-20 h-20 rounded-3xl bg-[var(--red-l)] flex items-center justify-center">
        <AlertCircle className="w-10 h-10 text-[var(--red)]" />
      </div>
      <div className="space-y-1">
        <p className="font-black text-xl text-[var(--text)]">Something went wrong</p>
        <p className="text-sm text-[var(--muted)] max-w-sm leading-relaxed">{error}</p>
      </div>
      <button onClick={() => load(1, true)}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-bold rounded-2xl shadow-lg shadow-blue-500/30 active:scale-95 transition-all duration-200">
        <RefreshCw className="w-4 h-4" /> Try Again
      </button>
    </div>
  );

  if (!articles.length) return (
    <div className="flex flex-col items-center gap-4 py-24 text-center animate-fade-in">
      <div className="w-20 h-20 rounded-3xl bg-[var(--surface2)] flex items-center justify-center text-4xl">🔍</div>
      <div className="space-y-1">
        <p className="font-black text-xl text-[var(--text)]">No articles found</p>
        <p className="text-sm text-[var(--muted)]">Try a different search term or category</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Results bar */}
      <div className="flex items-center justify-between px-1">
        <p className="text-sm text-[var(--muted)] font-medium">
          <span className="font-black text-[var(--text)]">{articles.length}</span>
          {total > 0 && <> of <span className="font-black text-[var(--text)]">{total.toLocaleString()}</span></>} articles
          {search   && <> for <span className="font-bold text-[var(--accent)]">"{search}"</span></>}
          {category && <> in <span className="font-bold text-[var(--accent)] capitalize">{category}</span></>}
          {country  && <> · <span className="font-bold text-[var(--accent)] uppercase">{country}</span></>}
        </p>
        <div className="flex items-center gap-1.5 text-xs text-[var(--muted)] font-medium">
          <span className="live-dot scale-75" />
          Live
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, i) => (
          <NewsCard key={`${article.url}-${i}`} article={article} index={i} />
        ))}
      </div>

      {/* Load more */}
      {hasMore && (
        <div className="flex justify-center pt-4">
          <button
            onClick={loadMore}
            disabled={loadingMore}
            className="flex items-center gap-2.5 px-8 py-3.5 rounded-2xl font-bold text-sm text-white
              bg-gradient-to-r from-blue-600 to-indigo-600
              hover:from-blue-500 hover:to-indigo-500
              disabled:opacity-50 disabled:cursor-not-allowed
              shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50
              active:scale-95 transition-all duration-200"
          >
            {loadingMore
              ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              : <ChevronDown className="w-4 h-4" strokeWidth={2.5} />
            }
            {loadingMore ? 'Loading...' : 'Load More Articles'}
          </button>
        </div>
      )}
    </div>
  );
}

function NewsCard({ article, index }) {
  const [imgErr, setImgErr] = useState(false);
  if (!article.title || article.title === '[Removed]') return null;

  const date    = article.publishedAt ? new Date(article.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : null;
  const timeAgo = article.publishedAt ? getTimeAgo(new Date(article.publishedAt)) : null;

  return (
    <article
      className="group flex flex-col bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden card-hover animate-fade-up transition-colors duration-300"
      style={{ animationDelay: `${(index % 12) * 55}ms`, opacity: 0 }}
    >
      {/* Image */}
      <div className="relative h-52 bg-gradient-to-br from-[var(--surface2)] to-[var(--border)] overflow-hidden flex-shrink-0">
        {article.urlToImage && !imgErr ? (
          <Image
            src={article.urlToImage}
            alt={article.title}
            fill unoptimized
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            onError={() => setImgErr(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-[var(--border2)] opacity-50" />
          </div>
        )}

        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        {/* Source badge */}
        {article.source?.name && (
          <span className="absolute top-3 left-3 bg-black/55 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
            {article.source.name}
          </span>
        )}

        {/* Time badge */}
        {timeAgo && (
          <span className="absolute top-3 right-3 bg-black/55 backdrop-blur-md text-white/90 text-[11px] font-medium px-2.5 py-1 rounded-full">
            {timeAgo}
          </span>
        )}

        {/* Read more overlay button */}
        {article.url && (
          <a href={article.url} target="_blank" rel="noopener noreferrer"
            className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="flex items-center gap-1.5 glass text-white text-xs font-bold px-4 py-2 rounded-full">
              <ExternalLink className="w-3 h-3" /> Open Article
            </span>
          </a>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3 className="font-bold text-[15px] leading-snug line-clamp-2 text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-200">
          {article.title}
        </h3>

        {article.description && (
          <p className="text-sm text-[var(--muted)] line-clamp-3 leading-relaxed flex-1">
            {article.description}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-2 text-[11px] text-[var(--muted2)] pt-2.5 border-t border-[var(--border)] font-medium">
          {article.source?.name && (
            <span className="flex items-center gap-1 truncate">
              <Building2 className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{article.source.name}</span>
            </span>
          )}
          {date && (
            <span className="flex items-center gap-1 ml-auto flex-shrink-0">
              <Clock className="w-3 h-3" />
              {date}
            </span>
          )}
        </div>

        {/* CTA */}
        {article.url && (
          <a href={article.url} target="_blank" rel="noopener noreferrer"
            className="group/btn flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold
              bg-[var(--surface2)] hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600
              text-[var(--muted)] hover:text-white
              border border-[var(--border)] hover:border-transparent
              shadow-sm hover:shadow-lg hover:shadow-blue-500/25
              transition-all duration-250 active:scale-[0.98]">
            Read Full Article
            <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
          </a>
        )}
      </div>
    </article>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden">
          <div className="h-52 skeleton" />
          <div className="p-5 space-y-3">
            <div className="h-4 skeleton rounded-lg w-3/4" />
            <div className="h-4 skeleton rounded-lg" />
            <div className="h-4 skeleton rounded-lg w-5/6" />
            <div className="h-3 skeleton rounded-lg w-2/3 mt-3" />
            <div className="h-3 skeleton rounded-lg w-1/2" />
            <div className="h-10 skeleton rounded-xl mt-4" />
          </div>
        </div>
      ))}
    </div>
  );
}

function getTimeAgo(date) {
  const s = Math.floor((Date.now() - date) / 1000);
  if (s < 60)    return 'Just now';
  if (s < 3600)  return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}
