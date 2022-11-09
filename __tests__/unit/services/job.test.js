const JobService = require('../../../src/services/job')

jest.mock('../../../src/data/contracts')

describe('Service Jobs', () => {
  let jobGetActiveContractsUnpaidJobsByProfileMock = null
  let jobGetByIdByClientIdMock = null
  let jobPayJobMock = null
  let profileGetByIdMock = null
  let profileDecreaseBalanceMock = null
  let profileIncreaseBalanceMock = null
  let transaction = null
  let rollbackMock = null
  let commitMock = null
  let service = null

  beforeEach(() => {
    jobGetActiveContractsUnpaidJobsByProfileMock = jest.fn()
    jobGetByIdByClientIdMock = jest.fn()
    jobPayJobMock = jest.fn()
    profileGetByIdMock = jest.fn()
    profileDecreaseBalanceMock = jest.fn()
    profileIncreaseBalanceMock = jest.fn()
    rollbackMock = jest.fn()
    commitMock = jest.fn()
    transaction = {
      commit: commitMock,
      rollback: rollbackMock
    }
    service = new JobService({
      jobsData: {
        getActiveContractsUnpaidJobsByProfile: jobGetActiveContractsUnpaidJobsByProfileMock,
        getByIdByClientId: jobGetByIdByClientIdMock,
        payJob: jobPayJobMock
      },
      profilesData: {
        getById: profileGetByIdMock,
        decreaseBalance: profileDecreaseBalanceMock,
        increaseBalance: profileIncreaseBalanceMock
      },
      getRepeatableReadTransaction: () => transaction
    })
  })

  test(
    'When get not terminated contracts from profile without pagination should paginate with default values',
    async () => {
      jobGetActiveContractsUnpaidJobsByProfileMock.mockResolvedValue([{ id: 123 }])
      const result = await service.getActiveContractsUnpaidJobsByProfile(1, null)
      expect(result).toStrictEqual([{ id: 123 }])
      expect(jobGetActiveContractsUnpaidJobsByProfileMock).toBeCalledWith(1, 100, 0)
    }
  )

  test(
    'When get not terminated contracts from profile with pagination should paginate with provided values',
    async () => {
      jobGetActiveContractsUnpaidJobsByProfileMock.mockResolvedValue([{ id: 123 }])
      const result = await service.getActiveContractsUnpaidJobsByProfile(1, {
        limit: 5,
        offset: 35
      })
      expect(result).toStrictEqual([{ id: 123 }])
      expect(jobGetActiveContractsUnpaidJobsByProfileMock).toBeCalledWith(1, 5, 35)
    }
  )

  test('When contractor pay for a job should get error', async () => {
    await expect(service.payJob({ type: 'contractor' }, 123)).rejects.toThrowError('Only Clients can pay jobs')
    expect(rollbackMock).not.toHaveBeenCalled()
  }
  )

  test('When client pay for a job that does not exists should get error', async () => {
    await expect(service.payJob({ type: 'client' }, 123)).rejects.toThrowError('Job not found')
    expect(rollbackMock).toHaveBeenCalled()
  }
  )

  test('When client pay for a job already paid should get error', async () => {
    jobGetByIdByClientIdMock.mockResolvedValue({ paid: true })
    await expect(service.payJob({ type: 'client' }, 123)).rejects.toThrowError('Job already paid')
    expect(rollbackMock).toHaveBeenCalled()
  }
  )

  test('When client pay for a job without enough balance should get error', async () => {
    jobGetByIdByClientIdMock.mockResolvedValue({ paid: false, price: 10 })
    profileGetByIdMock.mockResolvedValue({ balance: 9 })
    await expect(service.payJob({ type: 'client' }, 123)).rejects.toThrowError('Client does not have enough balance')
    expect(rollbackMock).toHaveBeenCalled()
  }
  )

  test(
    'When client pay for a job with enough balance should move the amount from client to contractor balance and pay job',
    async () => {
      const jobId = 123
      const clientId = 888
      const contractorId = 999
      const jobPrice = 34.5
      const successReturnValue = {
        paid: true
      }

      jobGetByIdByClientIdMock.mockResolvedValueOnce({
        paid: false,
        price: jobPrice,
        getContract: () => ({ ContractorId: contractorId })
      })
      jobGetByIdByClientIdMock.mockResolvedValueOnce(successReturnValue)
      profileGetByIdMock.mockResolvedValue({
        balance: 50
      })

      const returnedValue = await service.payJob({
        id: clientId,
        type: 'client'
      }, jobId)
      expect(returnedValue).toStrictEqual(successReturnValue)

      expect(jobPayJobMock).toHaveBeenCalledWith(jobId, transaction)
      expect(profileDecreaseBalanceMock).toHaveBeenCalledWith(clientId, jobPrice, transaction)
      expect(profileIncreaseBalanceMock).toHaveBeenCalledWith(contractorId, jobPrice, transaction)

      expect(commitMock).toHaveBeenCalled()
    }
  )
})
