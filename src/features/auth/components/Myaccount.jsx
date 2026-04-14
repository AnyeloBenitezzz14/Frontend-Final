import * as React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { loginRequest, registerRequest } from '../services/Auth.service'

import {
  Card, Typography, Box, Button, TextField,
  InputAdornment, IconButton, Fade
} from '@mui/material'

import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import LoginIcon from '@mui/icons-material/Login'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

const Myaccount = () => {
  const [view, setView] = useState("login")

  return (
    <Box sx={containerStyle}>
      <Card sx={cardStyle}>

        <Box sx={headerStyle}>
          <Typography sx={{ fontSize: { xs: "1.2rem", md: "1.5rem" }, fontWeight: 500, color: "#f0ece4" }}>
            {view === "login" ? "Bienvenido" : "Crear cuenta"}
          </Typography>

          <Box sx={switchStyle}>
            <Button
              onClick={() => setView("login")}
              startIcon={<LoginIcon sx={{ fontSize: 16 }} />}
              sx={{
                ...tabStyle,
                background: view === "login" ? "#7c3aed" : "#1a1a1a",
                color: view === "login" ? "#fff" : "#666",
                border: view === "login" ? "0.5px solid #7c3aed" : "0.5px solid #2a2a2a"
              }}
            >
              Login
            </Button>

            <Button
              onClick={() => setView("register")}
              startIcon={<HowToRegIcon sx={{ fontSize: 16 }} />}
              sx={{
                ...tabStyle,
                background: view === "register" ? "#7c3aed" : "#1a1a1a",
                color: view === "register" ? "#fff" : "#666",
                border: view === "register" ? "0.5px solid #7c3aed" : "0.5px solid #2a2a2a"
              }}
            >
              Registro
            </Button>
          </Box>
        </Box>

        <Fade in timeout={400}>
          <Box>
            {view === "login" ? <Login /> : <Register />}
          </Box>
        </Fade>

      </Card>
    </Box>
  )
}

/* ================= LOGIN ================= */

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)

      const res = await loginRequest({
        email: form.email.trim().toLowerCase(),
        password: form.password.trim()
      })

      const token = res?.data?.token
      if (!token) return alert("Error de autenticación")

      login(token)

      navigate('/posts')

    } catch (err) {
      alert(err?.response?.data?.message || "Error al iniciar sesión")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box component="form" onSubmit={onSubmit} sx={formStyle}>
      <TextField
        name="email"
        label="Correo"
        onChange={handleChange}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon sx={{ color: "#555", fontSize: 18 }} />
            </InputAdornment>
          )
        }}
        sx={inputStyle}
      />

      <TextField
        name="password"
        label="Contraseña"
        type={showPassword ? "text" : "password"}
        onChange={handleChange}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon sx={{ color: "#555", fontSize: 18 }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
        sx={inputStyle}
      />

      <Button type="submit" disabled={loading} sx={btnStyle}>
        {loading ? "Entrando..." : "Entrar"}
      </Button>
    </Box>
  )
}

/* ================= REGISTER ================= */

const Register = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()

    if (!form.email.trim() || !form.password.trim()) {
      return alert("Por favor completa todos los campos")
    }

    try {
      setLoading(true)

      const res = await registerRequest({
        email: form.email.trim().toLowerCase(),
        password: form.password.trim()
      })

      const token = res?.data?.token
      if (!token) return alert("Error en el registro")

      login(token)

      navigate('/posts')

    } catch (err) {
      alert(err?.response?.data?.message || "Error al registrarse")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box component="form" onSubmit={onSubmit} sx={formStyle}>
      <TextField
        name="email"
        label="Correo"
        onChange={handleChange}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon sx={{ color: "#555", fontSize: 18 }} />
            </InputAdornment>
          )
        }}
        sx={inputStyle}
      />

      <TextField
        name="password"
        label="Contraseña"
        type={showPassword ? "text" : "password"}
        onChange={handleChange}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon sx={{ color: "#555", fontSize: 18 }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
        sx={inputStyle}
      />

      <Button type="submit" disabled={loading} sx={btnStyle}>
        {loading ? "Creando..." : "Crear cuenta"}
      </Button>
    </Box>
  )
}

/* ================= STYLES ================= */

const containerStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#0f0f0f"
}

const cardStyle = {
  width: { xs: "90%", sm: "85%", md: "400px" },
  p: 4,
  borderRadius: "16px",
  background: "#141414",
  border: "0.5px solid #242424"
}

const headerStyle = { textAlign: "center", mb: 3 }

const switchStyle = {
  display: "flex",
  justifyContent: "center",
  gap: 1,
  mt: 2
}

const tabStyle = {
  borderRadius: "8px",
  textTransform: "none"
}

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 2
}

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    background: "#1a1a1a",
    borderRadius: "8px",
    color: "#fff"
  }
}

const btnStyle = {
  mt: 1,
  background: "#7c3aed",
  color: "#fff",
  textTransform: "none",
  "&:hover": { background: "#6d28d9" }
}

export default Myaccount