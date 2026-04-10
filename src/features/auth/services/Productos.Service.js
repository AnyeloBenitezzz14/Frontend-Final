import api from '../api/axios';

// helper para headers
const authHeader = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`
  }
});

// LISTAR
export const listProductos = (params = {}, token) =>
  api.get('/producto', {
    params,
    ...authHeader(token)
  });

// CREAR
export const createProducto = (data, token) =>
  api.post('/producto', data, authHeader(token));

// ACTUALIZAR
export const updateProducto = (id, data, token) =>
  api.put(`/producto/${id}`, data, authHeader(token));

// ELIMINAR
export const deleteProducto = (id, token) =>
  api.delete(`/producto/${id}`, authHeader(token));