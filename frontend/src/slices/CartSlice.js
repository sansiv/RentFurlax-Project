import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    items: []
}

export const cartSlice= createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addToCart(state, action){
            //state.items.push(action.payload)
            const existingItemIndex = state.items.findIndex(
                (item) => item.id === action.payload.id
              );
              if (existingItemIndex !== -1) {
                // If the item already exists, update the quantity
                state.items[existingItemIndex].selectedQuantity = Number(state.items[existingItemIndex].selectedQuantity) + Number(action.payload.selectedQuantity) ;
                //state.items[existingItemIndex].totalPrice += action.payload.totalPrice;
              } else {
                // Otherwise add the particular item to the cart
                state.items.push(action.payload);
              }
        },
        removeFromCart(state, action){
            state.items= state.items.filter( (item) => item.id !== action.payload)
        },
        resetCart(state){
            state.items= []
        },
        updateCartItemQuantity(state, action){
            const { id, newQuantity } = action.payload;
            const itemToUpdate = state.items.find((item) => item.id === id);
            if (itemToUpdate) {
                itemToUpdate.selectedQuantity = newQuantity;
            }
        }
    }
})

export const {addToCart, removeFromCart, resetCart, updateCartItemQuantity}= cartSlice.actions

export const CartReducer= cartSlice.reducer