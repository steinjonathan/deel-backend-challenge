const contractService = require('../services/contracts')

exports.getById = async (req, res) => {
  const { id } = req.params
  const contract = await contractService.getById(id)
  if (!contract) return res.status(404).end()
  res.json(contract)
}
