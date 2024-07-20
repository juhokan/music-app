import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { PrimeReactProvider } from 'primereact/api'
import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css'
import 'primeflex/primeflex.css'

const value = {
  ripple: false
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Helmet>
        <title>Music App</title>
        <meta name='description' content='Review your music'/>
      </Helmet>
      <PrimeReactProvider value={value}>
        <App />
      </PrimeReactProvider> 
    </HelmetProvider>
  </React.StrictMode>
)
