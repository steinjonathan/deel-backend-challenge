const { getProfile } = require('./../middleware/getProfile')

module.exports = ({ app, contractService }) => {
  app.get('/contracts/:id', getProfile, async (req, res) => {
    try {
      const { id } = req.params
      const contract = await contractService.getByIdAndProfile(id, req.profile.id)
      if (!contract) return res.status(404).end()
      res.json(contract)
    } catch (err) {
      res.status(500).end()
    }
  })

  app.get('/contracts', getProfile, async (req, res) => {
    try {
      const pagination = req.query
      const contracts = await contractService.getNotTerminatedContractsByProfile(req.profile.id, pagination)
      res.json(contracts)
    } catch (err) {
      res.status(500).end()
    }
  })
}
