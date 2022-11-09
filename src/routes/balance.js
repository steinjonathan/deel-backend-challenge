const { getProfile } = require('./../middleware/getProfile')

module.exports = ({ app, balanceService }) => {
  app.post('/balances/deposit/:userId', getProfile, async (req, res) => {
    try {
      const { userId } = req.params
      const { amount } = req.body

      // TODO Add json schema validation mechanism
      if (!amount) {
        throw new Error('Invalid body. Missing amount value.')
      }
      const result = await balanceService.depositMoneyToClientBalance(req.profile, userId, amount)
      res.json(result)
    } catch (err) {
      // TODO: FIX ERROR TYPES CREATING SPECIFIC ERRORS FOR VALIDATIONS
      switch (err.message) {
        case 'Only Clients can deposit':
        case 'It is only possible to deposit for authenticated client':
        case 'It is only possible to deposit a maximum of 25% of the sum of unpaid jobs':
        case 'Invalid body. Missing amount value.':
          res.status(400).send({ message: err.message })
          break
        case 'It is only possible to deposit positive values':
          res.status(422).send({ message: err.message })
          break
        default:
          console.error(err)
          res.status(500).end()
          break
      }
    }
  })
}
