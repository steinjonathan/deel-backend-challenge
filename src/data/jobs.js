const { Op } = require('sequelize')

class JobData {
  constructor (sequelizeJobModel, sequelizeContractModel) {
    this.sequelizeJobModel = sequelizeJobModel
    this.sequelizeContractModel = sequelizeContractModel
  }

  async getActiveContractsUnpaidJobsByProfile (profileId, limit, offset) {
    return this.sequelizeJobModel.findAll({
      where: {
        paid: { [Op.not]: true }
      },
      include: {
        model: this.sequelizeContractModel,
        as: 'Contract',
        where: {
          [Op.or]: [
            { ClientId: profileId },
            { ContractorId: profileId }
          ],
          status: 'in_progress'
        },
        required: true
      },
      limit,
      offset
    })
  }

  async getByIdByClientId (id, clientId, transaction) {
    return this.sequelizeJobModel.findOne({
      where: {
        id
      },
      include: {
        model: this.sequelizeContractModel,
        as: 'Contract',
        where: {
          [Op.or]: [
            { ClientId: clientId }
          ]
        },
        required: true
      },
      transaction
    })
  }

  async payJob (id, transaction) {
    console.log('payJob', id)
    return this.sequelizeJobModel.update({
      paid: true,
      paymentDate: new Date()
    }, {
      where: {
        id
      },
      transaction
    })
  }
}

module.exports = JobData
