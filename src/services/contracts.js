const contractData = require('../data/contracts')

exports.getById = async (id) => {
  const contract = await contractData.findOne({ where: { id } })
  return contract
}
