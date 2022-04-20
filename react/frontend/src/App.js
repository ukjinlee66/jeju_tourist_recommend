import React, { useEffect } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from './layouts/Main';
import TouristAttractionInfo from './layouts/TouristAttractionInfo';
import TouristAttractionList from './layouts/TouristAttractionList';
import TouristAttractionListReco from './layouts/TouristAttractionListReco';
import Admin from './layouts/Admin.js'

function App() {
  useEffect(async () => {
    window.onpageshow = (event) => {
      if (event.persisted) {
        window.location.reload();
      }
    };
  }, [])

  return (
      <BrowserRouter>
          <Routes>
              <Route path='/jeju' element={<Main/>}/>
              <Route path='/jeju/TouristAttractionList' element={<TouristAttractionList/>}/>
              <Route path='/jeju/TouristAttractionInfo' element={<TouristAttractionInfo/>}/>
              <Route path='/jeju/TouristAttractionListReco' element={<TouristAttractionListReco/>}/>
              <Route path='/jeju/Maps' element={<Admin/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
