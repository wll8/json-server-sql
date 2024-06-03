import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  host: 'localhost',
  port: 3306,
  database: 'demos',
  username: 'root',
  password: 'root',
  dialect: 'mysql',
});
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error: any) => {
    console.error('Unable to connect to the database:', error);
  });
export default sequelize;
