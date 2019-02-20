import {Sequelize} from 'sequelize-typescript';
import {Op} from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  operatorsAliases: Op,
  database: 'movies',
  storage: ':memory:',
  models: [__dirname + '/models']
});
