class ProfileData {
  constructor (sequelizeProfileModel) {
    this.sequelizeProfileModel = sequelizeProfileModel
  }

  async getById (id, transaction) {
    return this.sequelizeProfileModel.findOne({
      where: {
        id
      },
      transaction
    })
  }

  async decreaseBalance (id, amount, transaction) {
    console.log('decreaseBalance', id)
    return this.sequelizeProfileModel.decrement('balance', {
      by: amount,
      where: {
        id
      },
      transaction
    })
  }

  async increaseBalance (id, amount, transaction) {
    console.log('increaseBalance', id)
    return this.sequelizeProfileModel.increment('balance', {
      by: amount,
      where: {
        id
      },
      transaction
    })
  }
}

module.exports = ProfileData
