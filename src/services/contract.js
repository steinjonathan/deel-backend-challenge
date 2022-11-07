class ContractService {
  constructor ({ contractsData }) {
    this.contractsData = contractsData
  }

  async getByIdAndProfile (id, profileId) {
    return this.contractsData.getByIdAndProfile(id, profileId)
  }
}

module.exports = ContractService
