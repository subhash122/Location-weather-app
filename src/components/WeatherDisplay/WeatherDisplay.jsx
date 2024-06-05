import React, { useEffect, useState } from 'react'
import { Card, Form } from 'react-bootstrap'
import styles from './Weatherdisplay.module.css'
import PropTypes from "prop-types";

function WeatherDisplay({ weatherData, selectedUnit, setSelectedUnit }) {

    return (
        <div className={`mt-4 ${styles.width_35}`}>
            <Form.Check inline label="Celsius" name="group1" type='radio' onChange={() => setSelectedUnit('metric')} checked={selectedUnit == 'metric'} />
            <Form.Check inline label="Fahrenheit" name="group1" type='radio' onChange={() => setSelectedUnit('imperial')} checked={selectedUnit == 'imperial'} />
            <Card className='mt-2'>
                <Card.Body>
                    <div className='d-flex justify-content-center'>
                        <img src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} alt='weather-icon'></img>
                    </div>
                    <h2 className='fw-bold fs-1 text-center'>{weatherData.temprature}°{selectedUnit == 'metric' ? 'C' : 'F'}</h2>
                    <p className='text-center fw-medium'>{weatherData.weather_description}</p>
                    <div className='d-flex justify-content-center '>
                        <i className="bi bi-geo-alt me-2"></i>
                        <p>{weatherData.place}</p>
                    </div>
                </Card.Body>
                <Card.Footer className="d-flex p-0">
                    <div className={`${styles.footer} p-2 border-start d-flex justify-content-center`}>
                        <i className="bi bi-wind me-1" style={{ color: '#45a2ff' }}></i>
                        <div>
                            <p className='m-0 lh-1 fw-semibold'> {weatherData.wind_speed} {selectedUnit == 'metric' ? 'meter/sec' : 'miles/hour'}</p >
                            <p className={`${styles.littleFont} m-0 lh-1`}>Wind speed</p>
                        </div>
                    </div>
                    <div className={`${styles.footer} p-2 border-start d-flex justify-content-center`}>
                        <i className="bi bi-moisture me-1" style={{ color: '#45a2ff' }}></i>
                        <div>
                            <p className='m-0 lh-1 fw-semibold'> {weatherData.humidity}%</p >
                            <p className={`${styles.littleFont} m-0 lh-1`}>Humidity</p>
                        </div>
                    </div>
                </Card.Footer>
            </Card>
        </div>
    )
}

export default WeatherDisplay

WeatherDisplay.propTypes = {
    weatherData: PropTypes.object,
    selectedUnit: PropTypes.string,
    setSelectedUnit: PropTypes.func
};
