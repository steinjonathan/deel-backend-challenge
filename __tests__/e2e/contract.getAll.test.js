let request = require('supertest')

request = request.bind(request, 'http://localhost:3001')

describe('GET /contracts', () => {
  it('When request contracts from client profile should return not terminated ones', function (done) {
    const profileId = 1 // Client
    request()
      .get('/contracts')
      .set('profile_id', profileId)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).toEqual(
          expect.arrayContaining([{
            id: 2,
            terms: 'bla bla bla',
            status: 'in_progress',
            ClientId: 1,
            ContractorId: 6,
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
          }]))
        expect(res.body).toHaveLength(1)
        done()
      })
  })

  it('When request contracts from contractor profile should return not terminated ones', function (done) {
    const profileId = 8 // Contractor
    request()
      .get('/contracts')
      .set('profile_id', profileId)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).toEqual(
          expect.arrayContaining([{
            id: 5,
            terms: 'bla bla bla',
            status: 'new',
            ClientId: 3,
            ContractorId: 8,
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
          }, {
            id: 9,
            terms: 'bla bla bla',
            status: 'in_progress',
            ClientId: 4,
            ContractorId: 8,
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
          }]))
        expect(res.body).toHaveLength(2)
        done()
      })
  })

  it('When request contracts from contractor profile paginated should return just one', function (done) {
    const profileId = 8 // Contractor
    request()
      .get('/contracts')
      .query({ limit: 1 })
      .set('profile_id', profileId)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).toEqual(
          expect.arrayContaining([{
            id: 5,
            terms: 'bla bla bla',
            status: 'new',
            ClientId: 3,
            ContractorId: 8,
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
          }]))
        expect(res.body).toHaveLength(1)
        done()
      })
  })

  it('When request contracts from contractor profile paginated should return skipping offset', function (done) {
    const profileId = 8 // Contractor
    request()
      .get('/contracts')
      .query({ offset: 1 })
      .set('profile_id', profileId)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).toEqual(
          expect.arrayContaining([{
            id: 9,
            terms: 'bla bla bla',
            status: 'in_progress',
            ClientId: 4,
            ContractorId: 8,
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
          }]))
        expect(res.body).toHaveLength(1)
        done()
      })
  })
})
