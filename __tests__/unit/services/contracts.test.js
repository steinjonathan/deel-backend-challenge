const ContractService = require('../../../src/services/contract')

jest.mock('../../../src/data/contracts')

describe('Service Contracts', () => {
  let getByIdMock = null
  let service = null

  beforeEach(() => {
    getByIdMock = jest.fn()
    service = new ContractService({
      contractsDataRepository: {
        getById: getByIdMock
      }
    })
  })

  test('Get by id should return item', async () => {
    getByIdMock.mockResolvedValue({ id: 1 })
    const result = await service.getById(1)
    expect(result).toStrictEqual({ id: 1 })
    expect(getByIdMock).toBeCalledWith(1)
  })
})
