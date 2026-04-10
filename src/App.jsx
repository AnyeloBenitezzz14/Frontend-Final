import { useEffect, useState } from 'react';
import ProductoForm from './features/auth/components/ProductoForm';
import ProductoList from './features/auth/components/ProductoList';
import  Myaccount  from './features/auth/components/Myaccount';
import { useAuth } from './features/auth/context/AuthContext';
import { listProductos } from './features/auth/services/Productos.Service';

import { Container, Box, Typography, Button, TextField } from '@mui/material';

export default function App() {
  const { isAuth, logout, token } = useAuth();
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await listProductos({ q }, token);
      console.log('RESPUESTA COMPLETA:', res);
      console.log('DATA:', res?.data);
      setItems(Array.isArray(res?.data) ? res.data : res?.data?.items || []);
    } catch (err) {
      console.error('ERROR COMPLETO:', err);
      console.log('ERROR RESPONSE:', err?.response);
      alert('No se pudo cargar la lista');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuth) loadData();
  }, [isAuth]);

  const handleSearch = (e) => {
    e.preventDefault();
    loadData();
  };

  if (!isAuth) return <Myaccount />;

  return (
    <Box sx={{ background: "#0f0f0f", minHeight: "100vh" }}>
      <Container maxWidth="lg" sx={{ pt: { xs: 10, md: 12 }, pb: 8, px: { xs: 2, md: 4 } }}>

        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems={{ xs: "flex-start", md: "center" }} mb={5} flexDirection={{ xs: "column", md: "row" }} gap={{ xs: 2, md: 0 }}>
          <Typography sx={{ fontSize: { xs: "1.4rem", md: "1.8rem" }, fontWeight: 500, color: "#f0ece4", letterSpacing: "-0.5px" }}>
            Gestor de Productos
          </Typography>
          <Button
            onClick={logout}
            sx={{
              background: "transparent",
              color: "#888",
              border: "0.5px solid #2a2a2a",
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 400,
              fontSize: { xs: "0.85rem", md: "1rem" },
              px: { xs: 2, md: 3 },
              "&:hover": { background: "#1a1a1a", color: "#f0ece4", borderColor: "#3a3a3a" }
            }}
          >
            Salir
          </Button>
        </Box>

      
        <Box component="form" onSubmit={handleSearch} display="flex" flexDirection={{ xs: "column", md: "row" }} gap={2} mb={5}>
          <TextField
            fullWidth
            label="Buscar Producto"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                background: "#141414",
                color: "#f0ece4",
                "& fieldset": { borderColor: "#2a2a2a" },
                "&:hover fieldset": { borderColor: "#7c3aed" },
                "&.Mui-focused fieldset": { borderColor: "#7c3aed" }
              },
              "& .MuiInputLabel-root": { color: "#555" },
              "& .MuiInputLabel-root.Mui-focused": { color: "#7c3aed" }
            }}
          />
          <Box display="flex" gap={2} sx={{ width: { xs: "100%", md: "auto" } }}>
            <Button
              type="submit"
              sx={{
                background: "#7c3aed",
                color: "#fff",
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 500,
                px: { xs: 2, md: 3 },
                flex: { xs: 1, md: "auto" },
                "&:hover": { background: "#6d28d9" }
              }}
            >
              Buscar
            </Button>
            <Button
              onClick={() => { setQ(''); loadData(); }}
              sx={{
                background: "transparent",
                color: "#888",
                border: "0.5px solid #2a2a2a",
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 400,
                px: { xs: 2, md: 3 },
                flex: { xs: 1, md: "auto" },
                "&:hover": { background: "#1a1a1a", borderColor: "#3a3a3a" }
              }}
            >
              Limpiar
            </Button>
          </Box>
        </Box>

        {/* FORM */}
        <ProductoForm onSaved={loadData} />

        {/* LISTA */}
        {loading ? (
          <Typography sx={{ color: "#555" }}>Cargando...</Typography>
        ) : (
          <ProductoList items={items} onChange={loadData} />
        )}

      </Container>
    </Box>
  );
}