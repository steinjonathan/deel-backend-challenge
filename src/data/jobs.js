const sequelize = require('sequelize')

class JobData {
  constructor (sequelizeJobModel, sequelizeContractModel, sequelizeProfileModel) {
    this.sequelizeJobModel = sequelizeJobModel
    this.sequelizeContractModel = sequelizeContractModel
    this.sequelizeProfileModel = sequelizeProfileModel
  }

  async getActiveContractsUnpaidJobsByProfile (profileId, limit, offset) {
    return this.sequelizeJobModel.findAll({
      where: {
        paid: { [sequelize.Op.not]: true }
      },
      include: {
        model: this.sequelizeContractModel,
        as: 'Contract',
        where: {
          [sequelize.Op.or]: [
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
          [sequelize.Op.or]: [
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

  async getSumOfPaidJobsPerContractor (startDate, endDate) {
    return this.sequelizeJobModel.findAll({
      attributes: [
        [sequelize.fn('sum', sequelize.col('price')), 'total']
      ],
      where: {
        paid: true,
        paymentDate: {
          [sequelize.Op.between]: [startDate, endDate]
        }
      },
      include: {
        model: this.sequelizeContractModel,
        as: 'Contract',
        attributes: ['ContractorId'],
        include: [{
          model: this.sequelizeProfileModel,
          as: 'Contractor',
          attributes: [
            'profession'
          ]
        }]
      },
      group: 'Contract.Contractor.profession',
      order: [['total', 'DESC']]
    })
  }
}

module.exports = JobData
