const { sequelize } = require('./model')
const { Contract, Job } = sequelize.models

const ContractService = require('../services/contract')
const JobService = require('../services/job')

const ContractsData = require('../data/contracts')
const JobsData = require('../data/jobs')

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
      jobsData: new JobsData(Job, Contract)
    })
  })
}
