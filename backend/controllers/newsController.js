const newsService = require('../services/newsService');

const send = (res, data, page) =>
  res.json({ success: true, totalResults: data.totalResults, page, articles: data.articles });

const newsController = {

  // GET /api/news  — unified: ?search= ?category= ?country= ?language= ?page= ?pageSize=
  async getNews(req, res, next) {
    try {
      const { search, category, country, language, page = 1, pageSize = 12 } = req.query;
      const data = await newsService.getNews({
        search, category, country, language,
        page: +page, pageSize: +pageSize,
      });
      send(res, data, +page);
    } catch (err) { next(err); }
  },

  // GET /api/news/top-headlines
  async getTopHeadlines(req, res, next) {
    try {
      const { pageSize = 6 } = req.query;
      const data = await newsService.getTopHeadlines(+pageSize);
      res.json({ success: true, articles: data.articles });
    } catch (err) { next(err); }
  },

  // GET /api/news/trending
  async getTrending(req, res, next) {
    try {
      const { page = 1, pageSize = 10 } = req.query;
      const data = await newsService.getTrending(+page, +pageSize);
      send(res, data, +page);
    } catch (err) { next(err); }
  },

  // GET /api/news/search?q=
  async searchNews(req, res, next) {
    try {
      const { q, language = 'en', page = 1, pageSize = 12 } = req.query;
      if (!q) return res.status(400).json({ success: false, message: 'q param is required' });
      const data = await newsService.searchNews(q, +page, +pageSize, language);
      send(res, data, +page);
    } catch (err) { next(err); }
  },

  // GET /api/news/category?category=
  async getByCategory(req, res, next) {
    try {
      const { category, page = 1, pageSize = 12 } = req.query;
      if (!category) return res.status(400).json({ success: false, message: 'category param is required' });
      const data = await newsService.getByCategory(category, +page, +pageSize);
      send(res, data, +page);
    } catch (err) { next(err); }
  },

  // GET /api/news/country?country=
  async getByCountry(req, res, next) {
    try {
      const { country, page = 1, pageSize = 12 } = req.query;
      if (!country) return res.status(400).json({ success: false, message: 'country param is required' });
      const data = await newsService.getByCountry(country, +page, +pageSize);
      send(res, data, +page);
    } catch (err) { next(err); }
  },

  // GET /api/news/language?language=
  async getByLanguage(req, res, next) {
    try {
      const { language, page = 1, pageSize = 12 } = req.query;
      if (!language) return res.status(400).json({ success: false, message: 'language param is required' });
      const data = await newsService.getByLanguage(language, +page, +pageSize);
      send(res, data, +page);
    } catch (err) { next(err); }
  },

  // GET /api/news/source?sourceId=
  async getBySource(req, res, next) {
    try {
      const { sourceId, page = 1, pageSize = 12 } = req.query;
      if (!sourceId) return res.status(400).json({ success: false, message: 'sourceId param is required' });
      const data = await newsService.getBySource(sourceId, +page, +pageSize);
      send(res, data, +page);
    } catch (err) { next(err); }
  },

  // GET /api/news/categories
  getCategories(req, res) {
    res.json({ success: true, categories: newsService.getCategories() });
  },

  // GET /api/news/countries
  getCountries(req, res) {
    res.json({ success: true, countries: newsService.getCountries() });
  },

  // GET /api/news/languages
  getLanguages(req, res) {
    res.json({ success: true, languages: newsService.getLanguages() });
  },
};

module.exports = newsController;
