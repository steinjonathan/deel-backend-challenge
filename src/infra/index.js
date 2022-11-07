const { sequelize } = require('./model')
const { Contract } = sequelize.models

const ContractService = require('../services/contract')

const ContractData = require('./../data/contracts')

module.exports = (app) => (
  require('../routes/contracts')({
    app,
    contractService: new ContractService({
      contractsDataRepository: new ContractData(Contract)
    })
  })
)
