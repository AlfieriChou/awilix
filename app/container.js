const awilix = require('awilix')
const container = awilix.createContainer()
const HelloService = require('./services/hello')

container.register({
  helloService: awilix.asClass(HelloService).scoped()
})

module.exports = container
