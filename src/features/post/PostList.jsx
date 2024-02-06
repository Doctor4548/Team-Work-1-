import React from "react";
import { Button, Drawer, Space, Select, Popconfirm, FloatButton } from 'antd';
import { Pagination } from 'antd';
import axios from "axios";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";



export default function PostList(){
    const [open, setOpen] = React.useState(false);
    const [size, setSize] = React.useState();
    const [current, setCurrent] = React.useState(1);

    const [drawer_title, setDrawer_title]=React.useState("");
    const [drawer_content, setDrawer_content]=React.useState("");

    const [pageDisplay, setPageDisplay]=React.useState([]);
    const [notAbleToChange, setNotAbleToChange]=React.useState(false);

    const [canNotPost, setCanNotPost]=React.useState(false);
    const [updateArticle, setUpdateArticle]=React.useState(false);
    const [articleId, setArticleId]=React.useState(0);

    const [types,setTypes]=React.useState([]);
    const [currentType, setCurrentType]=React.useState(1);


    const uid=useSelector((state)=>{return state.users.user_info.uid});
    const token=useSelector((state)=>{return state.users.loginin_user});
    const filter_type=useSelector((state)=>{return state.posts.type});
    const search_result=useSelector((state)=>{return state.posts.search});




    const navigate=useNavigate();

    async function getArticles(){
        if(filter_type===0&&search_result===""){
            axios({
                headers: {
                    "Content-Type": "application/json",
                },
                url: 'http://47.251.69.199/headline/getNewsPage',
                method: "POST",
                data: {
                    pageNum: current
                },
            }).then(data=> setPageDisplay(data.data.data.rows));
        }
        else if(search_result===""){
            axios({
                headers: {
                    "Content-Type": "application/json",
                },
                url: 'http://47.251.69.199/headline/getNewsPage',
                method: "POST",
                data: {
                    type: filter_type,
                    pageNum: current
                },
            }).then(data=> setPageDisplay(data.data.data.rows));
        }
        else if(filter_type===0){
            axios({
                headers: {
                    "Content-Type": "application/json",
                },
                url: 'http://47.251.69.199/headline/getNewsPage',
                method: "POST",
                data: {
                    keyWords: search_result,
                    pageNum: current
                },
            }).then(data=> setPageDisplay(data.data.data.rows));
        }
        else{
            axios({
                headers: {
                    "Content-Type": "application/json",
                },
                url: 'http://47.251.69.199/headline/getNewsPage',
                method: "POST",
                data: {
                    type: filter_type,
                    keyWords: search_result,
                    pageNum: current
                },
            }).then(data=> setPageDisplay(data.data.data.rows));   
        }

    }

    async function getTypes(){
        await axios({
            headers:{
                "Content-Type":"application/json"
            },
            method: "GET",
            url: "http://47.251.69.199/type/getAllTypes"
        }).then((res)=>{
            if(res.status===200){
                setTypes(res.data.data);
            }
        })
    }



    React.useEffect(()=>{
        getArticles();
        getTypes();

    },[current, filter_type, search_result]);


    const pageChange = (page) => {
      setCurrent(page);
    };

    const showLargeDrawer = () => {
        if(token === "" || token === undefined){
            setCanNotPost(true);
        }
        else{
            setNotAbleToChange(false);
            
            setUpdateArticle(false);
            setCanNotPost(false);
            setDrawer_content("");
            setDrawer_title("");
            setSize('large');
            setOpen(true);
        }

    };
    const onClose = () => {
        console.log("Closed")
      setOpen(false);
    };

    async function editArticle(id){
        setArticleId(id);
        setUpdateArticle(true);
        setNotAbleToChange(false);

        await axios({
            headers: {
                "Content-Type": "application/json"
            },
            url: `http://47.251.69.199/headline/showHeadlineDetail?hid=${id}`,
            method: "POST",
            data: {
            }
        }).then((data)=>{
            if(data.status===200){
                getArticles();
                setSize('large');
                setOpen(true);
                
                setDrawer_title(data.data.data.title);
                setDrawer_content(data.data.data.content);
            }
        })

    }


    async function checkArticle(id){

        setNotAbleToChange(true);

        await axios({
            headers: {
                "Content-Type": "application/json"
            },
            url: `http://47.251.69.199/headline/showHeadlineDetail?hid=${id}`,
            method: "POST",
            data: {
            }
        }).then((data)=>{
            if(data.status===200){
                getArticles();
                setSize('large');
                setOpen(true);
                setUpdateArticle(false);
                
                setDrawer_title(data.data.data.title);
                setDrawer_content(data.data.data.content);
            }
        })

    }



    function changeTitle(e){
        setDrawer_title(e.target.value);
    }

    function changeContent(e){
        setDrawer_content(e.target.value);
    }


    const cancel = (e) => {
    
    };



    let element;
    if(pageDisplay.length===0){
        element=(<div></div>);
    }
    else{
        element= pageDisplay.map((item)=>{
            return(
                <div className="article" key={item.hid}>
                    <h5 className="articleTitle">
                        {item.title.length>70? item.title.substring(0,70)+"..." : item.title}</h5>
                    <div className="articleInfo">
                        <div>{item.pageViews} view(s)</div>
                        <div>{item.createTime}</div>
                    </div>
                    <div className="articleButtons">
                        <button className="viewButton" onClick={()=>{checkArticle(item.hid)}}>view</button>
                        {item.publisher===uid &&   <Popconfirm
                                                        title="Delete the news"
                                                        description="Are you sure to delete this news?"
                                                        onConfirm={()=>{deleteArticle(item.hid)}}
                                                        onCancel={cancel}
                                                        okText="Yes"
                                                        cancelText="No"
                                                        className="deleteButton"
                                                        >
                                                        <Button danger>Delete</Button>
                                                    </Popconfirm>}
                        {item.publisher===uid && <button className="editButton" onClick={()=>{editArticle(item.hid)}}>edit</button>}
                    </div>
            </div>
    
            )
        })
    }

    

    async function postArticle(){
        
        if(drawer_title!==""&&drawer_content!==""){


            /*if(currentSearch!==""){
                const code=await axios({
                    headers:{
                        "Content-Type":"application/json"
                    },
                    method: "POST",
                    url: "http://47.251.69.199/type/postType",
                    data:{
                        tname: currentSearch,
                    }
                }).then((res)=>{
                    if(res.status===200){

                    }
                })
            }*/

            axios({
                headers: {
                    "Content-Type": "application/json",
                    "token": token
                },
                url: 'http://47.251.69.199/headline/publish',
                method: "POST",
                data: {
                    title:drawer_title,
                    content: drawer_content,
                    type: currentType // 文章类型的id
                }
            }).then((res)=>{
                if(res.status===200){
                    setOpen(false);
                    getArticles();             
                }
            })
        }
    }

    async function update(){
        if(drawer_title!==""&&drawer_content!==""){
            axios({
                headers: {
                    "Content-Type": "application/json",
                    "token": token
                },
                url: 'http://47.251.69.199/headline/update',
                method: "POST",
                data: {
                    hid: articleId,
                    title:drawer_title,
                    content: drawer_content,
                    type: currentType // 文章类型的id
                }
            }).then((res)=>{
                if(res.status===200){
                    setOpen(false);
                    getArticles();
                }
            })
        }
    }

    function deleteArticle(id){
        axios({
            headers: {
                "Content-Type": "application/json",
                "token" : token
            },
            url: `http://47.251.69.199/headline/delete?hid=${id}`,
            method: "POST",
            data: {
            }
        }).then((res)=>{
            if(res.status===200){
                navigate(".");
                getArticles();
            }
        })

    }



/////////////////////////////////////////
    const onTypeChange = (value) => {
        setCurrentType(value);
      };




    const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());




    const warnStyle={
        color: "red"
    }

    const postStyle={
        backgroundColor: "blue"
    }

    /*
        {[
        {
            value: 'jack',
            label: 'Jack',
        },
        {
            value: 'lucy',
            label: 'Lucy',
        },
        {
            value: 'tom',
            label: 'Tom',
        },
        ]}
    */

    return(
        <div className="mainPage">
            {canNotPost&&<h2 style={warnStyle}>You must Login To Post</h2>}
            <div className="articles">
                {element}

            </div>

            <div className="post">
                <div>
                    <Space>

                        <FloatButton onClick={showLargeDrawer} style={postStyle}/>
                    </Space>
                    <Drawer
                        title={`Post Article`}
                        placement="right"
                        size={size}
                        onClose={onClose}
                        open={open}
                        extra={
                        <Space>
                            <Button onClick={onClose}>Cancel</Button>
                            {updateArticle?                             
                            <Button type="primary" onClick={update}>
                            Update
                            </Button>
                            :                            
                            <Button type="primary" onClick={postArticle} disabled={notAbleToChange}>
                            Post
                            </Button>}

                        </Space>
                        }
                    >
                        <div className="drawerContent">
                            <div>
                                <div className="labelSize">
                                    <label htmlFor="input">Title:</label>
                                </div>
                                <input id="input" value={drawer_title} onChange={changeTitle} disabled={notAbleToChange}/>
                            </div>
                            <div className="drawer-textarea">
                                <div className="labelSize">
                                    <label htmlFor="textarea">Content:</label>
                                </div>
                                <textarea id="textarea" value={drawer_content} onChange={changeContent} disabled={notAbleToChange}/>
                            </div>
                            <div>
                                <div className="labelSize">
                                    <label htmlFor="select">Type:</label>
                                </div>
                                <Select
                                    id="select"
                                    className="select"
                                    showSearch
                                    placeholder="Select a type"
                                    optionFilterProp="children"
                                    onChange={onTypeChange}
                                    filterOption={filterOption}
                                    disabled={notAbleToChange}
                                    options={
                                        types.map((item)=>{
                                            return{
                                                value: item.tid,
                                                label: item.tname.toUpperCase(),
                                            }

                                        })
                                    }
                                    
                                    
                                />
                            </div>
                            
                        </div>  
                    </Drawer>
                </div>
            </div>

            <Pagination current={current} onChange={pageChange} total={50} />    
        </div>


    )

    

}