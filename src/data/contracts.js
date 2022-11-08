const { Op } = require('sequelize')

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
          [Op.ne]: 'terminated'
        }
      },
      limit,
      offset
    })
  }
}

module.exports = ContractData
