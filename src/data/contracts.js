const { Op } = require('sequelize')

// const { Contract } = sequelize.models

// exports.findOne = (filter) => Contract.findOne(filter)

class ContractData {
  constructor (sequelizeContractModel) {
    this.sequelizeContractModel = sequelizeContractModel
  }

  async getByIdAndProfile (id, profileId) {
    return this.sequelizeContractModel.findOne({
      where: {
        id,
        [Op.or]: [
          { ClientId: profileId },
          { ContractorId: profileId }
        ]
      }
    })
  }
}

module.exports = ContractData
