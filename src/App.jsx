/* eslint-disable no-unused-vars */
import React from 'react';
import './App.css'
import {BrowserRouter , Routes, Route} from  "react-router-dom";
import  Home  from './components/Home'
import Training from "./components/Training";
import Description from "./components/Description.jsx";
import './index.css';
import Aboutdc from "./components/Aboutdc.jsx";
import CompleteDetails from './components/CompleteDetails.jsx';
import './i18n';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/training" element={ <Training />} />
        <Route path="/description/:id/:category" element ={ <Description/>}/>
        <Route path="/aboutdc" element={<Aboutdc/>}/>
        <Route path='/completeDetails/:zone' element={<CompleteDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
