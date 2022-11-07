class ContractService {
  constructor ({ contractsDataRepository }) {
    this.contractsDataRepository = contractsDataRepository
  }

  async getById (id) {
    return this.contractsDataRepository.getById(id)
  }
}

module.exports = ContractService
