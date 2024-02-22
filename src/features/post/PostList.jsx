import React from "react";
import { Button, Drawer, Space, Select, Popconfirm, FloatButton, Alert } from 'antd';
import { Pagination } from 'antd';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { totalArticles } from "./PostSlice";
import { useNavigate } from "react-router-dom";


export default function PostList(){
    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);
    const [size, setSize] = React.useState();
    const [current, setCurrent] = React.useState(1);

    const [drawer_title, setDrawer_title]=React.useState("");
    const [drawer_content, setDrawer_content]=React.useState("");

    const [pageDisplay, setPageDisplay]=React.useState([]);
    const [notAbleToChange, setNotAbleToChange]=React.useState(false);

    const [updateArticle, setUpdateArticle]=React.useState(false);
    const [articleId, setArticleId]=React.useState(0);

    const [types,setTypes]=React.useState([]);
    const [currentType, setCurrentType]=React.useState(0);
    const [typeName, setTypeName]=React.useState("");


    const uid=useSelector((state)=>{return state.users.user_info.uid});
    const token=useSelector((state)=>{return state.users.loginin_user});
    const filter_type=useSelector((state)=>{return state.posts.type});
    const search_result=useSelector((state)=>{return state.posts.search});

    const selected = useSelector((state)=>{return state.posts.author});//
    const total=useSelector((state)=>{return state.posts.total});//


    const [editWarning, setEditWarning]=React.useState(false);
    const [deleteWarning, setDeleteWarning]=React.useState(false);
    const [formIncompleteWarning, setFormIncompleteWarning]=React.useState(false);
    const [postWarning, setPostWarning]=React.useState(false);

    const [numberOfPages, setNumberOfPage]=React.useState(1);
    const [limitReachWarning, setLimitReachWarning]=React.useState(false);
    const [winterTime, setWinterTime]=React.useState(false);

    const navigate=useNavigate();

    async function getArticles(){
        if(selected!==0){
                        
            if(filter_type===0&&search_result===""){
                axios({
                    headers: {
                        "Content-Type": "application/json",
                    },
                    url: 'http://47.251.69.199/headline/getNewsPage',
                    method: "POST",
                    data: {
                        pageNum: 1,
                        pageSize: total,
                    },
                }).then(data=> {
                    setPageDisplay(data.data.data.rows);
                    setNumberOfPage(data.data.data.total);
                    dispatch(totalArticles(data.data.data.total));
                });
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
                        pageNum: 1,
                        pageSize: total,
                    },
                }).then(data=> {
                    setPageDisplay(data.data.data.rows);
                    setNumberOfPage(data.data.data.total);
                });
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
                        pageNum: 1,
                        pageSize: total,
                    },
                }).then(data=> {
                    setPageDisplay(data.data.data.rows);
                    setNumberOfPage(data.data.data.total);
                });
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
                        pageNum: 1,
                        pageSize: total,
                    },
                }).then(data=> {
                    setPageDisplay(data.data.data.rows);
                    setNumberOfPage(data.data.data.total);});   
            }

        
            /*axios({
                headers: {
                    "Content-Type": "application/json",
                },
                url: 'http://47.251.69.199/headline/getNewsPage',
                method: "POST",
                data: {
                    pageNum: 1,
                    pageSize: total,
                },
            }).then(data=> {

                setPageDisplay(data.data.data.rows);
                setNumberOfPage(data.data.data.total);
            
            });*/
        }
        else{
            
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
                }).then(data=> {
                    console.log(data);
                    setPageDisplay(data.data.data.rows);
                    setNumberOfPage(data.data.data.total);
                    dispatch(totalArticles(data.data.data.total));
                });
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
                }).then(data=> {
                    setPageDisplay(data.data.data.rows);
                    setNumberOfPage(data.data.data.total);
                });
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
                }).then(data=> {
                    setPageDisplay(data.data.data.rows);
                    setNumberOfPage(data.data.data.total);
                });
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
                }).then(data=> {
                    setPageDisplay(data.data.data.rows);
                    setNumberOfPage(data.data.data.total);});   
            }

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
    

    },[current, filter_type, search_result, selected, total]);


    const pageChange = (page) => {
      setCurrent(page);
    };

    const showLargeDrawer = () => {
        
                
        setTypeName("");
        setCurrentType(0);

        if(token === "" || token === undefined){
            navigate('login');
        }
        else{
            setNotAbleToChange(false);
            
            setUpdateArticle(false);

            setDrawer_content("");
            setDrawer_title("");
            setSize('large');
            setOpen(true);
        }

    };
    const onClose = () => {
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
                
                setTypeName(data.data.data.typeName.toUpperCase());
                setCurrentType(data.data.data.type);

                setDrawer_title(data.data.data.title);
                setDrawer_content(data.data.data.content);
            }
        })

    }


    function checkArticle(id){
        navigate(`page/${id}`);
    }



    function changeTitle(e){
        if(drawer_title.length<100){
            setDrawer_title(e.target.value);
            setLimitReachWarning(false);
        }
        else{
            setLimitReachWarning(true);
            setTimeout(()=>{
                setLimitReachWarning(false);
            }, 3000);
            if(e.target.value.length<drawer_title.length){
                setDrawer_title(e.target.value);
            }
        }

    }

    function changeContent(e){      
        if(drawer_content.length<5000){
            setDrawer_content(e.target.value);
            setLimitReachWarning(false);
        }
        else{
            setLimitReachWarning(true);
            setTimeout(()=>{
                setLimitReachWarning(false);
            }, 3000);
            if(e.target.value.length<drawer_content.length){
                setDrawer_content(e.target.value);
            }
        }
    }
    console.log(selected)


    const cancel = (e) => {
    
    };



    const now = new Date();
    React.useEffect(()=>{
        function isDaylightSavingTime(date) {
            const month = date.getMonth(); // 获取月份（0-11，0 表示一月）
            const day = date.getDate(); // 获取日期（1-31）
            
            // 判断是否在3月到10月之间
            if (month >= 2 && month <= 9) {
              return true; // 处于夏令时
            } else if (month === 10) {
              // 如果是11月，检查是否在第一个星期日之前
              const firstSunday = new Date(date.getFullYear(), month, 1);
              const dayOfWeek = firstSunday.getDay(); // 获取星期几（0-6，0 表示星期日）
              return day < 8 && dayOfWeek === 0; // 在第一个星期日之前且是11月，处于夏令时
            } else {
              return false; // 其他情况都处于冬令时
            }
          }
    
          const now = new Date();
          const isDaylightSaving = isDaylightSavingTime(now);
          
          if (isDaylightSaving) {
            setWinterTime(false);
          } else {
            setWinterTime(true);
          }

    },[now.getHours()])



      

    let element;
    if(pageDisplay.length===0){
        element=(<h1>Your Search Result in Nothing</h1>);
    }
    else{
        if(selected===0){
            element= pageDisplay.map((item)=>{
                let displayTime;
                let usTime;
                if(winterTime){
                    usTime=parseInt(item.createTime.substring(11,13))+1<12
                }
                else{
                    usTime=parseInt(item.createTime.substring(11,13))<12
                    
                }
    
    
    
                if(usTime){
                    if(parseInt(item.createTime.substring(8,10))===1){
    
                        if(parseInt(item.createTime.substring(5,7)===1)){
                            const year=parseInt(item.createTime.substring(0,4))-1;
                            displayTime=year.toString()+"-12-31";
                        }
                        else{
                            const month=parseInt(item.createTime.substring(5,7))-1;
                            const maxDayOfLastMonth = new Date(parseInt(item.createTime.substring(0,4)), month, 0).getDate().toString();
                            displayTime=item.createTime.substring(0,5)+month.toString().padStart(2,"0")+"-"+maxDayOfLastMonth;
                        }
    
                    }
                    else{
                        let day=parseInt(item.createTime.substring(8,10))-1;
                        displayTime=item.createTime.substring(0,8)+day.toString().padStart(2,"0")+item.createTime.substring(10);
                    }
                }
                else{
                    displayTime=item.createTime.substring(0,10);
                }
    
       
                return(
                    <div className="article" key={item.hid}>
                        <h5 className="articleTitle">
                            {item.title.length>70? item.title.substring(0,70)+"..." : item.title}</h5>
                        <div className="articleInfo">
                            <div>{item.pageViews} view(s)</div>
                            <div>{types[item.type-1]!==undefined? types[item.type-1].tname.toUpperCase(): null}</div>
                            <div>{displayTime.substring(0,10)}</div>
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
        else{
            element= pageDisplay.map((item)=>{
                if(item.publisher===selected){

                    let displayTime;
                    let usTime;
                    if(winterTime){
                        usTime=parseInt(item.createTime.substring(11,13))+1<12
                    }
                    else{
                        usTime=parseInt(item.createTime.substring(11,13))<12
                        
                    }
        
                    if(usTime){
                        if(parseInt(item.createTime.substring(8,10))===1){
        
                            if(parseInt(item.createTime.substring(5,7)===1)){
                                const year=parseInt(item.createTime.substring(0,4))-1;
                                displayTime=year.toString()+"-12-31";
                            }
                            else{
                                const month=parseInt(item.createTime.substring(5,7))-1;
                                const maxDayOfLastMonth = new Date(parseInt(item.createTime.substring(0,4)), month, 0).getDate().toString();
                                displayTime=item.createTime.substring(0,5)+month.toString().padStart(2,"0")+"-"+maxDayOfLastMonth;
                            }
        
                        }
                        else{
                            let day=parseInt(item.createTime.substring(8,10))-1;
                            displayTime=item.createTime.substring(0,8)+day.toString().padStart(2,"0")+item.createTime.substring(10);
                        }
                    }
                    else{
                        displayTime=item.createTime.substring(0,10);
                    }
        
           
                    return(
                        <div className="article" key={item.hid}>
                            <h5 className="articleTitle">
                                {item.title.length>70? item.title.substring(0,70)+"..." : item.title}</h5>
                            <div className="articleInfo">
                                <div>{item.pageViews} view(s)</div>
                                <div>{types[item.type-1]!==undefined? types[item.type-1].tname.toUpperCase(): null}</div>
                                <div>{displayTime.substring(0,10)}</div>
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
                    
                }

            })
        }


    }

    

    async function postArticle(){
        
            
        
        if((drawer_title).trim()!==""&&(drawer_content).trim()!==""&&currentType>0&&drawer_title.length<=100&&drawer_content.length<=5000){

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
                    
                    setTypeName("");
                    setCurrentType(0);

                    setPostWarning(true);
                    setTimeout(()=>{
                        setPostWarning(false)
                    },3000)
                
                }
            })
        }
        else if(drawer_title.length>100&&drawer_content.length>5000){
            setLimitReachWarning(true);
            setTimeout(()=>{
                setLimitReachWarning(false);
            }, 3000);

        }
        else{
            setFormIncompleteWarning(true);
            setTimeout(()=>{
                setFormIncompleteWarning(false);
            },3000);
        
        }
    }

    async function update(){
        if((drawer_title).trim()!==""&&(drawer_content).trim()!==""&&currentType>0&&drawer_title.length<=100&&drawer_content.length<=5000){
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

                    setTypeName("");
                    setCurrentType(0);

                    setEditWarning(true);
                    setTimeout(()=>{
                        setEditWarning(false);
                    }, 3000);

                }
            });
        }
        else if(drawer_title.length>100&&drawer_content.length>5000){
            setLimitReachWarning(true);
            setTimeout(()=>{
                setLimitReachWarning(false);
            }, 3000);
        }
        else{
            setFormIncompleteWarning(true);
            setTimeout(()=>{
                setFormIncompleteWarning(false);
            },3000);
        
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

                setTypeName("");
                setCurrentType(0);

                setDeleteWarning(true);

                setTimeout(()=>{
                    setDeleteWarning(false);
                },3000)
            }
        })

    }



