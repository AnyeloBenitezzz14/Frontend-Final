import ProductoItem from './ProductoItem';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography, Box
} from '@mui/material';

export default function ProductoList({ items = [], onChange }) {

  if (!Array.isArray(items) || items.length === 0) {
    return (
      <Box p={{ xs: 2, md: 4 }} textAlign="center">
        <Typography sx={{ color: "#ffffff" }}>No hay Productos 😢</Typography>
      </Box>
    );
  }

  return (
    <>
    
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <TableContainer component={Paper} sx={{
          borderRadius: "12px",
          background: "#000000",
          border: "0.5px solid #242424",
          boxShadow: "none"
        }}>
          <Table>
            <TableHead>
              <TableRow sx={{ background: "#1a1a1a", borderBottom: "0.5px solid #7c3aed" }}>
                {["Nombre", "Descripción", "Precio", "Stock", "Categoría", "Acciones"].map((h) => (
                  <TableCell key={h} sx={{ color: "#7c3aed", fontWeight: 500, fontSize: "0.85rem", borderBottom: "0.5px solid #2a2a2a" }}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((p) => (
                <ProductoItem key={p._id || p.id} Producto={p} onChange={onChange} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      
      <Box sx={{ display: { xs: "grid", md: "none" }, gridTemplateColumns: "1fr", gap: 2 }}>
        {items.map((p) => (
          <Box
            key={p._id || p.id}
            sx={{
              p: 2,
              borderRadius: "12px",
              background: "#141414",
              border: "0.5px solid #242424",
              display: "flex",
              flexDirection: "column",
              gap: 1.5
            }}
          >
            <Box>
              <Typography sx={{ fontSize: "0.75rem", color: "#7c3aed", fontWeight: 500, mb: 0.5 }}>NOMBRE</Typography>
              <Typography sx={{ color: "#888", fontSize: "0.95rem", fontWeight: 500 }}>{p.nombre}</Typography>
            </Box>
            <Box>
              <Typography sx={{ fontSize: "0.75rem", color: "#7c3aed", fontWeight: 500, mb: 0.5 }}>DESCRIPCIÓN</Typography>
              <Typography sx={{ color: "#ffffff", fontSize: "0.9rem", lineHeight: 1.4 }}>{p.descripcion}</Typography>
            </Box>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
              <Box>
                <Typography sx={{ fontSize: "0.75rem", color: "#7c3aed", fontWeight: 500, mb: 0.5 }}>PRECIO</Typography>
                <Typography sx={{ color: "#fffafa", fontSize: "0.95rem" }}>${p.precio}</Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: "0.75rem", color: "#7c3aed", fontWeight: 500, mb: 0.5 }}>STOCK</Typography>
                <Typography sx={{ color: "#ffffff", fontSize: "0.95rem" }}>{p.stock}</Typography>
              </Box>
            </Box>
            <Box>
              <Typography sx={{ fontSize: "0.75rem", color: "#7c3aed", fontWeight: 500, mb: 0.5 }}>CATEGORÍA</Typography>
              <Typography sx={{ color: "#fffefe", fontSize: "0.9rem" }}>{p.categoria_id}</Typography>
            </Box>
            <ProductoItem key={p._id || p.id} Producto={p} onChange={onChange} isMobile={true} />
          </Box>
        ))}
      </Box>
    </>
  );
}