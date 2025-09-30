import { useEffect, useState } from 'react'
import { GeoJSON, useMap } from 'react-leaflet'
import axios from 'axios'
import L from 'leaflet'

function FitBounds({ data }) {
    const map = useMap()
    useEffect(() => {
        if (data) {
            const layer = new L.GeoJSON(data)
            map.fitBounds(layer.getBounds())
        }
    }, [data])
    return null
}

export default function CountriesLayer() {
    const [data, setData] = useState(null)

    useEffect(() => {
        axios.get('http://testpozi.online/cgi-bin/qgis_mapserv.fcgi?MAP=/var/www/qgis_projects/flood_stawell/flood_stawell.qgs&SERVICE=WFS&REQUEST=GetFeature&VERSION=1.1.0&TYPENAME=countries&OUTPUTFORMAT=application/json')
            .then(res => setData(res.data))
    }, [])

    return data ? (
        <>
            <GeoJSON data={data} />
            <FitBounds data={data} />
        </>
    ) : null
}
