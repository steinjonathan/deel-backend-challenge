let request = require('supertest')

request = request.bind(request, 'http://localhost:3001')

describe('GET /jobs/unpaid', () => {
  it('When request unpaid jobs from client user should return just the ones from active contracts', function (done) {
    const profileId = 1 // Client
    request()
      .get('/jobs/unpaid')
      .set('profile_id', profileId)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).toEqual(
          expect.arrayContaining([{
            id: expect.any(Number),
            description: 'work',
            price: 201,
            ContractId: 2,
            paid: null,
            paymentDate: null,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            Contract: expect.any(Object)
          }]))
        expect(res.body).toHaveLength(1)
        done()
      })
  })

  it('When request unpaid jobs from contractor user should return just the ones from active contracts', function (done) {
    const profileId = 7 // Contractor
    request()
      .get('/jobs/unpaid')
      .set('profile_id', profileId)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).toEqual(
          expect.arrayContaining([{
            id: expect.any(Number),
            description: 'work',
            price: 200,
            ContractId: 7,
            paid: null,
            paymentDate: null,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            Contract: expect.any(Object)
          }, {
            id: expect.any(Number),
            description: 'work',
            price: 200,
            ContractId: 4,
            paid: null,
            paymentDate: null,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            Contract: expect.any(Object)
          }]))
        expect(res.body).toHaveLength(2)
        done()
      })
  })
})
