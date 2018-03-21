export default {
  server: {
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT || 3000
  },
  log: {
    console: 'error',
    file: 'error',
    color: true
  }
};