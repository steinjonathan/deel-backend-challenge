module.exports = ({ app, adminService }) => {
  app.get('/admin/best-profession', async (req, res) => {
    try {
      const { start, end } = req.query
      const result = await adminService.getMostPaidProfession(start, end)
      res.json(result)
    } catch (err) {
      console.log(err)
      res.status(500).end()
    }
  })
}