/////////////////////////////////////////
    const onTypeChange = (value) => {
        setCurrentType(value);
        setTypeName("");
      };




    const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());




    const warnStyle={
        color: "red"
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
            {editWarning && <Alert message="Sucessfully Updated" type="success" />}
            {deleteWarning && <Alert message="Sucessfully Deleted" type="warning" />}
            {postWarning && <Alert message="Sucessfully Posted" type="success" />}


            <div className="articles">
                {element}

            </div>

            <div className="post">
                <div>
                    <Space>

                        <FloatButton tooltip={<div>Post Article</div>} onClick={showLargeDrawer} className="postStyle" />

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
                            {formIncompleteWarning &&<Alert message="You must filled in all of them" type="warning" className="drawerWarning"/>}
                            {limitReachWarning &&<Alert message="Warning: Title limit in 100 characters, Content limit in 5000 characters" type="warning" className="drawerWarning2"/>}
                            <div className="drawer-textarea">
                                <div className="labelSize">
                                    <label htmlFor="input">Title:</label>
                                </div>
                                <input id="input" value={drawer_title} onChange={changeTitle} disabled={notAbleToChange}/>
                                <span className="displayLength_title">{drawer_title.length}/100</span>
                            </div>
                            <div className="drawer-textarea">
                                <div className="labelSize">
                                    <label htmlFor="textarea">Content:</label>
                                </div>
                                <textarea id="textarea" value={drawer_content} onChange={changeContent} disabled={notAbleToChange} />
                                <span className="displayLength">{drawer_content.length}/5000</span>
                            </div>
                            <div>
                                <div className="labelSize">
                                    <label htmlFor="select">Type:</label>
                                </div>
                                <Select
                                    id="select"
                                    className="select"
                                    showSearch
                                    placeholder={typeName===""? "--Select--": typeName}
                                    optionFilterProp="children"
                                    onChange={onTypeChange}

                                    value={currentType===0? "--Select--" :currentType}
                                    
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

            {selected===0 && pageDisplay.length!==0 && <Pagination current={current} onChange={pageChange} total={numberOfPages} />} 
        </div>


    )

    

}