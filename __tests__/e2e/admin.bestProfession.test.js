let request = require('supertest')

request = request.bind(request, 'http://localhost:3001')

describe('GET /admin/best-profession', () => {
  it('When request best profession for whole database range should get programmer', function (done) {
    const startDate = '2020-08-10T19:11:26.000Z'
    const endDate = '2020-08-17T19:11:26.999Z'
    request()
      .get(`/admin/best-profession?start=${startDate}&end=${endDate}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).toEqual(
          expect.objectContaining({
            profession: 'Programmer'
          }))
        done()
      })
  })

  it('When request best profession until day 14 should get musician', function (done) {
    const startDate = '2020-08-10T19:11:26.000Z'
    const endDate = '2020-08-14T19:11:26.999Z'
    request()
      .get(`/admin/best-profession?start=${startDate}&end=${endDate}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).toEqual(
          expect.objectContaining({
            profession: 'Musician'
          }))
        done()
      })
  })
})
