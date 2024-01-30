import { createSlice } from "@reduxjs/toolkit";


//const initialState=[];

const initialState={
    register_users: [],
    loginin_user:{},
}

export const users=createSlice({
    name: "user",
    initialState,
    reducers: {
        newUser(state, action){
            state.register_users.push(action.payload);
        },
        login(state, action){
            state.loginin_user=action.payload;
        }

    },
})

export const{newUser, login}=users.actions;

export default users.reducer;