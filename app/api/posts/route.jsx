import mongoDBConnect from "@/config/db";
import Post from "@/models/Posts"
import { NextResponse } from "next/server";


export const GET = async () => {
    try {

      await mongoDBConnect();

      const posts = await Post.find();

      return NextResponse.json({posts});

    } catch (error) {
      
      return NextResponse.json({error: error.message})
    }
}

export const POST = async (request) => {
    try {
      await mongoDBConnect();
  
      const data = await request.json();
  
      const post = await Post.create(data);
      
      return NextResponse.json({post});
  
    } catch (error) {
      
      return NextResponse.json({error: error.message})
    }
  }

  export const DELETE = async (request) => {
    try {
      await mongoDBConnect();
  
      const {searchParams} = new URL(request.url);

      const pId = searchParams.get("id")
  
      const deletedPost = await Post.findByIdAndDelete(pId);
      
      return NextResponse.json({deletedPost});
  
    } catch (error) {
      
      return NextResponse.json({error: error.message})
    }
  }