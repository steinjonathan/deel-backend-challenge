class AdminService {
  constructor ({ jobsData }) {
    this.jobsData = jobsData
  }

  async getMostPaidProfession (startDate, endDate) {
    const sumPerContrator = await this.jobsData.getSumOfPaidJobsPerContractorProfession(startDate, endDate)

    if (sumPerContrator[0] && sumPerContrator[0].Contract && sumPerContrator[0].Contract.Contractor) {
      return {
        profession: sumPerContrator[0].Contract.Contractor.profession
      }
    }

    return { profession: '' }
  }

  async getClientMostPaid (startDate, endDate, limit) {
    const clientsTotal = await this.jobsData.getSumOfPaidJobsPerClient(startDate, endDate, limit)

    const response = clientsTotal.map((client) => ({
      id: client.Contract.ClientId,
      fullName: client.Contract.Client.fullName,
      paid: client.dataValues.total
    }))

    return response
  }
}

module.exports = AdminService
