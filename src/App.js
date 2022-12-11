import React, {useState} from 'react'
import axios from 'axios'

function App(){
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=0649db80359931b5e91fd867a95060ba&units=imperial`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }


  
  return (
    <div className='app'>
      <div className='search-field'>
        <input
            value={location}
            onChange={event => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            placeholder='Enter Location'
            type="text" />
      </div>

      <div className='data-container'>
        <div className='top-screen'>
          <div classname='location'>
            <p>{data.name}</p>
          </div>
          <div className="temprature">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.main ?
              <p style={{color:"red"}}>High Temp: {data.main.temp_max.toFixed()}°F  </p>
              : null
            }
            {data.main ?
              <p style={{color:"blue"}}>Low Temp:  {data.main.temp_min.toFixed()}°F </p>
              : null
            }
            {data.weather ?  
              <p>Weather currently:   {data.weather[0].main}</p> 
              : null
            }
            {data.main ? 
              <p>Currently Feels Like: {data.main.feels_like.toFixed()}°F</p> 
              : null
            }
            {data.wind ?
              <p>Wind Speed: {data.wind.speed.toFixed()} MPH</p> 
              : null
            }
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default App;
