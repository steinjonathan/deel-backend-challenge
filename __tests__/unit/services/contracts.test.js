const { getById } = require('../../../src/services/contracts')

const { findOne } = require('../../../src/data/contracts')

jest.mock('../../../src/data/contracts')

describe('Service Contracts', () => {
  let findOneMock = jest.mock

  beforeEach(() => {
    findOneMock = findOne
  })

  test('Get by id should return item', async () => {
    findOneMock.mockResolvedValue({ id: 1 })
    const result = await getById(1)
    expect(result).toStrictEqual({ id: 1 })
  })
})
