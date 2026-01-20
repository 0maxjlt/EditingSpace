import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Login } from './auth/Login'
import { Register } from './auth/Register'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme/theme'
import CssBaseline from '@mui/material/CssBaseline'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
