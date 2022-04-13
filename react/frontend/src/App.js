import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './component/css/bootstrap.min.css';
import './component/css/style.css';
import Navbar from './component/Navbar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from './Main';
import TouristAttractionInfo from './TouristAttractionInfo';
import TouristAttractionList from './TouristAttractionList';
import TouristAttractionListReco from './TouristAttractionListReco';

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
