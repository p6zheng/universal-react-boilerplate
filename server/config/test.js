export default {
  cookie: {
    secret: process.env.COOKIE_SECRET
  },
  session: {
    secret: process.env.SESSION_SECRET
  },
  server: {
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT || 3000
  },
  mongo: {
    url: 'mongodb://localhost:27017/TestDB'
  },
  log: {
    console: 'error',
    file: 'error',
    color: true
  }
};