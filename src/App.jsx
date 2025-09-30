import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MapView from './MapView.jsx'
import Raster1 from './Raster1.jsx'
import Info from './Info'
import Vr1 from './Vr1.jsx'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MapView />} />
                <Route path="/raster1" element={<Raster1 />} />
                <Route path="/info" element={<Info />} />
                <Route path="/vr1" element={<Vr1 />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
