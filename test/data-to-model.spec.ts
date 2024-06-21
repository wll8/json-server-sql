import DataToModel from '../src/transform-model/data-to-model';
import connect from '../src/app/database';

describe('dataToModel', () => {
  const sequelize = connect({
    host: 'localhost',
    port: 3306,
    database: 'demos',
    username: 'root',
    password: 'root',
    dialect: 'mysql',
  });
  const dataToModel = new DataToModel(sequelize);
  it('测试dataToModels', () => {
    const data = {
      user: [
        {
          name: 'lcy',
          age: 18,
          telPhone: '18586856279',
        },
      ],
      address: [
        {
          province: '北京',
          city: '北京',
          district: '东城区',
          street: '东直门',
        },
      ],
    };
    const result = dataToModel.dataToModels(data);
    expect(result).toMatchInlineSnapshot(`
      Object {
        "address": Object {
          "city": Object {
            "allowNull": true,
            "type": [Function],
          },
          "district": Object {
            "allowNull": true,
            "type": [Function],
          },
          "province": Object {
            "allowNull": true,
            "type": [Function],
          },
          "street": Object {
            "allowNull": true,
            "type": [Function],
          },
        },
        "user": Object {
          "age": Object {
            "allowNull": true,
            "type": [Function],
          },
          "name": Object {
            "allowNull": true,
            "type": [Function],
          },
          "telPhone": Object {
            "allowNull": true,
            "type": [Function],
          },
        },
      }
    `);
  });

  it('测试genterModelTable, 在数据库中生成表', async () => {
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
    const result = await dataToModel.genterModelTable(data);
    expect(result).toMatchInlineSnapshot(`
      Array [
        [Function],
      ]
    `);
  });
});
