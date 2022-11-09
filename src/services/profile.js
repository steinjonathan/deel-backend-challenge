class ProfileService {
  constructor ({ profilesData }) {
    this.profilesData = profilesData
  }

  async getById (id) {
    return this.profilesData.getById(id)
  }
}

module.exports = ProfileService
