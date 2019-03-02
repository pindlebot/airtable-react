require('dotenv').config()
const express = require('express')

const app = express()
const Bundler = require('parcel-bundler')
const bundler = new Bundler('src/index.html')
const PORT = process.env.PORT || 3000
const Airtable = require('airtable-node')

const airtable = new Airtable({
  apiKey: process.env.API_KEY
})

app.get('/api', async (req, res) => {
  const data = await airtable
    .base(process.env.BASE)
    .table(process.env.TABLE)
    .list()

  res.json(data)
})

app.use(bundler.middleware())

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`)
})
