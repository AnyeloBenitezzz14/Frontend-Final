import { useState } from 'react';
import { deleteProducto, updateProducto } from '../services/Productos.Service';
import { TableRow, TableCell, TextField, IconButton, Tooltip, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

export default function ProductoItem({ Producto, onChange, isMobile = false }) {
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(Producto);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await updateProducto(Producto._id, {
        nombre: form.nombre,
        descripcion: form.descripcion,
        precio: parseFloat(form.precio),
        stock: parseInt(form.stock),
        categoria_id: form.categoria_id
      });
      setEdit(false);
      onChange?.();
    } catch (err) {
      console.error(err);
      alert('Error actualizando Producto');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('¿Eliminar Producto?')) return;
    try {
      await deleteProducto(Producto._id);
      onChange?.();
    } catch (err) {
      console.error(err);
      alert('Error eliminando Producto');
    }
  };

  const handleCancel = () => { setEdit(false); setForm(Producto); };

  const cellSx = { color: "#888", borderBottom: "0.5px solid #1e1e1e", fontSize: "0.88rem" };
  const editField = (name, type = "text", inputProps) => (
    <TextField
      name={name} value={form[name]} onChange={handleChange}
      type={type} inputProps={inputProps} size="small"
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "6px", background: "#1a1a1a", color: "#f0ece4",
          "& fieldset": { borderColor: "#2a2a2a" },
          "&.Mui-focused fieldset": { borderColor: "#7c3aed" }
        }
      }}
    />
  );

  // VISTA MOBILE
  if (isMobile) {
    return (
      <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
        {edit ? (
          <>
            <Tooltip title="Guardar">
              <IconButton onClick={handleSave} disabled={saving} sx={{ color: "#7c3aed", p: 1 }}>
                <SaveIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Cancelar">
              <IconButton onClick={handleCancel} sx={{ color: "#555", p: 1 }}>
                <CloseIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <>
            <Tooltip title="Editar">
              <IconButton onClick={() => setEdit(true)} sx={{ color: "#555", "&:hover": { color: "#7c3aed" }, p: 1 }}>
                <EditIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton onClick={handleDelete} sx={{ color: "#555", "&:hover": { color: "#ef4444" }, p: 1 }}>
                <DeleteIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Box>
    );
  }

  
  return (
    <TableRow sx={{ "&:hover": { background: "#181818" } }}>
      <TableCell sx={cellSx}>{edit ? editField("nombre") : Producto.nombre}</TableCell>
      <TableCell sx={cellSx}>{edit ? editField("descripcion") : Producto.descripcion}</TableCell>
      <TableCell sx={cellSx}>{edit ? editField("precio", "number", { min: 0, step: '0.01' }) : `$${Producto.precio}`}</TableCell>
      <TableCell sx={cellSx}>{edit ? editField("stock", "number", { min: 0, step: '1' }) : Producto.stock}</TableCell>
      <TableCell sx={cellSx}>{edit ? editField("categoria_id") : Producto.categoria_id}</TableCell>
      <TableCell sx={{ borderBottom: "0.5px solid #1e1e1e" }}>
        {edit ? (
          <>
            <Tooltip title="Guardar">
              <IconButton onClick={handleSave} disabled={saving} sx={{ color: "#7c3aed" }}>
                <SaveIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Cancelar">
              <IconButton onClick={handleCancel} sx={{ color: "#555" }}>
                <CloseIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <>
            <Tooltip title="Editar">
              <IconButton onClick={() => setEdit(true)} sx={{ color: "#555", "&:hover": { color: "#7c3aed" } }}>
                <EditIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton onClick={handleDelete} sx={{ color: "#555", "&:hover": { color: "#ef4444" } }}>
                <DeleteIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>
          </>
        )}
      </TableCell>
    </TableRow>
  );
}