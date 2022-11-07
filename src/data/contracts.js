// const { sequelize } = require('../model')

// const { Contract } = sequelize.models

// exports.findOne = (filter) => Contract.findOne(filter)

class ContractData {
  constructor (sequelizeContractModel) {
    this.sequelizeContractModel = sequelizeContractModel
  }

  async getById (id) {
    return this.sequelizeContractModel.findOne({ where: { id } })
  }
}

module.exports = ContractData
