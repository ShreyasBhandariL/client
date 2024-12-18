/* eslint-disable no-unused-vars */
import React from 'react';
import './App.css'
import {BrowserRouter , Routes, Route} from  "react-router-dom";
import  Home  from './components/Home'
import Description from "./components/Description.jsx";
import './index.css';
import CompleteDetails from './components/CompleteDetails.jsx';
import './i18n';
import NotFound from './components/NotFound.jsx';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/description/:id/:category" element ={ <Description/>}/>
        <Route path='/completeDetails/:zone' element={<CompleteDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
