const { sequelize, Transaction } = require('./model')
const { Contract, Job, Profile } = sequelize.models

const ContractService = require('../services/contract')
const JobService = require('../services/job')

const ContractsData = require('../data/contracts')
const JobsData = require('../data/jobs')
const ProfilesData = require('../data/profiles')

const getRepeatableReadTransaction = async () => {
  // CONSOLE MESSAGE: SQLite is not able to choose the isolation level REPEATABLE READ.
  // Not sure if is there a way to handle transactions in SQL Lite, but I'll keep this Isolation Level
  // in order to show my concern and way of thinking. For real production database it would work.
  return sequelize.transaction({
    isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ
  })
}

module.exports = (app) => {
  require('../routes/contracts')({
    app,
    contractService: new ContractService({
      contractsData: new ContractsData(Contract)
    })
  })
  require('../routes/jobs')({
    app,
    jobService: new JobService({
      jobsData: new JobsData(Job, Contract),
      profilesData: new ProfilesData(Profile),
      getRepeatableReadTransaction
    })
  })
}
