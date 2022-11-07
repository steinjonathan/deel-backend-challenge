const ContractService = require('../../../src/services/contract')

jest.mock('../../../src/data/contracts')

describe('Service Contracts', () => {
  let getByIdAndProfileMock = null
  let service = null

  beforeEach(() => {
    getByIdAndProfileMock = jest.fn()
    service = new ContractService({
      contractsData: {
        getByIdAndProfile: getByIdAndProfileMock
      }
    })
  })

  test('Get by id should return item', async () => {
    getByIdAndProfileMock.mockResolvedValue({ id: 1 })
    const result = await service.getByIdAndProfile(1, 1)
    expect(result).toStrictEqual({ id: 1 })
    expect(getByIdAndProfileMock).toBeCalledWith(1, 1)
  })
})
