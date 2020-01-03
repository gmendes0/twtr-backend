const express = require('express')
const path = require('path')
require('dotenv/config')
require('./database/index')

const routes = require('./routes')

const app = express()

app.use(express.json())
app.use('/avatars', express.static(path.resolve(__dirname, '..', 'uploads', 'avatars')))
app.use('/images', express.static(path.resolve(__dirname, '..', 'uploads', 'posts')))
app.use(routes)

app.listen(3333)
