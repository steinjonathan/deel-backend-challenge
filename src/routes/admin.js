module.exports = ({ app, adminService }) => {
  app.get('/admin/best-profession', async (req, res) => {
    try {
      const { start, end } = req.query
      const result = await adminService.getMostPaidProfession(start, end)
      res.json(result)
    } catch (err) {
      console.error(err)
      res.status(500).end()
    }
  })

  app.get('/admin/best-clients', async (req, res) => {
    try {
      const { start, end, limit } = req.query
      const result = await adminService.getClientMostPaid(start, end, limit)
      res.json(result)
    } catch (err) {
      console.error(err)
      res.status(500).end()
    }
  })
}
