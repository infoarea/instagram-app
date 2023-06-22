import { createSlice } from "@reduxjs/toolkit";
import { createPost, deletePost, fetchAllPost } from "./postApi";



export const postSlice = createSlice({
        name: "post",
        initialState: {
            posts: []
        },
        reducers:{},
        extraReducers: (builder)=>{
            builder.addCase(fetchAllPost.fulfilled, (state, {type, payload})=>{
                state.posts = payload
            }).addCase(createPost.fulfilled, (state, {type, payload})=>{
                state.posts.push(payload)
            }).addCase(deletePost.fulfilled, (state, {type, payload})=>{
                state.posts = state.posts.filter(data=> data._id !== payload)
            })
        }
});

//Export Selector
export const allPost = state=> state.post
export const {} = postSlice.actions;
//Export Reducer
export default postSlice.reducer;