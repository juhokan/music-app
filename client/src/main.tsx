import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Helmet, HelmetProvider } from 'react-helmet-async'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Helmet>
        <title>Music App</title>
        <meta name='Music App' content='Review your music' />
      </Helmet>
      <App />
    </HelmetProvider>
  </React.StrictMode>
)
