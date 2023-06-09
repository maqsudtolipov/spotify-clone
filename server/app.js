const express = require('express');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const songRouter = require('./routes/songRoutes');
const userRouter = require('./routes/userRoutes');
const playlistRouter = require('./routes/playlistRoutes');

const app = express();

// Middlewares
// app.use(cors());
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//   })
// );
// app.options('*', cors());

app.use(
  cors({
    // origin: 'https://maqsud-spotify.vercel.app',
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());

// Static folder
app.use('/public', express.static('public'));

// Routes
app.use('/api/v1/songs', songRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/playlists', playlistRouter);

// Unhandled routes
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server`,
  });
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global error handler
app.use(globalErrorHandler);

module.exports = app;
