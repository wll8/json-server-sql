import { Sequelize } from 'sequelize';
import { Item } from '../service/type';

export default class DataBase {
  sequelize: Sequelize;
  data: Item;
  constructor(data: Item, sequelize: Sequelize) {
    this.data = data;
    this.sequelize = sequelize;
  }
}
