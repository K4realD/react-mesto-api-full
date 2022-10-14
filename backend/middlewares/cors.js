const allowedCors = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://frontendk4d.nomoredomains.icu',
  'http://backendk4d.nomoredomains.icu',
  'https://frontendk4d.nomoredomains.icu',
  'https://backendk4d.nomoredomains.icu',
];

const cors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'DELETE, GET, OPTIONS, PATCH, POST, PUT');

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  next();
  return null;
};

module.exports = cors;
