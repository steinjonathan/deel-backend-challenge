const ContractService = require('../../../src/services/contract')

jest.mock('../../../src/data/contracts')

describe('Service Contracts', () => {
  let getByIdAndProfileMock = null
  let getNotTerminatedContractsByProfileMock = null
  let service = null

  beforeEach(() => {
    getByIdAndProfileMock = jest.fn()
    getNotTerminatedContractsByProfileMock = jest.fn()
    service = new ContractService({
      contractsData: {
        getByIdAndProfile: getByIdAndProfileMock,
        getNotTerminatedContractsByProfile: getNotTerminatedContractsByProfileMock
      }
    })
  })

  test('When get by id should call data service with passed parameters and return data', async () => {
    getByIdAndProfileMock.mockResolvedValue({ id: 1 })
    const result = await service.getByIdAndProfile(1, 1)
    expect(result).toStrictEqual({ id: 1 })
    expect(getByIdAndProfileMock).toBeCalledWith(1, 1)
  })

  test(
    'When get not terminated contracts from profile without pagination should paginate with default values',
    async () => {
      getNotTerminatedContractsByProfileMock.mockResolvedValue([{ id: 123 }])
      const result = await service.getNotTerminatedContractsByProfile(1, null)
      expect(result).toStrictEqual([{ id: 123 }])
      expect(getNotTerminatedContractsByProfileMock).toBeCalledWith(1, 100, 0)
    }
  )

  test(
    'When get not terminated contracts from profile with pagination should paginate with provided values',
    async () => {
      getNotTerminatedContractsByProfileMock.mockResolvedValue([{ id: 123 }])
      const result = await service.getNotTerminatedContractsByProfile(1, {
        limit: 5,
        offset: 35
      })
      expect(result).toStrictEqual([{ id: 123 }])
      expect(getNotTerminatedContractsByProfileMock).toBeCalledWith(1, 5, 35)
    }
  )
})
