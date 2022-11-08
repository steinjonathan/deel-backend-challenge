class JobService {
  constructor ({ jobsData, profilesData, getRepeatableReadTransaction }) {
    this.jobsData = jobsData
    this.profilesData = profilesData
    this.getRepeatableReadTransaction = getRepeatableReadTransaction
  }

  async getActiveContractsUnpaidJobsByProfile (profileId, pagination) {
    let limit = 100
    let offset = 0
    if (pagination) {
      if (pagination.limit) {
        limit = pagination.limit
      }
      if (pagination.offset) {
        offset = pagination.offset
      }
    }
    const jobs = await this.jobsData.getActiveContractsUnpaidJobsByProfile(
      profileId,
      limit,
      offset
    )

    return jobs
  }

  async payJob (profile, jobId) {
    // TODO: FIX ERROR TYPES CREATING SPECIFIC ERRORS FOR VALIDATIONS

    if (profile.type !== 'client') {
      throw new Error('Only Clients can pay jobs')
    }

    const transaction = await this.getRepeatableReadTransaction()

    try {
      const clientId = profile.id
      const job = await this.jobsData.getByIdByClientId(jobId, clientId, transaction)

      if (!job) {
        throw new Error('Job not found')
      }

      if (job.paid) {
        throw new Error('Job already paid')
      }

      // Here I don't use the profile given by parameter because I want it to be protected by the transaction
      const client = await this.profilesData.getById(clientId, transaction)

      if (client.balance < job.price) {
        throw new Error('Client does not have enough balance')
      }

      await this.jobsData.payJob(jobId, transaction)
      await this.profilesData.decreaseBalance(clientId, job.price, transaction)
      const jobContract = await job.getContract()
      await this.profilesData.increaseBalance(jobContract.ContractorId, job.price, transaction)

      // If the execution reaches this line, no errors were thrown.
      // We commit the transaction.
      await transaction.commit()

      const savedClient = await this.profilesData.getById(clientId)
      const savedContractor = await this.profilesData.getById(jobContract.ContractorId)

      console.log('client', savedClient)
      console.log('contractor', savedContractor)
    } catch (err) {
      // If the execution reaches this line, an error was thrown.
      // We rollback the transaction.
      await transaction.rollback()
      throw err
    }
  }
}

module.exports = JobService
