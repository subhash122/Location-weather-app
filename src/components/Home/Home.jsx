import axios from 'axios';
import React, { useState } from 'react'
import { Button, Card, Form, FormControl, InputGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './Home.module.css'

function Home() {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [location, setLocation] = useState('');
    const [isInvalidLat, setIsInvalidLat] = useState(false);
    const [isInvalidLng, setIsInvalidLng] = useState(false);
    const navigate = useNavigate();

    let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) ?? [];
    const submit = () => {
        if (latitude === '' || latitude < -90 || latitude > 90) {
            toast.error('Provide a valid latitude value');
            setIsInvalidLat(true);
            return;
        }
        if (longitude === '' || longitude < -180 || longitude > 180) {
            toast.error('Provide a valid longitude value');
            setIsInvalidLng(true);
            return;
        }

        recentSearches.unshift({ latitude: latitude, longitude: longitude });
        if (recentSearches.length > 10) {
            recentSearches.pop();
        }
        localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
        navigate(`/details?latitude=${latitude}&longitude=${longitude}`)
    }
    const latitudeChange = (e) => {
        setIsInvalidLat(false);
        setLatitude(e.target.value)
    }
    const longitudeChange = (e) => {
        setIsInvalidLng(false)
        setLongitude(e.target.value)
    }

    const getLocationCordinates = async () => {
        if (location) {
            const apiKey = import.meta.env.VITE_APP_apiKey;
            const url = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apiKey}`
            try {
                const locationResponse = await axios.get(url);
                setLatitude(locationResponse.data[0].lat);
                setLongitude(locationResponse.data[0].lon);
            } catch (error) {
                toast.error(error?.response?.data?.message ?? 'something went wrong on fetching weather data. please try again later');
            }
        }

    }
    const searchDetails = (item) => {
        navigate(`/details?latitude=${item.latitude}&longitude=${item.longitude}`)
    }
    return (
        <>
            <Card className='px-4 py-5 d-flex flex-column mx-auto w-50 mt-4'>
                <Form.Label>Latitude</Form.Label>
                <FormControl type='number' placeholder='Enter latitude' value={latitude}
                    onChange={latitudeChange} isInvalid={isInvalidLat}
                ></FormControl>
                <Form.Label className='mt-4'>Longitude</Form.Label>
                <FormControl type='number' placeholder='Enter longitude' value={longitude}
                    onChange={longitudeChange} isInvalid={isInvalidLng}
                ></FormControl>
                <Form.Label className='mt-4'>Location</Form.Label>
                <div className='position-relative'>
                    <FormControl type='text' placeholder='Search location' value={location}
                        onChange={(e) => setLocation(e.target.value)} onKeyDown={(event) => event.key === 'Enter' ? getLocationCordinates() : null}
                    ></FormControl>
                    <i className={`bi bi-search position-absolute ${styles.search_icon}`} onClick={getLocationCordinates}></i>
                </div>
                <Button className="mt-4 w-25" variant="primary" onClick={submit}>Submit </Button>
            </Card>
            <Card className='mt-3 p-4 w-50 mx-auto mb-4'>
                <h3>Recent Searches</h3>
                <div className='d-flex flex-wrap'>
                    {recentSearches.map((item, index) => <Card className={`p-2 me-3 mb-3 ${styles.cursor_pointer}`} key={index} onClick={() => searchDetails(item)}>
                        <p>Latitude:{item.latitude}</p>
                        <p>Longitude:{item.longitude}</p>
                    </Card>)}
                </div>
            </Card>
        </>
    )
}

export default Home
