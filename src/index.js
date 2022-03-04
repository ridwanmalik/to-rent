import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { GlobalProvider } from "./components/contexts/GlobalContext"
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import reportWebVitals from './reportWebVitals'
import theme from './theme'
import './styles/index.css'

ReactDOM.render(
  <React.StrictMode>
    <GlobalProvider>
      <LocalizationProvider dateAdapter={ AdapterDateFns }>
        <ThemeProvider theme={ theme }>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </LocalizationProvider>
    </GlobalProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
