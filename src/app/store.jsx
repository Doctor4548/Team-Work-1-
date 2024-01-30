import { configureStore } from "@reduxjs/toolkit";
import PostReduce from "../features/post/PostSlice";

import UserReduce from "../features/users/UserSlice"


export const Store=configureStore({
    reducer: {
        posts: PostReduce,
        users: UserReduce,
    }

})
