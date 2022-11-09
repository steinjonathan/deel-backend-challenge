let request = require('supertest')

request = request.bind(request, 'http://localhost:3001')

describe('GET /jobs/:id/pay', () => {
  it('When pay a job should update contractor and client balance and paid job at database', function (done) {
    const profileId = 1 // Client
    request()
      .post('/jobs/1/pay')
      .set('profile_id', profileId)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).toEqual(
          expect.objectContaining({
            id: 1,
            description: 'work',
            price: 200,
            paid: true,
            paymentDate: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            ContractId: 1,
            Contract: {
              id: 1,
              terms: 'bla bla bla',
              status: 'terminated',
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
              ContractorId: 5,
              ClientId: 1
            }
          }))
        done()
      })
  })

  it('When job was paid the contractor balance should be increased', function (done) {
    request()
      .get('/admin/profiles/5')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).toEqual(
          expect.objectContaining({
            fullName: 'John Lenon',
            id: 5,
            firstName: 'John',
            lastName: 'Lenon',
            profession: 'Musician',
            balance: 264,
            type: 'contractor',
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
          }))
        done()
      })
  })

  it('When job was paid the client balance should be decreased', function (done) {
    request()
      .get('/admin/profiles/1')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).toEqual(
          expect.objectContaining({
            fullName: 'Harry Potter',
            id: 1,
            firstName: 'Harry',
            lastName: 'Potter',
            profession: 'Wizard',
            balance: 50,
            type: 'client',
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
          }))
        done()
      })
  })
})
