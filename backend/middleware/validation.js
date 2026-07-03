const VALID_CATEGORIES = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
const VALID_COUNTRIES  = ['us', 'gb', 'ca', 'au', 'de', 'fr', 'in', 'jp', 'br', 'cn', 'za', 'ng', 'et'];

const fail = (res, msg) => res.status(400).json({ success: false, message: msg });

const validateCategory = (req, res, next) => {
  const { category } = req.query;
  if (category && !VALID_CATEGORIES.includes(category))
    return fail(res, `Invalid category. Valid: ${VALID_CATEGORIES.join(', ')}`);
  next();
};

const validateSearchQuery = (req, res, next) => {
  const q = req.query.q || req.query.search;
  if (q !== undefined && q.trim().length < 2)
    return fail(res, 'Search query must be at least 2 characters');
  next();
};

const validateCountry = (req, res, next) => {
  const { country } = req.query;
  if (country && !VALID_COUNTRIES.includes(country))
    return fail(res, `Invalid country code. Valid: ${VALID_COUNTRIES.join(', ')}`);
  next();
};

module.exports = { validateCategory, validateSearchQuery, validateCountry };
