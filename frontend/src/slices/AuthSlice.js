import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user: false,
    username: ''  
}

export const authSlice= createSlice({
    name: 'auth',
    initialState,
    reducers:{
        loginSuccess(state, action){
            state.user= true
            state.username= action.payload
        },
        logoutUser(state){
            state.user= false
        }
        
    }
})


// Creating a thunk for user-login-auth
export const loginUser= (userdata) => async (dispatch) =>{
    try{
        const response= await fetch('http://127.0.0.1:8000/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(userdata)
        })
        if(response.ok){
            console.log('success')
            dispatch(loginSuccess(userdata.username))
        }
    } catch(error){
        console.log(error)
    }
}




// Exporting actions and reducers
export const {loginSuccess, logoutUser} = authSlice.actions
export const AuthReducers = authSlice.reducer