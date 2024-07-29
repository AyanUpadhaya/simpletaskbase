import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    auth:{}
}

const authSlice = createSlice({
    name:'authentication',
    initialState,
    reducers:{
        saveAuthData:(state,action)=>{
            state.auth = {...state.auth,...action?.payload};
            localStorage.setItem('koursely-auth',JSON.stringify(state.auth));
        },
        logOutUser:(state)=>{
            state.auth = {};
            localStorage.removeItem("koursely-auth");
        }
    }
})


export const { saveAuthData, logOutUser } = authSlice.actions;
export default authSlice.reducer