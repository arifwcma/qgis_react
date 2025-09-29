import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import CountriesLayer from './CountriesLayer'

export default function MapView() {
    return (
        <MapContainer center={[20, 0]} zoom={2} style={{ height: '100vh', width: '100vw' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <CountriesLayer />
        </MapContainer>
    )
}
