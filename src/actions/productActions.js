import dummyData from '../product.json';
import { FETCH_PRODUCTS, FILTER_PRODUCTS_BY_COLOR, ORDER_PRODUCTS_BY_PRICE } from '../types';

export const fetchProducts = () => (dispatch) => {
    localStorage.setItem('productList', JSON.stringify(dummyData.list));
    const res = JSON.parse(localStorage.getItem('productList'));

    dispatch({
        type: FETCH_PRODUCTS,
        payload: res
    });
};

export const filterByColorProducts = (products, color) => (dispatch) => {
    dispatch({
        type: FILTER_PRODUCTS_BY_COLOR,
        payload: {
            color: color,
            items: color === "" ? products : products.filter(item => item.color === color)
        }
    });
};

export const filterByBrandProducts = (products, brand) => (dispatch) => {
    dispatch({
        type: FILTER_PRODUCTS_BY_COLOR,
        payload: {
            color: brand,
            items: brand === "" ? products : products.filter(item => item.brand === brand)
        }
    });
};

export const sortProducts = (filteredProducts, sort) => (dispatch) => {
    const sortedProducts = filteredProducts.slice();

    if (sort === "latest") {
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sort === "latestOpposite") {
        sortedProducts.sort((a, b) => b.title.localeCompare(a.title))
    } else {
        sortedProducts.sort((a, b) => (
            sort === "lowest" ?
            parseFloat(a.price.replace(',', '.')) > parseFloat(b.price.replace(',', '.')) ?
            1 :
            -1 :
            parseFloat(a.price.replace(',', '.')) > parseFloat(b.price.replace(',', '.')) ?
            -1 :
            1
        ))
    }

    dispatch({
        type: ORDER_PRODUCTS_BY_PRICE,
        payload: {
            sort: sort,
            items: sortedProducts
        }
    });
};