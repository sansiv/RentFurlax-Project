import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    products: []
}

export const productSlice= createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts(state, action) {
            state.products= [...action.payload]
        }
    }
})

export const fetchProducts= (categoryName) => async(dispatch) => {
    try{
        const response= await fetch(`http://127.0.0.1:8000/${categoryName}`,{
            method: 'GET'
        })
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const products = await response.json(); 
        console.log(products)
        dispatch(setProducts(products.data)); 


    } catch(error){
        console.log(error)
    }
}

export const {setProducts} = productSlice.actions
export const ProductReducer= productSlice.reducer