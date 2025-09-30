import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, GeoJSON, WMSTileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import axios from 'axios'

export default function Vr1() {
    const [data, setData] = useState(null)

    useEffect(() => {
        axios.get('http://testpozi.online/cgi-bin/qgis_mapserv.fcgi?MAP=/var/www/qgis_projects/flood_stawell/flood_stawell.qgs&SERVICE=WFS&REQUEST=GetFeature&VERSION=1.1.0&TYPENAME=countries&OUTPUTFORMAT=application/json')
            .then(res => setData(res.data))
    }, [])

    return (
        <MapContainer center={[52.21640, 4.37645]} zoom={12} style={{ height: '100vh', width: '100vw' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {data && <GeoJSON data={data} />}
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
