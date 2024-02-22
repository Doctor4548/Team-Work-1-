import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    type: 0,
    search: "",
    author: 0,
    total: 0,
};

export const post = createSlice({
    name: "posts",
    initialState,
    reducers:{
        setType(state,action){
            state.type=action.payload;
        },
        setSearch(state, action){
            state.search=action.payload;
        },
        selectAuthor(state, action){
            state.author=action.payload;
        },
        totalArticles(state, action){
            state.total=action.payload;
        },
    },
})


export const {setType, setSearch, selectAuthor, totalArticles} = post.actions;
export default post.reducer;