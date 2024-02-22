import React from "react";

import { useParams } from "react-router";
import { selectAuthor } from "./PostSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export default function ArticlePage(){

    const {id} = useParams();

    const [title, setTitle]=React.useState("");
    const [content, setContent]=React.useState("");
    const [type, setType]=React.useState("");
    const [author, setAuthor]=React.useState("");

    const [publisher, setPublisher]=React.useState(0);
    const dispatch = useDispatch();
    const navigate=useNavigate();

    const [gotoTop, setGotoTop]=React.useState(false);

    async function getArticle(hid){
        await axios({
            headers: {
                "Content-Type": "application/json"
            },
            url: `http://47.251.69.199/headline/showHeadlineDetail?hid=${hid}`,
            method: "POST",
            data: {
            }
        }).then((data)=>{
            if(data.status===200){
                setPublisher(data.data.data.publisher);
                setType(data.data.data.typeName);
                setAuthor(data.data.data.author)
                setTitle(data.data.data.title);
                setContent(data.data.data.content);
            }
        })
    }

    React.useEffect(()=>{
        getArticle(id);

    }, [id])


    window.addEventListener("scroll",()=>{
        if(window.pageYOffset>700){
            setGotoTop(true);
        }
        else{
            setGotoTop(false);
        }
        
    })

    function goTop(){
        window.scrollTo({top: 0, behavior: "smooth"})
    }


    let secondContent=content.split("\n");
    const realContent=secondContent.map((item, index)=>{
        return (
            <div key={index}>
                {item}
                <br/>
            </div>
        )
    });

    function searchAuthor(){
        dispatch(selectAuthor(publisher));
        navigate("../../")
    }


    return(
        <div className="newsPage">

            <h1 className="newsTitle">{title}</h1>

            <div className="newsType">Type: {type}</div>


            {/*<video control autoPlay width="720px" height="500px">
                <source src={toothless} type="video/mp4"></source>
            </video>*/}
    

            <div className="newsContent">{realContent}</div>

            {/*<video control autoPlay width="720px" height="500px">
                <source src={amazing} type="video/mp4"></source>
            </video>*/}




            <div className="newsAuthor" onClick={searchAuthor}>Author: {author}</div>
            {gotoTop && <div className="gotoTop" onClick={goTop}>🔝</div>}

        </div>
    )
}