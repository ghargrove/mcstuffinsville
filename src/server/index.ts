import express from 'express'

const app = express()

const port = 3000;

app.get('/', (req, res) => {
  res.send('Test response')
})

app.listen(port, () => console.log(`Now listening on http://localhost:${3000}`))