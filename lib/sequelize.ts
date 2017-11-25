import {Sequelize} from 'sequelize-typescript';

export const sequelize = new Sequelize({
  dialect: 'mysql',
  database: 'movies',
  username: 'root',
  password: '',
  modelPaths: [__dirname + '/models']
});
