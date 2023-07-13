import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomeyoyoUengage from './components/HomeUengage';
import NavUengage from './components/NavUengage';
import PartnersUengage from './components/PartnersUengage';
import ProductUengage from './components/ProductUengage';
import SpotlightUengage from './components/SpotlightUengage';
import WehireUengage from './components/WehireUengage';
function App() {
  return (
    <div>
      <NavUengage />
      <Routes>
        <Route exact path='HomeyoyoUengage' element={<HomeyoyoUengage />} />
        <Route exact path='PartnersUengage' element={<PartnersUengage />} />
        <Route exact path='ProductUengage' element={<ProductUengage />} />
        <Route exact path='SpotlightUengage' element={<SpotlightUengage />} />
        <Route exact path='WehireUengage ' element={<WehireUengage />} />
      </Routes>
    </div>
  )
}

export default App;
