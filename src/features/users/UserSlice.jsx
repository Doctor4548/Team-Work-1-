import { createSlice } from "@reduxjs/toolkit";



const initialState={
    loginin_user: localStorage.getItem("token")||"",
    user_info: {}
}

export const users=createSlice({
    name: "user",
    initialState,
    reducers: {
        login(state, action){
            state.loginin_user=action.payload.data;
            localStorage.setItem("token",action.payload.data);

        },
        saveUserName(state,action){
            state.user_info=action.payload;

        },
        logout(state, action){
            state.loginin_user="";
            state.user_info={};
            localStorage.removeItem("token");

        }
//
    },
});


export const{newUser, login, logout, saveUserName}=users.actions;

export default users.reducer;









