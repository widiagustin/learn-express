const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.sendFile('./views/index.html', { root: __dirname })
})

app.get('/about', (req, res) => {
  res.sendFile('./views/about.html', { root: __dirname })
})

app.get('/contact', (req, res) => {
  res.sendFile('./views/contact.html', { root: __dirname })
})

app.get('/product/:id?', (req, res) => {
  res.send(`Product ID: ${req.params.id} <br> Category ID : ${req.query.category}`)
})

app.use('/', (req, res) => {
  res.status(404)
  res.send('<h1> 404 page not found')
})

app.listen(port, () => {
  console.log(`You are listening on port ${port}`);
})