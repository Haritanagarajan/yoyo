import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomeUengage from './components/HomeUengage';
import NavUengage from './components/NavUengage';
import PartnersUengage from './components/PartnersUengage';
import ProductUengage from './components/ProductUengage';
import SpotlightUengage from './components/SpotlightUengage';
import WehireUengage from './components/WehireUengage';
import SignupUengage from './components/SignupUengage';
import PrivateAuth from './components/PrivateAuth';
import ProtectedAuth from './components/ProtectedAuth';
function App() {
  return (
    <div>
      <NavUengage />
      <Routes>
        <Route exact path='HomeUengage' element={<HomeUengage />} />
        <Route exact path='PartnersUengage' element={<PartnersUengage />} />
        <Route exact path='ProductUengage' element={<ProtectedAuth ><PrivateAuth ><ProductUengage /></PrivateAuth></ProtectedAuth>} />
        {/* <Route exact path='ProductUengage' element={<PrivateAuth><ProtectedAuth/><ProductUengage /></PrivateAuth>} /> */}
        <Route exact path='SpotlightUengage' element={<ProtectedAuth ><PrivateAuth ><SpotlightUengage /></PrivateAuth></ProtectedAuth>} />
        <Route exact path='WehireUengage' element={<WehireUengage />} />
        <Route exact path='SignupUengage' element={<SignupUengage />} />
      </Routes>

    </div>
  )
}

export default App;
