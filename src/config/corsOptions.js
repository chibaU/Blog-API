const allowedOrigins = [
  process.env.CLIENT_URL,        // من الـ .env
  'http://localhost:3000',       // للتطوير المحلي
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // السماح لـ Postman والـ curl (no origin) في التطوير
    if (!origin && process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: origin ${origin} not allowed`));
    }
  },
  credentials: true,
};

module.exports = corsOptions;