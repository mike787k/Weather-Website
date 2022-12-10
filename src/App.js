import React, {useState} from 'react'
import axios from 'axios'

function App(){
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=0649db80359931b5e91fd867a95060ba`

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
      <div className='input'>
        <input
            value={location}
            onChange={event => setLocation(event.target.value)}
            placeholder='Enter Location'
            type="text" />
      </div>
      <div className='container'>
        <div classname='location'>
          <p>Current Location: </p>
          <h1>{data.name}</h1>
        </div>
        <div className='temprature'>
          <p>Current temprature: {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null} </p>
        </div>
        <div className='description'>
          <p>Weather Description:</p>
          <h1>{data.weather ? <p>{data.weather[0].main}</p> : null}</h1>
        </div>
      </div>
    </div>
  );
}
 
export default App;
