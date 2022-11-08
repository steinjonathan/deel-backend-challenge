const { getProfile } = require('./../middleware/getProfile')

module.exports = ({ app, contractService }) => {
  /**
     * FIX ME!
     * @returns contract by id
     */
  app.get('/contracts/:id', getProfile, async (req, res) => {
    const { id } = req.params
    const contract = await contractService.getByIdAndProfile(id, req.profile.id)
    if (!contract) return res.status(404).end()
    res.json(contract)
  })

  app.get('/contracts', getProfile, async (req, res) => {
    const pagination = req.query
    const contracts = await contractService.getNotTerminatedContractsByProfile(req.profile.id, pagination)
    res.json(contracts)
  })
}
