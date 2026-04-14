import * as React from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Box, Typography, Button, AppBar, Toolbar, IconButton, Drawer, List, ListItem } from "@mui/material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { useAuth } from '../auth/hooks/useAuth'

export const Header = () => {
    const [open, setOpen] = useState(false)
    const { isAuth } = useAuth()

    return (
        <>
            <AppBar position="fixed" sx={{
                background: "#4b4949",
                borderBottom: "0.5px solid #2a2a2a",
                boxShadow: "none",
                width: "100%",
                left: 0
            }}>
                <Toolbar sx={{
                    maxWidth: "1100px",
                    width: "100%",
                    mx: "auto",
                    px: { xs: 2, md: 4 },
                    boxSizing: "border-box",
                    display: "flex",
                    justifyContent: "space-between"
                }}>

                    <Typography component={NavLink} to="/" sx={{
                        textDecoration: "none",
                        fontWeight: 500,
                        fontSize: "1.2rem",
                        color: "#7c3aed"
                    }}>
                        Nigga Bank 💸
                    </Typography>

                    {/* NAV DESKTOP */}
                    <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
                        <NavItem to="/" label="Inicio" />
                        <NavItem to="/#beneficios" label="Beneficios" />
                        <NavItem to="/#como-funciona" label="Cómo funciona" />
                        <NavItem to="/precios" label="Precios" />
                        <NavItem to="/Api" label="API" />
                    </Box>

                    {/* BOTÓN DESKTOP */}
                    {!isAuth && (
                        <Button
                            component={NavLink}
                            to="/Myaccount"
                            startIcon={<AccountCircleIcon sx={{ fontSize: 18 }} />}
                            sx={{
                                display: { xs: "none", md: "flex" },
                                background: "#7c3aed",
                                color: "#fff",
                                fontWeight: 500,
                                borderRadius: "8px",
                                textTransform: "none",
                                px: 2.5,
                                "&:hover": { background: "#6d28d9" }
                            }}
                        >
                            Iniciar sesión
                        </Button>
                    )}

                    <IconButton
                        onClick={() => setOpen(true)}
                        sx={{ display: { xs: "flex", md: "none" }, color: "#999" }}
                    >
                        <MenuIcon />
                    </IconButton>

                </Toolbar>
            </AppBar>

            {/* DRAWER MOBILE */}
            <Drawer
                anchor="right"
                open={open}
                onClose={() => setOpen(false)}
                PaperProps={{
                    sx: {
                        background: "#141414",
                        border: "none",
                        borderLeft: "0.5px solid #2a2a2a",
                        width: "260px",
                        p: 3
                    }
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                    <Typography sx={{ color: "#7c3aed", fontWeight: 500 }}>Nigga Bank 💸</Typography>
                    <IconButton onClick={() => setOpen(false)} sx={{ color: "#666" }}>
                        <CloseIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                </Box>

                <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    {[
                        { to: "/", label: "Inicio" },
                        { to: "/#beneficios", label: "Beneficios" },
                        { to: "/#como-funciona", label: "Cómo funciona" },
                        { to: "/precios", label: "Precios" },
                        { to: "/Api", label: "API" }
                    ].map((item) => (
                        <ListItem key={item.label} disablePadding>
                            <Typography
                                component={NavLink}
                                to={item.to}
                                onClick={() => setOpen(false)}
                                sx={{
                                    textDecoration: "none",
                                    color: "#bbb",
                                    fontSize: "1rem",
                                    fontWeight: 400,
                                    py: 1,
                                    width: "100%",
                                    "&:hover": { color: "#7c3aed" },
                                    "&.active": { color: "#7c3aed" }
                                }}
                            >
                                {item.label}
                            </Typography>
                        </ListItem>
                    ))}
                </List>

                {!isAuth && (
                    <Button
                        component={NavLink}
                        to="/Myaccount"
                        onClick={() => setOpen(false)}
                        startIcon={<AccountCircleIcon sx={{ fontSize: 18 }} />}
                        sx={{
                            mt: 4,
                            background: "#7c3aed",
                            color: "#fff",
                            fontWeight: 500,
                            borderRadius: "8px",
                            textTransform: "none",
                            width: "100%",
                            "&:hover": { background: "#6d28d9" }
                        }}
                    >
                        Iniciar sesión
                    </Button>
                )}
            </Drawer>
        </>
    )
}

const NavItem = ({ to, label }) => (
    <Typography
        component={NavLink}
        to={to}
        sx={{
            textDecoration: "none",
            color: "#bbb",
            fontWeight: 400,
            fontSize: "0.9rem",
            "&:hover": { color: "#7c3aed" },
            "&.active": { color: "#7c3aed" }
        }}
    >
        {label}
    </Typography>
)