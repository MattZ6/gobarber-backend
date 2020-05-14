export default {
  jwt: {
    secret: process.env.APP_SECRET || 'batata_doce',
    expiresIn: '1d',
  },
};
