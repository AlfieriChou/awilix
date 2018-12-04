const Koa = require('koa')
const router = require('./app/router')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const koabody = require('koa-body')
const container = require('./app/container')

const app = new Koa()

app.use((ctx, next) => {
  if (ctx.request.method === 'OPTIONS') {
    ctx.response.status = 200
  }
  ctx.set('Access-Control-Allow-Origin', ctx.request.header.origin)
  ctx.set('Access-Control-Allow-Credentials', true)
  ctx.set('Access-Control-Max-Age', 86400000)
  ctx.set('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE')
  ctx.set('Access-Control-Allow-Headers', 'x-requested-with, accept, origin, content-type')
  ctx.scope = container.createScope()
  try {
    next()
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500
    ctx.body = {
      code: ctx.status,
      message: err.message,
      stack: err.stack
    }
  }
})
app
  .use(logger())
  .use(koabody({}))
  .use(router.middleware())
  .use(bodyParser())

app.listen(3000)
console.log('✅  The server is running at http://localhost:3000')
