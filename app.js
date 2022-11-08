const express = require('express')
const app = express()
const path = require('path')
const productRouter = require('./app/product/routes')
const logger = require('morgan')
const port = process.env.PORT || 3200

app.use(logger('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/public', express.static(path.join(__dirname, 'uploads')))
app.use('/api/v1', productRouter)
app.use((req, res, next) => {
  res.status(404)
  res.send({
    status: 'failed',
    message: `Resource ${req.originalUrl} Not Found`
  })
})

app.listen(port, () => {
  console.log(`You are listening on port http://localhost:${port}`);
})