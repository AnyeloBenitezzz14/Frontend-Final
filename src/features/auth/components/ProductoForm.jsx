import { useState } from 'react';
import { createProducto } from '../services/Productos.Service';
import { useAuth } from '../hooks/useAuth';
import { Box, TextField, Button, Typography, MenuItem } from '@mui/material';

export default function ProductoForm({ onSaved }) {
  const { token } = useAuth();

  const [form, setForm] = useState({
    nombre: '', descripcion: '', precio: '', stock: '', categoria: ''
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: value === '' ? 'Este campo es obligatorio' : '' }));
  };

  const isValid =
    form.nombre.trim() && form.descripcion.trim() &&
    form.precio !== '' && form.stock !== '' && form.categoria !== '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return alert('Todos los campos son obligatorios');
    if (isNaN(form.precio) || isNaN(form.stock)) return alert('Precio y stock deben ser números válidos');

    try {
      setSaving(true);
      const payload = {
        nombre: form.nombre.trim(),
        descripcion: form.descripcion.trim(),
        precio: Number(form.precio),
        stock: Number(form.stock),
        categoria: form.categoria
      };
      console.log("Enviando producto:", payload);
      await createProducto(payload, token);
      setForm({ nombre: '', descripcion: '', precio: '', stock: '', categoria: '' });
      setErrors({});
      onSaved?.();
      alert('Producto creado correctamente ✅');
    } catch (err) {
      console.error("ERROR COMPLETO:", err);
      console.log("DATA:", err.response?.data);
      if (err.response?.data?.errors) {
        alert(err.response.data.errors.map(e => e.msg).join('\n'));
      } else if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert('Error creando Producto');
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: "12px",
        background: "#141414",
        border: "0.5px solid #242424",
        mb: 4
      }}
    >
      <Typography sx={{ fontWeight: 500, fontSize: { xs: "0.9rem", md: "1rem" }, color: "#f0ece4", mb: 2.5 }}>
        Nuevo Producto
      </Typography>

      {[
        { name: "nombre", label: "Nombre *" },
        { name: "descripcion", label: "Descripción *", multiline: true, rows: 3 },
        { name: "precio", label: "Precio *", type: "number", inputProps: { min: 0, step: '0.01' } },
        { name: "stock", label: "Stock *", type: "number", inputProps: { min: 0 } }
      ].map((f) => (
        <TextField
          key={f.name}
          name={f.name}
          label={f.label}
          type={f.type || "text"}
          fullWidth
          multiline={f.multiline}
          rows={f.rows}
          inputProps={f.inputProps}
          value={form[f.name]}
          onChange={handleChange}
          error={!!errors[f.name]}
          helperText={errors[f.name]}
          sx={{ ...fieldStyle, mb: 2 }}
        />
      ))}

      <TextField
        select name="categoria" label="Categoría *" fullWidth
        value={form.categoria} onChange={handleChange}
        error={!!errors.categoria} helperText={errors.categoria}
        sx={{ ...fieldStyle, mb: 2 }}
      >
        <MenuItem value="">Selecciona</MenuItem>
        <MenuItem value="tecnologia">Tecnología</MenuItem>
        <MenuItem value="hogar">Hogar</MenuItem>
        <MenuItem value="ropa">Ropa</MenuItem>
        <MenuItem value="otros">Otros</MenuItem>
      </TextField>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={!isValid || saving}
        sx={{
          mt: 1,
          height: "44px",
          borderRadius: "8px",
          background: "#7c3aed",
          fontWeight: 500,
          textTransform: "none",
          "&:hover": { background: "#6d28d9" },
          "&.Mui-disabled": { background: "#2a2a2a", color: "#555" }
        }}
      >
        {saving ? 'Guardando...' : 'Crear Producto'}
      </Button>
    </Box>
  );
}

const fieldStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    background: "#1a1a1a",
    color: "#f0ece4",
    "& fieldset": { borderColor: "#2a2a2a" },
    "&:hover fieldset": { borderColor: "#7c3aed" },
    "&.Mui-focused fieldset": { borderColor: "#7c3aed" }
  },
  "& .MuiInputLabel-root": { color: "#555" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#7c3aed" },
  "& .MuiFormHelperText-root": { color: "#ef4444" }
}