const JobsData = require('../../../src/data/jobs')

jest.mock('../../../src/data/contracts')

describe('Data Jobs', () => {
  let dataService = null
  let updateMock = null

  beforeEach(() => {
    updateMock = jest.fn()
    dataService = new JobsData({ update: updateMock })
  })
  test('When pay for job should send date to ORM update', async () => {
    const transaction = {}
    await dataService.payJob(123, transaction)
    expect(updateMock).toHaveBeenCalledWith({
      paid: true,
      paymentDate: expect.any(Date)
    }, {
      where: {
        id: 123
      },
      transaction
    })
  }
  )
})
