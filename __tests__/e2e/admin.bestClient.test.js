let request = require('supertest')

request = request.bind(request, 'http://localhost:3001')

describe('GET /admin/best-clients', () => {
  it('When request best client for whole database range with limit 10 should get programmer', function (done) {
    const startDate = '2020-08-10T19:11:26.000Z'
    const endDate = '2020-08-17T19:11:26.999Z'
    const limit = 10
    request()
      .get(`/admin/best-clients?start=${startDate}&end=${endDate}&limit=${limit}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).toEqual(
          expect.arrayContaining([
            {
              id: 4,
              fullName: 'Ash Kethcum',
              paid: 2020
            },
            {
              id: 2,
              fullName: 'Mr Robot',
              paid: 442
            },
            {
              id: 1,
              fullName: 'Harry Potter',
              paid: 442
            },
            {
              id: 3,
              fullName: 'John Snow',
              paid: 200
            }
          ]))
        done()
      })
  })

  it('When request best client until day 14 with limit 10 should get programmer', function (done) {
    const startDate = '2020-08-10T19:11:26.000Z'
    const endDate = '2020-08-14T19:11:26.999Z'
    const limit = 10
    request()
      .get(`/admin/best-clients?start=${startDate}&end=${endDate}&limit=${limit}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).toEqual(
          expect.arrayContaining([
            {
              id: 1,
              fullName: 'Harry Potter',
              paid: 21
            }
          ]))
        done()
      })
  })

  it('When request best client for whole database range with limit 2 should get programmer', function (done) {
    const startDate = '2020-08-10T19:11:26.000Z'
    const endDate = '2020-08-17T19:11:26.999Z'
    const limit = 2
    request()
      .get(`/admin/best-clients?start=${startDate}&end=${endDate}&limit=${limit}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).toEqual(
          expect.arrayContaining([
            {
              id: 4,
              fullName: 'Ash Kethcum',
              paid: 2020
            },
            {
              id: 2,
              fullName: 'Mr Robot',
              paid: 442
            }
          ]))
        done()
      })
  })
})
