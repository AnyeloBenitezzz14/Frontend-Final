import * as React from 'react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
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

        {/* HEADER */}
        <Box sx={headerStyle}>
          <Typography sx={{ fontSize: "1.5rem", fontWeight: 500, color: "#f0ece4" }}>
            {view === "login" ? "Bienvenido" : "Crear cuenta"}
          </Typography>

          <Box sx={switchStyle}>
            <Button
              onClick={() => setView("login")}
              startIcon={<LoginIcon />}
              sx={{
                ...tabStyle,
                background: view === "login" ? "#7c3aed" : "#1a1a1a",
                color: view === "login" ? "#fff" : "#b3b3b3",
                border: view === "login" ? "0.5px solid #7c3aed" : "0.5px solid #2a2a2a"
              }}
            >
              Login
            </Button>

            <Button
              onClick={() => setView("register")}
              startIcon={<HowToRegIcon />}
              sx={{
                ...tabStyle,
                background: view === "register" ? "#7c3aed" : "#1a1a1a",
                color: view === "register" ? "#fff" : "#b3b3b3",
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


// LOGIN


const Login = () => {
  const { login } = useAuth()

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

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
      window.location.hash = '/posts'

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
              <EmailIcon sx={{ color: "#888", fontSize: 18 }} />
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
              <LockIcon sx={{ color: "#888", fontSize: 18 }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} sx={{ color: "#888" }}>
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


// REGISTER


const Register = () => {
  const { login } = useAuth()

  const [form, setForm] = useState({
    correo: '',
    password: '',
    confirmPassword: ''
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()

    if (!form.correo.trim() || !form.password.trim()) {
      return alert("Correo y contraseña son obligatorios")
    }

    if (form.password !== form.confirmPassword) {
      return alert("Las contraseñas no coinciden")
    }

    if (form.password.length < 6) {
      return alert("Mínimo 6 caracteres")
    }

    try {
      setLoading(true)

      const res = await registerRequest({
        email: form.correo.trim().toLowerCase(),
        password: form.password.trim()
      })

      const token = res?.data?.token

      if (!token) return alert("Error en el registro")

      login(token)
      alert("Cuenta creada correctamente ✅")

      window.location.hash = '/posts'

    } catch (err) {
      console.error("ERROR REGISTRO:", err.response?.data || err)
      alert(err?.response?.data?.message || "Error al crear la cuenta")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box component="form" onSubmit={onSubmit} sx={formStyle}>

      <TextField
        name="correo"
        label="Correo"
        value={form.correo}
        onChange={handleChange}
        fullWidth
        disabled={loading}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon sx={{ color: "#888", fontSize: 18 }} />
            </InputAdornment>
          )
        }}
        sx={inputStyle}
      />

      <TextField
        name="password"
        label="Contraseña"
        type={showPassword ? "text" : "password"}
        value={form.password}
        onChange={handleChange}
        fullWidth
        disabled={loading}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon sx={{ color: "#888", fontSize: 18 }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} sx={{ color: "#888" }}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
        sx={inputStyle}
      />

      <TextField
        name="confirmPassword"
        label="Confirmar contraseña"
        type={showConfirmPassword ? "text" : "password"}
        value={form.confirmPassword}
        onChange={handleChange}
        fullWidth
        disabled={loading}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon sx={{ color: "#888", fontSize: 18 }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} sx={{ color: "#888" }}>
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
        sx={inputStyle}
      />

      <Button type="submit" disabled={loading} sx={btnStyle}>
        {loading ? "Creando cuenta..." : "Crear cuenta"}
      </Button>

    </Box>
  )
}


// STYLES


const containerStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#0f0f0f"
}

const cardStyle = {
  width: "400px",
  p: 4,
  borderRadius: "16px",
  background: "#141414",
  border: "0.5px solid #242424"
}

const headerStyle = {
  textAlign: "center",
  mb: 3
}

const switchStyle = {
  display: "flex",
  justifyContent: "center",
  gap: 1,
  mt: 2
}

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 2
}

const tabStyle = {
  borderRadius: "8px",
  px: 2,
  fontWeight: 400,
  textTransform: "none"
}

const btnStyle = {
  mt: 1,
  height: "44px",
  borderRadius: "8px",
  background: "#7c3aed",
  color: "#fff",
  fontWeight: 500,
  textTransform: "none",
  "&:hover": { background: "#6d28d9" }
}

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    background: "#1a1a1a",
    color: "#f0ece4",
    "& fieldset": { borderColor: "#2a2a2a" },
    "&:hover fieldset": { borderColor: "#7c3aed" },
    "&.Mui-focused fieldset": { borderColor: "#7c3aed" }
  },
  "& .MuiInputLabel-root": { color: "#999" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#7c3aed" }
}

export default Myaccount