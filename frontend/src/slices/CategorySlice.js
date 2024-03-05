import { createSlice } from "@reduxjs/toolkit";

const initialState={
    categories: []
}

export const categoriesSlice= createSlice({
    name: 'categories',
    initialState,
    reducers:{
        updateCategories(state, action) {
            state.categories=[...action.payload]
        }
    }
})

// Creating an async thunk to fetch the categories
export const fetchCategories= () => async(dispatch) => {
    try{
        const response= await fetch('http://127.0.0.1:8000/categories',{
            method: 'GET'
        })
        const categories= await response.json()
        if (response.ok){
            dispatch(updateCategories(categories.data))
        }
    }catch (error){
        console.log(error)
    }
}

export const {updateCategories} = categoriesSlice.actions
export const CategoryReducer= categoriesSlice.reducer