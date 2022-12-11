import express from 'express';
import axios from 'axios'
const app = express();
  const port = 3000; // Keep it at port 3000, if you change it please make it clear in your submission.
  app.use(express.json())

  app.get("/city", async(req,res) =>{
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${req.params}&appid=0649db80359931b5e91fd867a95060ba&units=imperial`,

      )
  })

  app.post('/catch', async (req, res) => {
    const rawData = await fetch(url);
    const data = await rawData.json();

    visited.push({
      "name": data.name,
      "high": data.main.temp_max,
      "low": data.main.temp_min,
    })
    res.send(visited);
  })