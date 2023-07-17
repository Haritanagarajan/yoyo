import { useEffect, useState } from 'react';
import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomeUengage from './components/HomeUengage';
import NavUengage from './components/NavUengage';
import PartnersUengage from './components/PartnersUengage';
import ProductUengage from './components/ProductUengage';
import SpotlightUengage from './components/SpotlightUengage';
import WehireUengage from './components/WehireUengage';
import SignupUengage from './components/SignupUengage';
import PrivateAuth from './components/PrivateAuth';
import Sigin from './components/Sigin';
import Task from './components/Task';
import { UserProvider } from './components/CreateContext';
import Taskdisplay from './components/TaskDisplay';
// import ProtectedAuth from './components/ProtectedAuth';
function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/login')
      .then(response => response.json())
      .then(data => setUserData(data))
      .catch(error => console.log(error));
  }, []);

  const isAdmin = userData?.utype === 'Admin';

  return (
    <UserProvider>
      <div>
        <NavUengage />
        <Routes>
          <Route exact path="/HomeUengage" element={<HomeUengage />} />
          <Route exact path="/PartnersUengage" element={<PartnersUengage />} />
          <Route
            exact
            path="/ProductUengage"
            element={isAdmin ? (
              <ProductUengage />
            ) : (
              <PrivateAuth>
                <ProductUengage />
              </PrivateAuth>
            )}
          />
          <Route exact path="/SpotlightUengage" element={<SpotlightUengage />} />
          <Route exact path="/WehireUengage" element={<WehireUengage />} />
          <Route exact path="/SignupUengage" element={<SignupUengage />} />
          <Route exact path="/Task" element={<Task />} />
          <Route exact path='/Taskdisplay/:id' element={<Taskdisplay />} />
          <Route exact path="/Sigin" element={<Sigin />} />
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;



