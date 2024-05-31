import { jsonToModel } from '../src/utils/json-to-model';

describe('jsonToModel', () => {
  it('传入data对象返回模型对象', () => {
    const data = {
      name: 'lcy',
      age: 18,
      telPhone: '18586856279',
    };
    const result = jsonToModel(data);
    expect(result).toMatchInlineSnapshot(`
      Object {
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
      }
    `);
  });
});
