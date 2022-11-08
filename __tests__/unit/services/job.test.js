const JobService = require('../../../src/services/job')

jest.mock('../../../src/data/contracts')

describe('Service Contracts', () => {
  let getActiveContractsUnpaidJobsByProfileMock = null
  let service = null

  beforeEach(() => {
    getActiveContractsUnpaidJobsByProfileMock = jest.fn()
    service = new JobService({
      jobsData: {
        getActiveContractsUnpaidJobsByProfile: getActiveContractsUnpaidJobsByProfileMock
      }
    })
  })

  test(
    'When get not terminated contracts from profile without pagination should paginate with default values',
    async () => {
      getActiveContractsUnpaidJobsByProfileMock.mockResolvedValue([{ id: 123 }])
      const result = await service.getActiveContractsUnpaidJobsByProfile(1, null)
      expect(result).toStrictEqual([{ id: 123 }])
      expect(getActiveContractsUnpaidJobsByProfileMock).toBeCalledWith(1, 100, 0)
    }
  )

  test(
    'When get not terminated contracts from profile with pagination should paginate with provided values',
    async () => {
      getActiveContractsUnpaidJobsByProfileMock.mockResolvedValue([{ id: 123 }])
      const result = await service.getActiveContractsUnpaidJobsByProfile(1, {
        limit: 5,
        offset: 35
      })
      expect(result).toStrictEqual([{ id: 123 }])
      expect(getActiveContractsUnpaidJobsByProfileMock).toBeCalledWith(1, 5, 35)
    }
  )
})
