import React, { useEffect, useState } from 'react'
import WMSCapabilities from 'ol/format/WMSCapabilities.js'

function flattenLayers(layers) {
    let out = []
    layers.forEach(l => {
        if (l.Name) {
            out.push({ name: l.Name, title: l.Title })
        }
        if (l.Layer) {
            out = out.concat(flattenLayers(l.Layer))
        }
    })
    return out
}

export default function Info() {
    const [layers, setLayers] = useState([])

    useEffect(() => {
        fetch('http://testpozi.online/cgi-bin/qgis_mapserv.fcgi?MAP=/var/www/qgis_projects/flood_stawell/flood_stawell.qgs&SERVICE=WMS&REQUEST=GetCapabilities')
            .then(res => res.text())
            .then(text => {
                const parser = new WMSCapabilities()
                const result = parser.read(text)
                const flat = flattenLayers(result.Capability.Layer.Layer)
                setLayers(flat)
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
