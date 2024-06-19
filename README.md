# json-server-sql

[![npm package][npm-img]][npm-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
[![Code Coverage][codecov-img]][codecov-url]

> json-server 的 sql 适配器。

## Install

```bash
npm install json-server-sql
```

## Usage

```ts
import { sqlService } from 'json-server-sql';
import { createApp } from 'json-server';
const app = createApp(db, {
  service: sqlService
})
app.listen(3000, () => {
  console.log('json-server-sql is running')
})
```

## API

### myPackage(input, options?)

#### input

Type: `string`

Lorem ipsum.

#### options

Type: `object`

##### postfix

Type: `string`
Default: `rainbows`

Lorem ipsum.


## Development

``` sh
# 安装依赖
pnpm i

## 启动
pnpm run dev

## 测试
pnpm run test

## 编译
pnpm run build
```

[build-img]:https://github.com/wll8/json-server-sql/actions/workflows/release.yml/badge.svg
[build-url]:https://github.com/wll8/json-server-sql/actions/workflows/release.yml
[downloads-img]:https://img.shields.io/npm/dt/json-server-sql
[downloads-url]:https://www.npmtrends.com/json-server-sql
[npm-img]:https://img.shields.io/npm/v/json-server-sql
[npm-url]:https://www.npmjs.com/package/json-server-sql
[issues-img]:https://img.shields.io/github/issues/ryansonshine/json-server-sql
[issues-url]:https://github.com/wll8/json-server-sql/issues
[codecov-img]:https://codecov.io/gh/ryansonshine/json-server-sql/branch/main/graph/badge.svg
[codecov-url]:https://codecov.io/gh/ryansonshine/json-server-sql