import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddStudent from './Pages/AddStudent.jsx'
import './index.css'
import App from './App.jsx'
import HelpPage from "./Pages/HelpPage.jsx"
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/help" element={<HelpPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
