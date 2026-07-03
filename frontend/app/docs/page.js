export const metadata = {
  title: 'App Docs — NewsFlow',
  description: 'NewsFlow API and usage documentation.',
};

const ENDPOINTS = [
  {
    method: 'GET',
    path: '/api/news',
    desc: 'Fetch latest general news articles.',
    params: [
      { name: 'page',     type: 'number', desc: 'Page number (default: 1)' },
      { name: 'pageSize', type: 'number', desc: 'Results per page (default: 20)' },
    ],
  },
  {
    method: 'GET',
    path: '/api/news/top-headlines',
    desc: 'Fetch top headlines by country.',
    params: [
      { name: 'country',  type: 'string', desc: 'Country code e.g. us, gb, et' },
      { name: 'category', type: 'string', desc: 'Category filter' },
    ],
  },
  {
    method: 'GET',
    path: '/api/news/search',
    desc: 'Search articles by keyword.',
    params: [
      { name: 'q',    type: 'string', desc: 'Search query (required)' },
      { name: 'page', type: 'number', desc: 'Page number' },
    ],
  },
  {
    method: 'GET',
    path: '/api/news/category',
    desc: 'Get articles by category.',
    params: [
      { name: 'category', type: 'string', desc: 'business | technology | sports | health | science | entertainment' },
    ],
  },
  {
    method: 'GET',
    path: '/api/news/trending',
    desc: 'Fetch trending news articles.',
    params: [],
  },
  {
    method: 'GET',
    path: '/api/news/country',
    desc: 'Get news filtered by country.',
    params: [
      { name: 'country', type: 'string', desc: 'Country code e.g. us, gb' },
    ],
  },
  {
    method: 'GET',
    path: '/api/news/categories',
    desc: 'Returns list of all supported categories.',
    params: [],
  },
  {
    method: 'GET',
    path: '/api/news/countries',
    desc: 'Returns list of all supported countries.',
    params: [],
  },
];

const STACK = [
  { label: 'Frontend',  value: 'Next.js 14 (App Router), Tailwind CSS, Axios' },
  { label: 'Backend',   value: 'Node.js, Express.js, Morgan' },
  { label: 'Data',      value: 'NewsAPI.org REST API' },
  { label: 'Auth',      value: 'API key via .env (NEWS_API_KEY)' },
  { label: 'Ports',     value: 'Frontend: 3000 · Backend: 5000' },
];

const METHOD_COLOR = {
  GET:    { background: 'rgba(34,197,94,0.15)',  color: '#16a34a', border: '1px solid rgba(34,197,94,0.3)'  },
};

export default function DocsPage() {
  return (
    <div className="max-w-4xl mx-auto py-10 space-y-14">

      {/* Hero */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold"
          style={{ background: 'var(--accent-ll)', color: 'var(--accent)', border: '1px solid var(--accent-l)' }}>
          v1.0.0 · NewsFlow Docs
        </div>
        <h1 className="text-4xl font-black tracking-tight" style={{ color: 'var(--text)' }}>
          App Documentation
        </h1>
        <p className="text-base leading-relaxed max-w-2xl" style={{ color: 'var(--muted)' }}>
          NewsFlow is a full-stack news aggregator built with Next.js and Express.
          The backend proxies requests to NewsAPI and exposes a clean REST API consumed by the frontend.
          Built by <span className="font-black" style={{ color: 'var(--accent)' }}>Alemayehu Getnet Amare</span>.
        </p>
      </div>

      {/* Tech Stack */}
      <section className="space-y-4">
        <h2 className="text-lg font-black tracking-tight" style={{ color: 'var(--text)' }}>Tech Stack</h2>
        <div className="rounded-2xl overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
          {STACK.map(({ label, value }, i) => (
            <div key={label}
              className="flex items-start gap-4 px-5 py-3.5 text-sm"
              style={{
                background: i % 2 === 0 ? 'var(--surface)' : 'var(--surface2)',
                borderBottom: i < STACK.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
              <span className="w-24 font-black flex-shrink-0" style={{ color: 'var(--muted)' }}>{label}</span>
              <span style={{ color: 'var(--text)' }}>{value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Base URL */}
      <section className="space-y-4">
        <h2 className="text-lg font-black tracking-tight" style={{ color: 'var(--text)' }}>Base URL</h2>
        <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl font-mono text-sm"
          style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--accent)' }}>
          http://localhost:5000
        </div>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>
          All endpoints are prefixed with <span className="font-mono font-bold" style={{ color: 'var(--text)' }}>/api/news</span>.
          A health check is available at <span className="font-mono font-bold" style={{ color: 'var(--text)' }}>/api/health</span>.
        </p>
      </section>

      {/* Endpoints */}
      <section className="space-y-5">
        <h2 className="text-lg font-black tracking-tight" style={{ color: 'var(--text)' }}>Endpoints</h2>
        <div className="space-y-4">
          {ENDPOINTS.map(({ method, path, desc, params }) => (
            <div key={path} className="rounded-2xl overflow-hidden border" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
              {/* Endpoint header */}
              <div className="flex items-center gap-3 px-5 py-3.5 border-b" style={{ borderColor: 'var(--border)', background: 'var(--surface2)' }}>
                <span className="text-xs font-black px-2.5 py-1 rounded-lg" style={METHOD_COLOR[method]}>
                  {method}
                </span>
                <code className="text-sm font-mono font-bold" style={{ color: 'var(--text)' }}>{path}</code>
              </div>
              {/* Description + params */}
              <div className="px-5 py-4 space-y-3">
                <p className="text-sm" style={{ color: 'var(--muted)' }}>{desc}</p>
                {params.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-black uppercase tracking-widest" style={{ color: 'var(--muted2)' }}>Query Params</p>
                    {params.map((p) => (
                      <div key={p.name} className="flex items-start gap-3 text-sm">
                        <code className="font-mono font-bold px-2 py-0.5 rounded-lg flex-shrink-0"
                          style={{ background: 'var(--accent-ll)', color: 'var(--accent)', fontSize: '11px' }}>
                          {p.name}
                        </code>
                        <span className="text-xs px-2 py-0.5 rounded-lg flex-shrink-0"
                          style={{ background: 'var(--surface2)', color: 'var(--muted)', border: '1px solid var(--border)' }}>
                          {p.type}
                        </span>
                        <span style={{ color: 'var(--muted)' }}>{p.desc}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Setup */}
      <section className="space-y-4">
        <h2 className="text-lg font-black tracking-tight" style={{ color: 'var(--text)' }}>Quick Setup</h2>
        <div className="space-y-3">
          {[
            { step: '1', label: 'Get API key', cmd: 'Register at newsapi.org/register and copy your key' },
            { step: '2', label: 'Set env var', cmd: 'NEWS_API_KEY=your_key_here  →  news-app/backend/.env' },
            { step: '3', label: 'Start backend', cmd: 'cd news-app/backend && npm run dev' },
            { step: '4', label: 'Start frontend', cmd: 'cd news-app/frontend && npm run dev' },
          ].map(({ step, label, cmd }) => (
            <div key={step} className="flex items-start gap-4 px-5 py-4 rounded-2xl border"
              style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0"
                style={{ background: 'var(--accent-ll)', color: 'var(--accent)' }}>
                {step}
              </div>
              <div className="space-y-1">
                <p className="text-sm font-black" style={{ color: 'var(--text)' }}>{label}</p>
                <code className="text-xs font-mono" style={{ color: 'var(--muted)' }}>{cmd}</code>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
