import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/css/bootstrap.min.css';
import './assets/css/style.css';
import Navbar from './components/Navbar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from './layouts/Main';
import TouristAttractionInfo from './layouts/TouristAttractionInfo';
import TouristAttractionList from './layouts/TouristAttractionList';
import TouristAttractionListReco from './layouts/TouristAttractionListReco';

function App() {
  useEffect(async () => {
    window.onpageshow = (event) => {
      if (event.persisted) {
        window.location.reload();
      }
    };
  }, [])

  return (
    <div class="container-xxl bg-white p-0">
      <Navbar />
      <BrowserRouter>
          <Routes>
              <Route path='/jeju' element={<Main/>}/>
              <Route path='/jeju/TouristAttractionList' element={<TouristAttractionList/>}/>
              <Route path='/jeju/TouristAttractionInfo' element={<TouristAttractionInfo/>}/>
              <Route path='/jeju/TouristAttractionListReco' element={<TouristAttractionListReco/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
