const env = process.env.NODE_ENV || 'development';
export default require('./config').default[env];