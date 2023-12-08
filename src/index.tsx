import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'aos/dist/aos.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import store from './store'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <GoogleOAuthProvider clientId="652659912678-el8asn8a25nrggdas194phv9710o9b43.apps.googleusercontent.com">
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </GoogleOAuthProvider>,
)
