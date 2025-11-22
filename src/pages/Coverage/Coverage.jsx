import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import { useLoaderData } from 'react-router';

const Coverage = () => {
    const position = [50.1109, 8.6821]
    const serviceCenters = useLoaderData()
    console.log(serviceCenters);

    return (
        <div>
            <h2 className='text-5xl font-bold text-center my-5 text-secondary'>We are available all 16 Federal States in Germany</h2>
            <div className='border w-full h-[800px]'>

                <MapContainer
                    center={position}
                    zoom={7}
                    scrollWheelZoom={false}
                    className='h-[800px]'
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                        serviceCenters.map(center => <Marker position={[center.latitude, center.longitude ]}>
                            <Popup>District: {center.district}. <br />Service Status: {center.status} <br /> Service Area: {center.covered_area.join(', ')}</Popup>
                        </Marker>)
                    }
                </MapContainer>
            </div>
        </div>
    );
};

export default Coverage;