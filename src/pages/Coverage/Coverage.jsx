import React, { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import { useLoaderData } from 'react-router';

const Coverage = () => {
    const position = [51.1657, 10.4515]
    const serviceCenters = useLoaderData()
    // console.log(serviceCenters);
    const mapRef = useRef(null);

    const handleSearch = e => {
        e.preventDefault();
        const location = e.target.location.value;
        const district = serviceCenters.find(c => c.district.toLowerCase().includes(location.toLowerCase()));
        if (district) {
            const coord = [district.latitude, district.longitude]
            // console.log(district, coord);
            mapRef.current.flyTo(coord, 13)

        }

    }

    return (
        <div>
            <h2 className='text-5xl font-bold text-center my-5 text-secondary'>Available in 16 Federal States in Germany</h2>
            <div className='my-5'>
                <form onSubmit={handleSearch}>
                    <label className="input ">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"

                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input name='location' type="search" className="grow" placeholder="Search" />
                    </label>
                </form>
            </div>
            <h2 className='text-3xl font-semibold my-5'>We deliver almost all over Germany.</h2>
            <div className='border w-full h-[600px]'>

                <MapContainer
                    center={position}
                    zoom={7}
                    scrollWheelZoom={false}
                    className='h-[600px]'
                    ref={mapRef}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                        serviceCenters.map(center => <Marker position={[center.latitude, center.longitude]}>
                            <Popup>District: {center.district}. <br />Service Status: {center.status} <br /> Service Area: {center.covered_area.join(', ')}</Popup>
                        </Marker>)
                    }
                </MapContainer>
            </div>
        </div>
    );
};

export default Coverage;