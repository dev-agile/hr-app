import apiClient from "api/apiClient";

const getProducts = () => apiClient.get('/products');
const getProductById = (productId) => apiClient.get(`/products/${productId}`);

export default {
  getProducts,
  getProductById,
};