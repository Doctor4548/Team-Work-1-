import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import React from "react";
import { addPost, removePost } from "./PostSlice";

import { useNavigate } from "react-router-dom";



export default function PostList(){
    const posts = useSelector((state)=>{ return state.posts});

    const login_status=useSelector((state)=>{return state.users.loginin_user});
    const navigate=useNavigate();

    const dispatch= useDispatch();

    const [content, setContent]=React.useState("");
    const [title, setTitle]=React.useState("");

    React.useEffect(()=>{

        if(Object.keys(login_status).length===0){
            navigate("login");
        }

    },[])

    let ableToPost= Boolean(content)&&Boolean(title);



    function addContent(e){
        setContent(e.target.value);
    }
    function addTitle(e){
        setTitle(e.target.value);
    }

    function post(){
        dispatch(addPost({
            id: nanoid(),
            author :login_status.user,
            content: content,
            title: title,
        }))
    setTitle("");
    setContent("");
    }


    function remove(id){
        posts.forEach((post)=>{
            if(post.id===id){
                dispatch(removePost(post))

            }
        })
    }

    const element = posts.map((item)=>{
        return(
            <article key={item.id} className="article">
                <div className="articleHeader">
                    <div>{item.title}</div>
                    <button onClick={()=>{remove(item.id)}}>remove</button>
                </div>
                <div className="content">{item.content.substring(0,75)}</div>
                <div className="author">author: {item.author}</div>
            </article>
        )
    })

    return(
        <div className="page">
            <div className="main-content">

                <input type="text" value={title} onChange={addTitle} placeholder="Title" className="post_title"/>
                <textarea type="text" value={content} onChange={addContent} placeholder="Content you want post" className="post_content"/>

                <button onClick={post} disabled={!ableToPost}>Post</button>
                <div className="articles">
                    {element}
                </div>
                
            </div>
        </div>

    )

    

}