import { MapContainer, TileLayer, WMSTileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export default function Raster1() {
    return (
        <MapContainer center={[52.21640, 4.37645]} zoom={14} style={{ height: '100vh', width: '100vw' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <WMSTileLayer
                url="http://testpozi.online/cgi-bin/qgis_mapserv.fcgi"
                params={{
                    MAP: '/var/www/qgis_projects/flood_stawell/flood_stawell.qgs',
                    layers: 'sample',
                    format: 'image/png',
                    transparent: true,
                    version: '1.3.0'
                }}
            />
        </MapContainer>
    )
}
