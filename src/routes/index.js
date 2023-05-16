const siteRouter = require('./sites')

module.exports = (app) => {
    app.use('/', siteRouter)
}