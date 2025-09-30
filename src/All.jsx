import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, WMSTileLayer, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import axios from 'axios'
import WMSCapabilities from 'ol/format/WMSCapabilities.js'

function flattenLayers(layers) {
    let out = []
    layers.forEach(l => {
        if (l.Name) {
            out.push(l)
        }
        if (l.Layer) {
            out = out.concat(flattenLayers(l.Layer))
        }
    })
    return out
}

export default function All() {
    const [rasters, setRasters] = useState([])
    const [vectors, setVectors] = useState([])

    useEffect(() => {
        fetch('http://testpozi.online/cgi-bin/qgis_mapserv.fcgi?MAP=/var/www/qgis_projects/flood_stawell/flood_stawell.qgs&SERVICE=WMS&REQUEST=GetCapabilities')
            .then(res => res.text())
            .then(text => {
                const parser = new WMSCapabilities()
                const result = parser.read(text)
                const allLayers = flattenLayers(result.Capability.Layer.Layer)

                const rasterLayers = allLayers.filter(l => l.Name !== 'boundary')
                const vectorLayers = allLayers.filter(l => l.Name === 'boundary')

                setRasters(rasterLayers.map(l => l.Name))
                setVectors(vectorLayers.map(l => l.Name))
            })
    }, [])

    return (
        <MapContainer center={[-37.047192, 142.778154]} zoom={13} style={{ height: '100vh', width: '100vw' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {rasters.map((name, i) => (
                <WMSTileLayer
                    key={`r-${i}`}
                    url="http://testpozi.online/cgi-bin/qgis_mapserv.fcgi"
                    params={{
                        MAP: '/var/www/qgis_projects/flood_stawell/flood_stawell.qgs',
                        layers: name,
                        format: 'image/png',
                        transparent: true,
                        version: '1.3.0'
                    }}
                />
            ))}

            {vectors.map((name, i) => (
                <GeoJSONWrapper key={`v-${i}`} name={name} />
            ))}
        </MapContainer>
    )
}

function GeoJSONWrapper({ name }) {
    const [data, setData] = useState(null)

    useEffect(() => {
        axios.get(`http://testpozi.online/cgi-bin/qgis_mapserv.fcgi?MAP=/var/www/qgis_projects/flood_stawell/flood_stawell.qgs&SERVICE=WFS&REQUEST=GetFeature&VERSION=1.1.0&TYPENAME=${name}&OUTPUTFORMAT=application/json`)
            .then(res => setData(res.data))
    }, [name])

    return data ? (
        <GeoJSON
            data={data}
            style={{ color: 'black', weight: 1, fill: false }}
        />
    ) : null
}
