const express = require('express')
require('./database/index')

const routes = require('./routes')

const app = express()

app.use(express.json())
app.use(routes)

app.listen(3333)
