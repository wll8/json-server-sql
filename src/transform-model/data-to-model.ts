import { Item } from '../service/type';
import { isNotEmptyArray, isObject } from '../utils';
import { jsonToModel } from '../utils/json-to-model';
// types
import type { Model, ModelAttributes, Sequelize } from 'sequelize';

export type ModelsType = {
  [key: string]: ModelAttributes;
};

export default class DataToModel {
  constructor(private sequelize: Sequelize) {}
  dataToModels(data: Item) {
    const entries = Object.entries(data);
    const models: ModelsType = {};
    for (const [key, value] of entries) {
      if (isNotEmptyArray(value)) {
        const item = (value as any[])[0];
        if (isObject(item)) {
          const model = jsonToModel(item);
          models[key] = model;
        }
      }
    }
    return models;
  }

  // 生成模型表
  async genterModelTable(data: Item, { force = false, alter = true } = {}) {
    const models = this.dataToModels(data);
    const tables = Object.entries(models);
    const promises: Promise<Model<any, any>>[] = [];
    for (const [name, value] of tables) {
      const promise = this.sequelize.define(name, value).sync({
        force,
        alter,
      });
      promises.push(promise);
    }
    return Promise.all(promises);
  }
}
