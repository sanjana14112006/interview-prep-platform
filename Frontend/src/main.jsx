// src/main.jsx --> 
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./style.scss"

createRoot(document.getElementById('root')).render(                    // HTML ke index.html file ke <div id="root"> me React ko attach kiya.
  <StrictMode>                                                              
    <App />
  </StrictMode>,
)
