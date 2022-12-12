import React, { useState } from 'react'
import axios from 'axios'
import _ from 'lodash'
//import { response } from 'express'

function App() {
  const [tmmr, setTmmr] = useState({})
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [geolocationCalled, setGeolocationCalled] = useState(false)
  let cache = ''
  let dayCache = ''
  const api = axios.create({
    baseURL: 'http://localhost:3001',
  })
  // make a request to the server to retrieve the cache data
  api
    .get('/cache')
    .then((response) => {
      // the response data will be a JSON object containing the cache data
      cache = response.data
      console.log(cache)
    })
    .catch((error) => {
      console.log(error)
    })
  api
    .get('/dayCache')
    .then((response) => {
      // the response data will be a JSON object containing the cache data
      dayCache = response.data
      console.log(dayCache)
    })
    .catch((error) => {
      console.log(error)
    })
  function makeRequest(latitude, longitude) {
    if (navigator.geolocation && !geolocationCalled) {
      const API_KEY = 'dbb38b80ed68424ce8c6c21a721192c0&units=imperial'
      const url =
        'https://api.openweathermap.org/data/2.5/weather?lat=' +
        latitude +
        '&lon=' +
        longitude +
        '&appid=' +
        API_KEY //Grabs the users weather for it's current location
      const url_days_of_week =
        'https://api.openweathermap.org/data/2.5/forecast?lat=' +
        latitude +
        '&lon=' +
        longitude +
        '&appid=' +
        API_KEY //Grabs the users weather for the next few days for it's current location
      axios
        .get(url, {
          params: {
            lat: latitude,
            lon: longitude,
          },
        })
        .then(function (response) {
          setData(response.data)
        })
        .catch(function (error) {
          console.log('Error')
        })
      axios
        .get(url_days_of_week, {
          params: {
            lat: latitude,
            lon: longitude,
          },
        })
        .then(function (response) {
          setTmmr(response.data)
        })
        .catch(function (error) {
          // Handle any errors that occurred
        })
    }
    setGeolocationCalled(true)
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var latitude = position.coords.latitude
      var longitude = position.coords.longitude

      // debounce the makeRequest() function so that it is only called once every 1000 milliseconds
      const debouncedMakeRequest = _.debounce(makeRequest, 1000)

      // call the debounced function with the user's latitude and longitude
      debouncedMakeRequest(latitude, longitude)
    })
  }
  const searchLocation = async (event) => {
    if (event.key === 'Enter') {
      await fetch(`http://localhost:3001/data?location=${location}`)
        .then((response) => response.json())
        .then((data) => {
          setData(data)
        })

      await fetch(`http://localhost:3001/days?location=${location}`)
        .then((response) => response.json())
        .then((data) => {
          setTmmr(data)
        })

      setLocation('')
    }
  }
  const createWeek = () => {
    const days = []

    for (let i = 0; i <= 32; i += 8) {
      days.push(
        <div className="days" key={`day${i}`}>
          {tmmr.list ? <p>{tmmr.list[i].dt_txt.substr(0, 10)}</p> : null}
          {tmmr.list ? <p>Average Temp: {tmmr.list[i].main.temp}°F</p> : null}
          {tmmr.list ? (
            <p>Feels Like: {tmmr.list[i].main.feels_like}°F</p>
          ) : null}
        </div>
      )
    }
    return days
  }
  return (
    <div className="app">
      <div className="search-field">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>

      <div className="data-container">
        <div className="location">
          {data.main ? (
            <h1>
              {data.name}: {data.main.temp.toFixed()}°F
            </h1>
          ) : null}
        </div>
        <div className="description">
          {data.main ? (
            <p style={{ "font-weight" : "bold", color : "red"}}>
              High Temp: {data.main.temp_max.toFixed()}°F{' '}
            </p>
          ) : null}
          {data.main ? (
            <p style={{  "font-weight" : "bold", color: 'blue', }}>
              Low Temp: {data.main.temp_min.toFixed()}°F{' '}
            </p>
          ) : null}
          {data.weather ? (
            <p style={{  "font-weight" : "bold" }} >Weather Currently: {data.weather[0].main}</p>
          ) : null}
          {data.main ? (
            <p style={{  "font-weight" : "bold" }} >Currently Feels Like: {data.main.feels_like.toFixed()}°F</p>
          ) : null}
          {data.wind ? (
            <p style={{  "font-weight" : "bold" }} >Wind Speed: {data.wind.speed.toFixed()} MPH</p>
          ) : null}
        </div>
      </div>

      <div className="week-container">
        <div className="week">{createWeek()}</div>
      </div>
    </div>
  )
}

export default App
