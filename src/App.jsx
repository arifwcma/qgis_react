import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MapView from './MapView.jsx'
import Raster1 from './Raster1.jsx'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MapView />} />
                <Route path="/raster1" element={<Raster1 />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
