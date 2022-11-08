class JobService {
  constructor ({ jobsData }) {
    this.jobsData = jobsData
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
}

module.exports = JobService
