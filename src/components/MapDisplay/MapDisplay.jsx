import React, { useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import { useSearchParams } from 'react-router-dom';

function MapDisplay() {
    const [searchParams, setSearchParams] = useSearchParams()

    let latitude = searchParams.get('latitude')
    let longitude = searchParams.get('longitude')

    const MapEvents = () => {
        // useMapEvents hook is used to register event handlers for map events.
        useMapEvents({
            click: (e) => {
                if (e.originalEvent.shiftKey) {
                    const { lat, lng } = e.latlng;
                    setSearchParams({ latitude: lat, longitude: lng })

                }
            },
        });
        return null;
    };
    return (
        <div>
            <MapContainer center={[latitude, longitude]} zoom={9} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[latitude, longitude]}>
                    <Popup>
                        latitude: {latitude} <br />
                        longitude: {longitude}
                    </Popup>
                </Marker>

                <MapEvents />
            </MapContainer>
        </div>
    )
}

export default MapDisplay
