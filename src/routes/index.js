const { getProfile } = require('./../middleware/getProfile')

const { getById } = require('./contracts.js')

module.exports = (app) => {
  /**
     * FIX ME!
     * @returns contract by id
     */
  app.get('/contracts/:id', getProfile, getById)
}
