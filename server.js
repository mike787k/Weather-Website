import express from 'express';
import axios from 'axios'
import request from 'request';
const app = express()
const API_KEY = '0649db80359931b5e91fd867a95060ba&units=imperial'
const API_ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather'

app.get('/weather', (req, res) => {
  // Get the city and country from the query string
  const { city, country } = req.query

  // Make a request to the OpenWeatherMap API
  request.get(
    `${API_ENDPOINT}?q=${city},${country}&appid=${API_KEY}`,
    (err, response, body) => {
      if (err) {
        // Handle the error
        res.send({
          success: false,
          message: 'Error getting weather data from OpenWeatherMap API'
        })
      } else {
        // Parse the response body
        const weatherData = JSON.parse(body)

        // Use the weather data to display the current weather
        res.send({
          success: true,
          message: 'Weather data retrieved successfully',
          data: weatherData
        })
      }
    }
  )
})

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server listening on port 3000')
})