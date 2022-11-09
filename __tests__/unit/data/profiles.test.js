const ProfilesData = require('../../../src/data/profiles')

jest.mock('../../../src/data/contracts')

describe('Data Profiles', () => {
  let dataService = null
  let incrementMock = null
  let decrementMock = null

  beforeEach(() => {
    incrementMock = jest.fn()
    decrementMock = jest.fn()
    dataService = new ProfilesData({
      increment: incrementMock,
      decrement: decrementMock
    })
  })
  test('When decrease balance should call ORM decrement passing balance', async () => {
    const transaction = {}
    await dataService.decreaseBalance(123, 99.50, transaction)
    expect(decrementMock).toHaveBeenCalledWith('balance', {
      by: 99.50,
      where: {
        id: 123
      },
      transaction
    })
  })

  test('When increase balance should call ORM decrement passing balance', async () => {
    const transaction = {}
    await dataService.increaseBalance(123, 99.50, transaction)
    expect(incrementMock).toHaveBeenCalledWith('balance', {
      by: 99.50,
      where: {
        id: 123
      },
      transaction
    })
  })
})
