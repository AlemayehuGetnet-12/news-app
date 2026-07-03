const axios = require('axios');
const config = require('../config');

const CATEGORIES = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

const COUNTRIES = {
  us: 'United States', gb: 'United Kingdom', ca: 'Canada',
  au: 'Australia',     de: 'Germany',        fr: 'France',
  in: 'India',         jp: 'Japan',          br: 'Brazil',
  cn: 'China',         za: 'South Africa',   ng: 'Nigeria',
  et: 'Ethiopia',
};

const LANGUAGES = {
  en: 'English', ar: 'Arabic', de: 'German',
  es: 'Spanish', fr: 'French', it: 'Italian',
  pt: 'Portuguese', ru: 'Russian', zh: 'Chinese',
};

// ── Clean a single article ────────────────────────────────────
const cleanArticle = (a) => ({
  title:       a.title       || 'No title',
  description: a.description || '',
  content:     a.content     || '',
  url:         a.url         || '#',
  urlToImage:  a.urlToImage  || null,
  publishedAt: a.publishedAt || null,
  source: {
    id:   a.source?.id   || null,
    name: a.source?.name || 'Unknown',
  },
  author: a.author || null,
});

// ── Clean full API response ───────────────────────────────────
const cleanResponse = (data) => ({
  totalResults: data.totalResults || 0,
  articles: (data.articles || [])
    .filter((a) => a.title && a.title !== '[Removed]' && a.url)
    .map(cleanArticle),
});

class NewsService {
  constructor() {
    this.client = axios.create({
      baseURL: config.newsApiUrl,
      timeout: 10000,
      params:  { apiKey: config.newsApiKey },
    });
  }

  // ── Core fetch ──────────────────────────────────────────────
  async fetch(endpoint, params = {}) {
    try {
      const { data } = await this.client.get(endpoint, { params });
      return cleanResponse(data);
    } catch (err) {
      if (err.code === 'ECONNABORTED')
        throw new Error('Request timed out. Please try again.');
      if (err.response?.status === 401)
        throw new Error('Invalid API key. Check your NEWS_API_KEY in .env');
      if (err.response?.status === 429)
        throw new Error('API rate limit reached. Please wait and try again.');
      if (err.response)
        throw new Error(err.response.data?.message || 'News API error');
      throw new Error('Network error. Check your connection.');
    }
  }

  // ── Top headlines (default home feed) ──────────────────────
  getLatestNews(page = 1, pageSize = 12) {
    return this.fetch('/top-headlines', {
      country:  'us',
      page,
      pageSize,
    });
  }

  // ── Full-text search ────────────────────────────────────────
  searchNews(query, page = 1, pageSize = 12, language = 'en') {
    return this.fetch('/everything', {
      q:        query,
      sortBy:   'publishedAt',
      language,
      page,
      pageSize,
    });
  }

  // ── Filter by category ──────────────────────────────────────
  getByCategory(category, page = 1, pageSize = 12) {
    return this.fetch('/top-headlines', {
      country:  'us',
      category,
      page,
      pageSize,
    });
  }

  // ── Filter by country ───────────────────────────────────────
  getByCountry(country, page = 1, pageSize = 12) {
    return this.fetch('/top-headlines', {
      country,
      page,
      pageSize,
    });
  }

  // ── Filter by language ──────────────────────────────────────
  getByLanguage(language, page = 1, pageSize = 12) {
    return this.fetch('/everything', {
      q:        'news',
      language,
      sortBy:   'publishedAt',
      page,
      pageSize,
    });
  }

  // ── Filter by source ────────────────────────────────────────
  getBySource(sourceId, page = 1, pageSize = 12) {
    return this.fetch('/everything', {
      sources:  sourceId,
      sortBy:   'publishedAt',
      page,
      pageSize,
    });
  }

  // ── Trending — most popular in last 24h ─────────────────────
  getTrending(page = 1, pageSize = 10) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return this.fetch('/everything', {
      q:        'breaking OR trending OR latest',
      sortBy:   'popularity',
      language: 'en',
      from:     yesterday.toISOString().split('T')[0],
      page,
      pageSize,
    });
  }

  // ── Top headlines (small set for hero/banner) ───────────────
  getTopHeadlines(pageSize = 6) {
    return this.fetch('/top-headlines', {
      country:  'us',
      pageSize,
    });
  }

  // ── Combined search + category + country ────────────────────
  async getNews({ search, category, country, language, page = 1, pageSize = 12 } = {}) {
    if (search)   return this.searchNews(search, page, pageSize, language);
    if (category) return this.getByCategory(category, page, pageSize);
    if (country)  return this.getByCountry(country, page, pageSize);
    if (language) return this.getByLanguage(language, page, pageSize);
    return this.getLatestNews(page, pageSize);
  }

  // ── Static metadata ─────────────────────────────────────────
  getCategories() { return CATEGORIES; }
  getCountries()  { return COUNTRIES;  }
  getLanguages()  { return LANGUAGES;  }
}

module.exports = new NewsService();
