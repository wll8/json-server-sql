import { Sequelize } from 'sequelize';
import type { Options } from 'sequelize';
function connect(config: Options) {
  const sequelize = new Sequelize(config);
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch((error: any) => {
      console.error('Unable to connect to the database:', error);
    });
  return sequelize;
}

export default connect;
