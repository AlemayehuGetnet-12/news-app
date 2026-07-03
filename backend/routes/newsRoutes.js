const { Router } = require('express');
const c = require('../controllers/newsController');
const { validateCategory, validateSearchQuery, validateCountry } = require('../middleware/validation');

const router = Router();

// ── Metadata ──────────────────────────────────────────────────
router.get('/categories', c.getCategories);
router.get('/countries',  c.getCountries);
router.get('/languages',  c.getLanguages);

// ── Specific feeds ────────────────────────────────────────────
router.get('/top-headlines', c.getTopHeadlines);
router.get('/trending',      c.getTrending);
router.get('/search',        validateSearchQuery, c.searchNews);
router.get('/category',      validateCategory,    c.getByCategory);
router.get('/country',       validateCountry,     c.getByCountry);
router.get('/language',      c.getByLanguage);
router.get('/source',        c.getBySource);

// ── Unified endpoint (supports all query params) ──────────────
router.get('/', validateCategory, validateSearchQuery, validateCountry, c.getNews);

module.exports = router;
