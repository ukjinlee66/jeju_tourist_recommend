import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import './component/css/bootstrap.min.css';
import './component/css/style.css';
import Navbar from './component/Navbar';
import {HashRouter , BrowserRouter, Routes, Route, Switch} from 'react-router-dom';
import Main from './Main';
import TouristAttractionInfo from './TouristAttractionInfo';
import TouristAttractionList from './TouristAttractionList';

function App() {
  return (
    <div class="container-xxl bg-white p-0">
      <Navbar />
      <HashRouter>
          <Routes>
              <Route path='/' element={<Main/>}/>
              <Route path='/TouristAttractionList' element={<TouristAttractionList/>}/>
              <Route path='/TouristAttractionInfo' element={<TouristAttractionInfo/>}/>
          </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
