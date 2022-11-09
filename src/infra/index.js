const { sequelize, Transaction, Profile, Contract, Job } = require('./model')

const ContractService = require('../services/contract')
const JobService = require('../services/job')
const AdminService = require('../services/admin')
const BalanceService = require('../services/balance')

const ContractsData = require('../data/contracts')
const JobsData = require('../data/jobs')
const ProfilesData = require('../data/profiles')
const ProfileService = require('../services/profile')

const getRepeatableReadTransaction = async () => {
  // CONSOLE MESSAGE: SQLite is not able to choose the isolation level REPEATABLE READ.
  // Not sure if is there a way to handle transactions in SQL Lite, but I'll keep this Isolation Level
  // in order to show my concern and way of thinking. For real production database it would work.
  // Reference: https://dev.mysql.com/doc/refman/8.0/en/innodb-transaction-isolation-levels.html
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
      jobsData: new JobsData(Job, Contract, Profile),
      profilesData: new ProfilesData(Profile),
      getRepeatableReadTransaction
    })
  })
  require('../routes/admin')({
    app,
    adminService: new AdminService({
      jobsData: new JobsData(Job, Contract, Profile)
    }),
    profileService: new ProfileService({
      profilesData: new ProfilesData(Profile)
    })
  })
  require('../routes/balance')({
    app,
    balanceService: new BalanceService({
      jobsData: new JobsData(Job, Contract, Profile),
      profilesData: new ProfilesData(Profile)
    })
  })
}
