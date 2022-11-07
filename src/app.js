const express = require('express')
const bodyParser = require('body-parser')

const setupApp = require('./infra')

const app = express()

app.use(bodyParser.json())

setupApp(app)

module.exports = app
