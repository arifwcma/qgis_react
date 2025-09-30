import React, { useEffect, useState } from 'react'
import WMSCapabilities from 'ol/format/WMSCapabilities.js'



export default function Info() {
    const [layers, setLayers] = useState([])

    useEffect(() => {
        fetch('http://testpozi.online/cgi-bin/qgis_mapserv.fcgi?MAP=/var/www/qgis_projects/flood_stawell/flood_stawell.qgs&SERVICE=WMS&REQUEST=GetCapabilities')
            .then(res => res.text())
            .then(text => {
                const parser = new WMSCapabilities()
                const result = parser.read(text)
                const layerList = result.Capability.Layer.Layer.map(l => ({
                    name: l.Name,
                    title: l.Title
                }))
                setLayers(layerList)
            })
    }, [])

    return (
        <div>
            <h3>Available Layers</h3>
            <ul>
                {layers.map((l, i) => (
                    <li key={i}>{l.name} — {l.title}</li>
                ))}
            </ul>
        </div>
    )
}
