const { getProfile } = require('./../middleware/getProfile')

module.exports = ({ app, jobService }) => {
  app.get('/jobs/unpaid', getProfile, async (req, res) => {
    try {
      const pagination = req.query
      const unpaidJobs = await jobService.getActiveContractsUnpaidJobsByProfile(req.profile.id, pagination)
      res.json(unpaidJobs)
    } catch (err) {
      res.status(500).end()
    }
  })

  app.post('/jobs/:job_id/pay', getProfile, async (req, res) => {
    try {
      // eslint-disable-next-line camelcase
      const { job_id } = req.params
      const job = await jobService.payJob(req.profile, job_id)
      res.json(job)
    } catch (err) {
      // TODO: FIX ERROR TYPES CREATING SPECIFIC ERRORS FOR VALIDATIONS
      console.log(err)
      switch (err.message) {
        case 'Only Clients can pay jobs':
        case 'Job already paid':
        case 'Client does not have enough balance':
          res.status(400).send({ message: err.message })
          break
        case 'Job not found':
          res.status(404).send({ message: err.message })
          break
        default:
          res.status(500).end()
          break
      }
    }
  })
}
