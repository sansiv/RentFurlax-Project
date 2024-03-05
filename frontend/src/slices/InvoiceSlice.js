import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    invoices: []
}

export const InvoiceSlice= createSlice({
    name: "invoice",
    initialState,
    reducers: {
        addInvoices(state, action){
            state.invoices= [...action.payload]
        }
    }
})

// Create a thunk for extracting all existing invoices

export const fetchInvoices= () => async(dispatch) => {
    try{
        const response= await fetch('http://127.0.0.1:8000/invoices',{
            method: 'GET',
        })
        if (!response.ok){
            throw new Error('Failed to fetch invoices')
        }
    
        const invoices= await response.json();
        console.log(invoices)
        dispatch(addInvoices(invoices.data))

    } catch(error){
        console.log(error)
    }
    
}

export const {addInvoices}= InvoiceSlice.actions
export const InvoiceReducer= InvoiceSlice.reducer