/* eslint-disable @typescript-eslint/no-floating-promises */
import express from 'express';
import DataBase from './adapters/database';
import connect from './app/database';

import Service from './service/service';
import type { ServiceConstructor } from './service/service';
import cors from 'cors';
import { isObject } from './utils';
import DataToModel from './transform-model/data-to-model';

function fromEntries(entries: Array<any>): { [key: string]: any } {
  return entries.reduce((obj, [key, value]) => {
    obj[key] = value;
    return obj;
  }, {} as { [key: string]: any });
}

function createApp(db: DataBase, options: { service: ServiceConstructor }) {
  const Service = options.service;
  const service = new Service(db);
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.get('/:name', async (req, res, next) => {
    const { name = '' } = req.params;
    const query = fromEntries(
      Object.entries(req.query)
        .map(([key, value]) => {
          if (
            ['_start', '_end', '_limit', '_page', '_per_page'].includes(key) &&
            typeof value === 'string'
          ) {
            return [key, parseInt(value)];
          } else {
            return [key, value];
          }
        })
        .filter(([_, value]) => !Number.isNaN(value))
    );
    res.locals['data'] = await service.find(name, query);
    res.json({
      code: 0,
      data: res.locals['data'],
    });
  });
  app.get('/:name/:id', async (req, res, next) => {
    const { name = '', id = '' } = req.params;
    res.locals['data'] = await service.findById(name, id);
    res.json({
      code: 0,
      data: res.locals['data'],
    });
  });

  app.post('/:name', async (req, res, next) => {
    const { name = '' } = req.params;
    if (isObject(req.body)) {
      res.locals['data'] = await service.create(name, req.body);
    }
    res.json({
      code: 0,
      data: res.locals['data'],
    });
  });
  app.put('/:name/:id', async (req, res) => {
    const { name = '', id = '' } = req.params;
    if (isObject(req.body)) {
      res.locals['data'] = await service.updateById(name, id, req.body);
    }
    res.json({
      code: 0,
      data: res.locals['data'],
    });
  });
  app.delete('/:name/:id', async (req, res, next) => {
    const { name = '', id = '' } = req.params;
    res.locals['data'] = await service.destroyById(name, id);
    res.json({
      code: 0,
      data: res.locals['data'],
    });
  });
  return app;
}

const config: any = {
  host: 'localhost',
  port: 3306,
  database: 'demos',
  username: 'root',
  password: 'root',
  dialect: 'mysql',
};
const data = {
  address: [
    {
      province: '北京',
      city: '北京',
      district: '东城区',
      street: '东直门',
    },
  ],
};
const sequelize = connect(config);

(async function () {
  const db = new DataBase(data, sequelize);
  const dataToModel = new DataToModel(sequelize);
  const app = createApp(db, { service: Service });
  await dataToModel.genterModelTable(data);
  app.listen(9000, () => {
    console.log('服务器启动成功');
  });
})();
