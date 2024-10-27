import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'

//Images from https://www.iconfinder.com/weather-icons?price=free
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'

const Weather = () => {

  //Input reference for search
  const inptRef = useRef()

  //Stores data from API
  const [weatherData, setWeatherData] = useState(false);

  //list of icons in api and subbing out for my own
  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon
  }

  //Calls api to check current weather based off of city name
  const search = async (city)=>{

    if(city == "")
    {
      alert("Enter City Name");
      return;
    }

    try
    {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${import.meta.env.VITE_APP_ID} `;

      const response = await fetch(url);
      const data = await response.json();

      //Alerts user of invalid input
      if(!response.ok)
      {
        alert(data.message);
        return;
      }

      console.log(data);

      const icon = allIcons[data.weather[0].icon] || clear_icon;
      
      setWeatherData({
        //variables found in API
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        //Use floor to only get int value
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      })
    } 
    catch (error)
    {
      //If cannot fetch info display nothing
      setWeatherData(false);
      console.error("Error in fetching weather data")
    }
  }

  return (
    <div className='weather'>

      <div className="search-bar">
        <input ref={inptRef} type="text" placeholder='Search'/>
        <img src={search_icon} alt="" onClick={()=>search(inptRef.current.value)}/>
      </div>

      { /*If the weather data is false or unavailiable display nothing*/}
      {weatherData?<>
      <img src={weatherData.icon} alt="" className='weather-icon'/>
      <p className='temperature'>{weatherData.temperature} °F</p>
      <p className='location'>{weatherData.location}</p>
        <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt=""/>
          <div>
            <p>{weatherData.humidity} %</p>
            <span>Humidity</span>
          </div>
          <div className="col">
            <img src={wind_icon} alt=""/>
            <div>
              <p>{weatherData.windSpeed} mph</p>
              <span>Wind Speed</span>
            </div>
          </div>
        </div>
      </div>
      </>:<></>}

    </div>
  )
}

export default Weather
