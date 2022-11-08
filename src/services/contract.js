class ContractService {
  constructor ({ contractsData }) {
    this.contractsData = contractsData
  }

  async getByIdAndProfile (id, profileId) {
    return this.contractsData.getByIdAndProfile(id, profileId)
  }

  async getNotTerminatedContractsByProfile (profileId, pagination) {
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
    const contracts = this.contractsData.getNotTerminatedContractsByProfile(
      profileId,
      limit,
      offset
    )
    return contracts
  }
}

module.exports = ContractService
