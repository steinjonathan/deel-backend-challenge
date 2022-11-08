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

  async getNotTerminatedContractsByProfile (profileId, limit, offset) {
    return this.sequelizeContractModel.findAll({
      where: {
        [Op.or]: [
          { ClientId: profileId },
          { ContractorId: profileId }
        ],
        status: {
          [Op.or]: ['new', 'in_progress']
        }
      },
      limit,
      offset
    })
  }
}

module.exports = ContractData
