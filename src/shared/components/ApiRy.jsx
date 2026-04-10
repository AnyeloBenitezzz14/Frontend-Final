import { useEffect, useState } from "react"
import axios from "axios"
import {
    Box, Typography, Card, CardContent, CardMedia,
    Grid, TextField, InputAdornment
} from "@mui/material"
import SearchIcon from '@mui/icons-material/Search'

export const Api = () => {
    const [characters, setCharacters] = useState([])
    const [page, setPage] = useState(1)
    const [info, setInfo] = useState({})
    const [query, setQuery] = useState('')

    useEffect(() => {
        const source = axios.CancelToken.source()
        axios.get("https://rickandmortyapi.com/api/character", {
            params: { page, name: query },
            cancelToken: source.token
        })
            .then(({ data }) => {
                setCharacters(data.results || [])
                setInfo(data.info || {})
            })
            .catch((err) => {
                if (axios.isCancel(err)) return
                if (err.response?.status === 404) {
                    setCharacters([])
                    setInfo({})
                    return
                }
                console.error(err)
            })
        return () => source.cancel()
    }, [page, query])

    return (
        <Box sx={{
            width: "100%",
            minHeight: "100vh",
            background: "#0f0f0f",
            px: { xs: 2, md: 4 },
            py: { xs: 10, md: 12 },
            boxSizing: "border-box"
        }}>
            <Box sx={{ maxWidth: "1100px", mx: "auto" }}>

                <Typography sx={{
                    fontSize: { xs: "1.6rem", md: "2.2rem" },
                    fontWeight: 500,
                    color: "#f0ece4",
                    letterSpacing: "-0.5px",
                    mb: 4
                }}>
                    Personajes Rick & Morty 👽
                </Typography>

                <TextField
                    fullWidth
                    placeholder="Buscar personaje..."
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setPage(1) }}
                    sx={{
                        mb: 5,
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "10px",
                            backgroundColor: "#141414",
                            color: "#f0ece4",
                            "& fieldset": { borderColor: "#2a2a2a" },
                            "&:hover fieldset": { borderColor: "#7c3aed" },
                            "&.Mui-focused fieldset": { borderColor: "#7c3aed" }
                        },
                        "& input": { color: "#f0ece4" },
                        "& input::placeholder": { color: "#666" }
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: "#7c3aed" }} />
                            </InputAdornment>
                        )
                    }}
                />

                <Grid container spacing={3}>
                    {characters.map((char) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={char.id}>
                            <Card sx={{
                                borderRadius: "14px",
                                overflow: "hidden",
                                background: "#141414",
                                border: "0.5px solid #242424",
                                boxShadow: "none",
                                transition: "border-color 0.2s, transform 0.2s",
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    borderColor: "#7c3aed"
                                }
                            }}>
                                <Box sx={{ position: "relative" }}>
                                    <CardMedia
                                        component="img"
                                        height="260"
                                        image={char.image}
                                        alt={char.name}
                                    />
                                    <Box sx={{
                                        position: "absolute",
                                        top: 10,
                                        right: 10,
                                        px: 1.5,
                                        py: 0.5,
                                        borderRadius: "8px",
                                        fontSize: "11px",
                                        fontWeight: 500,
                                        backgroundColor:
                                            char.status === "Alive" ? "#14291a" :
                                            char.status === "Dead" ? "#291414" : "#1e1e1e",
                                        color:
                                            char.status === "Alive" ? "#4ade80" :
                                            char.status === "Dead" ? "#f87171" : "#aaa",
                                        border: `0.5px solid ${
                                            char.status === "Alive" ? "#4ade80" :
                                            char.status === "Dead" ? "#f87171" : "#333"
                                        }`
                                    }}>
                                        {char.status}
                                    </Box>
                                </Box>

                                <CardContent sx={{ p: 2.5 }}>
                                    <Typography sx={{ fontWeight: 500, fontSize: "1rem", color: "#f0ece4", mb: 1 }}>
                                        {char.name}
                                    </Typography>
                                    <Typography sx={infoText}>Especie: {char.species}</Typography>
                                    <Typography sx={infoText}>Género: {char.gender}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {characters.length === 0 && (
                    <Typography sx={{ textAlign: "center", mt: 6, color: "#888" }}>
                        No se encontraron personajes 🫠
                    </Typography>
                )}

            </Box>
        </Box>
    )
}

const infoText = { fontSize: "0.85rem", color: "#888" }