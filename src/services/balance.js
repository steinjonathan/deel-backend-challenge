class BalanceService {
  constructor ({ jobsData, profilesData }) {
    this.jobsData = jobsData
    this.profilesData = profilesData
  }

  async depositMoneyToClientBalance (profile, userId, amount) {
    // TODO: FIX ERROR TYPES CREATING SPECIFIC ERRORS FOR VALIDATIONS
    if (profile.type !== 'client') {
      throw new Error('Only Clients can deposit')
    }

    if (amount < 0) {
      throw new Error('It is only possible to deposit positive values')
    }

    /* NOTE: Asked to Recruiter
      * On my understanding does not make much sense have a user id as parameter since
      * there is already the profile_id on headers, and this is a authenticated request.
      * Asking to Recruiter, I got the answer that is only possible to deposit to the
      * authenticated user, and to keep the Path asked to exists, I did this validation below.
      */
    if (profile.id !== +userId) {
      throw new Error('It is only possible to deposit for authenticated client')
    }

    const clientAmountToPay = await this.jobsData.getPendingPaymentJobsAmountByClient(userId)
    let amountToPay = null
    if (clientAmountToPay && clientAmountToPay[0]) {
      amountToPay = clientAmountToPay[0].dataValues.total
    }

    /* NOTE: Asked to Recruiter
      * README item says:
      * "a client can't deposit more than 25% [?] his total of jobs to pay. (at the deposit moment)"
      * Without the preposition I can understand both scenarios:
      * 1 - that the client can not deposit more than 25% OF the total of jobs to pay, for example, if needs to pay $100 dollars he can only deposit a maximum of $25 dollars.
      * 2 - that the client can not deposit more than 25% FROM the total of jobs to pay, for example, if needs to pay $100 dollars he can only deposit a maximum of $125 dollars.
      * Asking to Recruiter I got the answer that I should proceed with described scenario 1
      */
    if (amount > (amountToPay * 0.25)) {
      throw new Error('It is only possible to deposit a maximum of 25% of the sum of unpaid jobs')
    }

    await this.profilesData.increaseBalance(profile.id, amount)

    return this.profilesData.getById(profile.id)
  }
}

module.exports = BalanceService
