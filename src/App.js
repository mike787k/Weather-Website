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
            onKeyPress={searchLocation}
            placeholder='Enter Location'
            type="text" />
      </div>


      <div className='container'>
        <div classname='location'>
          <p>{data.name}</p>
        </div>
        <div className='temprature'>
          {data.main ? <p>{data.main.temp.toFixed()}°K</p> : null}
        </div>
        <div className='description'>
          {data.weather ? <p>{data.weather[0].main}</p> : null}
        </div>
      </div>
    </div>
  );
}
 
export default App;
