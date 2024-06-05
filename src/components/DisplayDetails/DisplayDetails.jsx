import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import WeatherDisplay from '../WeatherDisplay/WeatherDisplay';
import MapDisplay from '../MapDisplay/MapDisplay';
import { Spinner } from 'react-bootstrap';

function DisplayDetails() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedUnit, setSelectedUnit] = useState('metric');
  const [searchParams, setSearchParams] = useSearchParams();

  let latitude = searchParams.get('latitude')
  let longitude = searchParams.get('longitude')

  useEffect(() => {
    fetchWeatherData()

  }, [searchParams, selectedUnit])

  const filterWeatherResponse = (weatherResponse) => {
    let weatherObj = {
      temprature: weatherResponse.data?.main?.temp,
      humidity: weatherResponse.data?.main?.humidity,
      weather_description: weatherResponse.data?.weather[0]?.description,
      place: `${weatherResponse.data?.name}, ${weatherResponse.data?.sys?.country}`,
      wind_speed: weatherResponse.data?.wind?.speed,
      icon: weatherResponse.data?.weather[0]?.icon,
    }
    setWeatherData(weatherObj);
  }

  // fetches the weather data for given latitude and longitude
  const fetchWeatherData = async () => {
    const apiKey = import.meta.env.VITE_APP_apiKey;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${selectedUnit}&appid=${apiKey}`;
    try {
      setLoading(true);
      const weatherResponse = await axios.get(url);
      filterWeatherResponse(weatherResponse);
    } catch (error) {
      toast.error(error?.response?.data?.message ?? 'something went wrong on fetching weather data. please try again later');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='container d-flex flex-column align-items-center my-3'>
      <MapDisplay />
      {
        loading ? <div className='d-flex justify-content-center mt-3'>
          <Spinner animation="border" variant='primary'></Spinner>
        </div> : <WeatherDisplay weatherData={weatherData} selectedUnit={selectedUnit} setSelectedUnit={setSelectedUnit} />
      }
    </div>
  )
}

export default DisplayDetails;
