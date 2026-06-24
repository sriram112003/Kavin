import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FirstPage from "./assets/First";
import Letter from "./assets/Letter";
import FullLetter from "./assets/FullLetter";
import './App.css'

function App() {
  
   return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/letter" element={<Letter />} />
        <Route path="/full-letter" element={<FullLetter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
