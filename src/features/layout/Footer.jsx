import * as React from 'react'
import { Box, Typography, IconButton } from "@mui/material"
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'

export const Footer = () => {
    return (
        <Box sx={{
            width: "100%",
            maxWidth: "100vw",
            overflowX: "hidden",
            background: "#4b4949",
            borderTop: "0.5px solid #000000",
            color: "#f0ece4",
            px: { xs: 2, md: 4 },
            py: 6,
            boxSizing: "border-box"
        }}>

            <Box sx={{
                maxWidth: "1100px",
                mx: "auto",
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "repeat(2,1fr)", md: "repeat(3,1fr)" },
                gap: { xs: 4, md: 6 }
            }}>

                {/* INFO */}
                <Box>
                    <Typography sx={{ fontWeight: 500, color: "#7c3aed", mb: 1 }}>
                        Nigga Bank 💸
                    </Typography>
                    <Typography sx={{ color: "#ffffff", fontSize: "0.9rem", lineHeight: 1.7 }}>
                        Gestiona y optimiza tus finanzas con inteligencia.
                    </Typography>
                </Box>

                {/* LINKS */}
                <Box>
                    <Typography sx={{ fontWeight: 500, mb: 1.5, color: "#f0ece4" }}>
                        Navegación
                    </Typography>
                    {["Inicio", "Beneficios", "Planes"].map((item, i) => (
                        <Typography key={i} sx={link}>{item}</Typography>
                    ))}
                </Box>

                {/* REDES */}
                <Box>
                    <Typography sx={{ fontWeight: 500, mb: 1.5, color: "#f0ece4" }}>
                        Síguenos
                    </Typography>
                    <Box>
                        <IconButton sx={iconBtn}><FacebookIcon sx={{ fontSize: 20 }} /></IconButton>
                        <IconButton sx={iconBtn}><InstagramIcon sx={{ fontSize: 20 }} /></IconButton>
                        <IconButton sx={iconBtn}><TwitterIcon sx={{ fontSize: 20 }} /></IconButton>
                    </Box>
                </Box>

            </Box>

            <Box sx={{
                maxWidth: "1100px",
                mx: "auto",
                mt: 4,
                pt: 2,
                borderTop: "0.5px solid #1e1e1e",
                textAlign: "center"
            }}>
                <Typography sx={{ fontSize: "13px", color: "#ebebeb" }}>
                    © 2026 Nigga Bank · Todos los derechos reservados.
                </Typography>
            </Box>

        </Box>
    )
}

const iconBtn = {
    color: "#ffffff",
    "&:hover": { color: "#7c3aed" }
}

const link = {
    color: "#ffffff",
    cursor: "pointer",
    mb: 0.5,
    fontSize: "0.9rem",
    "&:hover": { color: "#7c3aed" }
}