const Router = require('koa-router')
const router = new Router()

router.get('/hello', async (ctx) => {
  const HelloService = ctx.scope.resolve('helloService')
  const message = HelloService.hello()
  ctx.status = 200
  ctx.body = message
})

module.exports = router
