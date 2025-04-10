import axios from "axios";

const Api = axios.create({
  baseURL: "https://dummyjson.com",
});

export const productsApi = () => {
  return Api.get("/products");
};

export const productsDetailApi = (id) => {
  return Api.get(`/products/${id}`);
};

export const cartDetailApi = (id) => {
  return Api.get(`/cart/${id}`);
};