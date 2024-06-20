import type { Sequelize } from 'sequelize';
import type { IQuery, IService, Item } from './type';

export default class Service implements IService {
  #db: any;
  sequelize: Sequelize;
  constructor(db: any) {
    this.#db = db;
    this.sequelize = this.#db.sequelize;
  }

  async find(name: string, query: IQuery) {
    query._limit = Number(query._limit) || 10;
    query._page = Number(query._page) || 1;

    const infos = await this.sequelize.models[name].findAll<any>({
      limit: query._limit,
      offset: (query._page - 1) * query._limit,
    });
    return infos;
  }

  async findById(name: string, id: string) {
    const info = await this.sequelize.models[name].findByPk<any>(id);
    return info;
  }
  async create(name: string, data: Item) {
    const info = await this.sequelize.models[name].create<any>(data);
    return info;
  }

  // async update(name: string, data: Item) {
  //   return undefined;
  // }

  // async patch(name: string, data: Item) {
  //   console.log('todo', name, data);
  //   return undefined;
  // }

  async updateById(name: string, id: string, body: Item) {
    const model = this.sequelize.models[name];
    await model.update(body, {
      where: { id },
    });
    const info = await model.findByPk<any>(id);
    return info;
  }

  // async patchById(name: string, id: string, body: Item) {
  //   console.log('todo', name, id, body);
  //   return undefined;
  // }

  async destroyById(name: string, id: string) {
    const model = this.sequelize.models[name];
    const info = await this.sequelize.models[name].findByPk<any>(id);
    await model.destroy<any>({ where: { id } });
    return info;
  }
}
export interface ServiceConstructor {
  new (db: any): Service;
}
