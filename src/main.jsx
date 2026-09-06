import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
      }}
      containerStyle={{
        zIndex: 999999,
      }}
    />
      <App />
    </BrowserRouter>
  </StrictMode>
)