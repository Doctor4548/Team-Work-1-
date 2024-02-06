import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    type: 0,
    search: ""
};

export const post = createSlice({
    name: "posts",
    initialState,
    reducers:{
        setType(state,action){
            state.type=action.payload;
        },
        setSearch(state, action){
            state.search=action.payload
        }
    },
})


export const {setType, setSearch} = post.actions;
export default post.reducer;