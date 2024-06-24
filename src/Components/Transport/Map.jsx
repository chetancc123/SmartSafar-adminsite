import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

const MapComponent = () => {
  const [position, setPosition] = useState([51.505, -0.09]);

  return (
    <MapContainer
  center={position}
  zoom={13}
  style={{ height: '400px', width: '100%' }}
  scrollWheelZoom={false}
>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
</MapContainer>
  );
};

export default MapComponent;