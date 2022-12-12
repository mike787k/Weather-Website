import express from 'express'
import bodyParser from 'body-parser'
import request from 'request'
const PORT = 3001
const app = express()

const cache = {}

app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

app.get('/data', (req, res, next) => {
  const location = req.query.location
  // If the location exists in the cache, return the cached data
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=6ccccb61744d6fcab3a44ba780830655&units=imperial`
  request(API_URL, (err, response, body) => {
    console.log(API_URL)
    if (err) {
      res.send(err)    // Handle any errors that occur
    } else {
      const data = JSON.parse(body)       // Parse the response body to get the data
      return res.send(data)       // Send the data to the React.js application
    }
  })

  return;
})

app.get('/days', (req, res) => {
  const location = req.query.location
  const API_URL = `http://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=6ccccb61744d6fcab3a44ba780830655&units=imperial`

  request(API_URL, (err, response, body) => {
    if (err) {
      res.send(err)       // Handle any errors that occur
    } else {
      const data = JSON.parse(body)       // Parse the response body to get the data
      return res.send(data)       // Send the data to the React.js application
    }
  })
  return;
});


app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`)
})
