import React, { useEffect } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default function Raster1() {
    useEffect(() => {
        const map = L.map('map', {
            center: [52.21640, 4.37645],
            zoom: 14
        })

        L.tileLayer.wms(
            'http://testpozi.online/cgi-bin/qgis_mapserv.fcgi?MAP=/var/www/qgis_projects/qs_test_prizen/qs_test_prizen.qgs&',
            {
                layers: 'sample',
                format: 'image/png',
                transparent: true,
                version: '1.3.0'
            }
        ).addTo(map)

        return () => map.remove()
    }, [])

    return <div id="map" style={{ height: '100vh', width: '100%' }} />
}
