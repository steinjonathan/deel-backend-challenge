let request = require('supertest')

request = request.bind(request, 'http://localhost:3001')

describe('GET /contracts/{id}', () => {
  it('When not define profile_id should get unauthorized error ', function (done) {
    request()
      .get('/contracts/1')
      .expect(401, done)
  })

  it('When request contract by id that belongs to profile should return contract', (done) => {
    const profileId = 1 // Client
    const contractId = 1
    request()
      .get(`/contracts/${contractId}`)
      .set('profile_id', profileId)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).toEqual(
          expect.objectContaining({
            id: 1,
            terms: 'bla bla bla',
            status: 'terminated',
            ContractorId: 5,
            ClientId: 1,
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
          }))
        done()
      })
  })

  it('When request contract by id that NOT belongs to profile should return error', function (done) {
    const profileId = 1 // Client
    const contractId = 3
    request()
      .get(`/contracts/${contractId}`)
      .set('profile_id', profileId)
      .expect(404, done)
  })
})
