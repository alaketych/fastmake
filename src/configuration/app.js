import axios from 'axios';

const URL = 'https://localhost:5001/';

export function getProduct(id) {
    return axios.get(URL + `products/${id}`);
};

export function getPageChange(page) {
    return axios.get(URL + `products?pageNumber=${page}`);
};

export function getProducts() {
    return axios.get(URL + 'products');
};

export function getPageProducts(query) {
    return axios.get(URL + `products?${query}`);
};

export function getCategoryProducts(query) {
    return axios.get(URL + `products/category/${query}`)
}

export function getCategory(id) {
    return axios.get(URL + `categories/${id}`);
};

export function getCategories() {
    return axios.get(URL + 'categories');
};

export function getUsers() {
    return axios.get(URL + 'users');
};

export function getUser(id) {
    return axios.get(URL + `users/${id}`);
};

export function login() {
    return axios.get(URL + `auth/login`);
};

export function register() {
    return axios.get(URL + `auth/register`);
}