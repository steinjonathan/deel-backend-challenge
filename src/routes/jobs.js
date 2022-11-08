const { getProfile } = require('./../middleware/getProfile')

module.exports = ({ app, jobService }) => {
  app.get('/jobs/unpaid', getProfile, async (req, res) => {
    const pagination = req.query
    const unpaidJobs = await jobService.getActiveContractsUnpaidJobsByProfile(req.profile.id, pagination)
    res.json(unpaidJobs)
  })
}
