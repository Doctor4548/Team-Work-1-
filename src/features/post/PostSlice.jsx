import { createSlice } from "@reduxjs/toolkit";

const initialState = []

export const post = createSlice({
    name: "posts",
    initialState,
    reducers:{
        addPost(state, action){
            state.push(action.payload);
        },
        removePost(state,action){
            return state.filter((element)=>{
                return element.id!==action.payload.id
            })
        },
    },
})


export const {addPost, removePost} = post.actions;
export default post.reducer;