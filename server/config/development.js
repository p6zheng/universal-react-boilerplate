export default {
  server: {
    host: 'localhost',
    port: process.env.SERVER_PORT || 3000
  },
  log: {
    console: 'debug',
    file: 'info',
    color: true
  }
};