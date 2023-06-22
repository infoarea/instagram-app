import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchAllPost = createAsyncThunk("post/fetchAllPost", async ()=>{

    const response = await axios.get("http://localhost:3000/api/posts");

    //Validation
    

    //Send data
    return response.data.posts

});

//Create post 
export const createPost = createAsyncThunk("post/createPost", async ({content, photo})=>{

    const post = await axios.post("http://localhost:3000/api/posts", {content, photo});

    return {content, photo};

});


//Delete post 
export const deletePost = createAsyncThunk("post/deletePost", async (postId)=>{

         await axios.delete(`http://localhost:3000/api/posts?id=${postId}`);

         
    return postId;

});