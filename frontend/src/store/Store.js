import { configureStore } from "@reduxjs/toolkit";
import { AuthReducers } from "../slices/AuthSlice";
import { CategoryReducer } from "../slices/CategorySlice";
import { ProductReducer } from "../slices/ProductSlice";
import { RegisterReducer } from "../slices/RegisterSlice";
import { CartReducer } from "../slices/CartSlice";
import { InvoiceReducer } from "../slices/InvoiceSlice";

export const store= configureStore({
    reducer: {
        auth : AuthReducers,
        register: RegisterReducer,
        categories: CategoryReducer,
        products: ProductReducer,
        cart: CartReducer,
        invoices: InvoiceReducer
    }
})