interface IMailConfig {
  driver: 'etherial' | 'ses';

  defaults: {
    from: {
      name: string;
      email: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'etherial',

  defaults: {
    from: {
      name: 'Equipe GoBarber',
      email: 'equipe@gobarber.com.br',
    },
  },
} as IMailConfig;
