import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import reportWebVitals from './reportWebVitals'
import theme from './theme'
import './styles/index.css'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={ theme }>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
