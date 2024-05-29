# json-server-sql

json-server 的 sql 适配器。

使用方式：

``` js
const sqlService = require('json-server-sql')
const { createApp } = require('json-server')
const app = createApp(db, {
  service: sqlService
})
app.listen(3000, () => {
  console.log('json-server-sql is running')
})
```