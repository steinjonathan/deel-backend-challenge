class AdminService {
  constructor ({ jobsData }) {
    this.jobsData = jobsData
  }

  async getMostPaidProfession (startDate, endDate) {
    const sumPerContrator = await this.jobsData.getSumOfPaidJobsPerContractor(startDate, endDate)

    if (sumPerContrator[0] && sumPerContrator[0].Contract && sumPerContrator[0].Contract.Contractor) {
      return {
        profession: sumPerContrator[0].Contract.Contractor.profession
      }
    }

    return { profession: '' }
  }
}

module.exports = AdminService
