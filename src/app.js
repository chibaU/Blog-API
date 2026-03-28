const express    = require('express');
const cors       = require('cors');
const corsOptions  = require('./config/corsOptions');
const { apiLimiter } = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', apiLimiter);

app.use('/api/auth',  require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));

app.use(errorHandler);

module.exports = app;

