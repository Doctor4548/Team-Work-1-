import React from "react";
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';
import { Outlet } from "react-router-dom";
import { Select } from 'antd';
import { Input } from 'antd';
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setType, setSearch, selectAuthor } from "../features/post/PostSlice";
import axios from "axios";

import { logout, saveUserName } from "../features/users/UserSlice";

import { SearchOutlined } from '@ant-design/icons';
import { Button} from 'antd';

export default function Header(){
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [userLogin,setUserLogin]=React.useState(false);
    const [types, setTypes]=React.useState([]);

    const [input, setInput]=React.useState("");
    const [selectType, setSelectType]=React.useState(0);

    const [displayItem,setDisplayItem]=React.useState(true);

    const [sayHello, setSayHello]=React.useState("");
    const location=useLocation();

    const uid=useSelector((state)=>{return state.users.user_info.uid});


    React.useEffect(()=>{
        const path=location.pathname.split("/");
        const pathName=path[path.length-1];
        const page=path[path.length-2];
        if(pathName==="register"||pathName==="login"||page==="page"){
            setDisplayItem(false);
        }
        else{
            setDisplayItem(true);
        }
    },[location]);

    function login(){
        navigate("../login");
    }

    function register(){
        navigate("../register");
    }

    function searchAuthor(username){
        
        dispatch(selectAuthor(username))
    }

    

    const user_token=useSelector((state)=>{return state.users.loginin_user});
    const username=useSelector((state)=>{return state.users.user_info.username});
    
    

    React.useEffect(() => {
        const fetchData = async () => {
            if(user_token === "" || user_token === undefined){
                setUserLogin(false);
            }
            else{
                await axios({
                    headers: {
                        "Content-Type": "application/json",
                        "token": user_token
                    },
                    url: 'http://47.251.69.199/user/getUserInfo',
                    method: "GET",
                    data: {}
                }).then((res)=>{
                    if(res.status===200){
                        dispatch(saveUserName(res.data.data));
                        setUserLogin(true);
                    }
                }).catch((err)=>{
                    dispatch(logout());
                });

            }
        };
    
        fetchData();
    }, [user_token, dispatch]);



    React.useEffect(()=>{
        async function getTypes(){
            await axios({
                headers:{
                    "Content-Type":"application/json"
                },
                method: "GET",
                url: "http://47.251.69.199/type/getAllTypes"
            }).then((res)=>{
                if(res.status===200){
                    let result =res.data.data;
                    result.splice(0,0,{
                        tid: 0,
                        tname: "--Select--"
                    });
                    
                    setTypes(result);
                }
            });

        }
        getTypes();

    },[])



    function log_out(){
        dispatch(logout());

    }

    function onChange2(value){
        setSelectType(value);
        if(value===0){
            dispatch(setType(value));
        }
    }

    const onChange = (value) => {
        setSelectType(value);
        if(value===0){
            dispatch(setType(value));
        }
        dispatch(selectAuthor(0));
      };

    function selectChange(value){
        setSelectType(value);
        dispatch(setType(value));
        dispatch(setSearch(""));
    }

    function inputChange(e){
        setInput(e.target.value);
        if(e.target.value===""){
            dispatch(setSearch(e.target.value));
        }
    }

    function doSearch(){
        dispatch(setSearch(input));
        dispatch(setType(selectType));

    }

    const onSearch = (value) => {
        console.log('search:', value);
    };

    const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const date=new Date();
    React.useEffect(()=>{
        if(date.getHours()>6&&date.getHours()<12){
            setSayHello("Good Morning");
        }
        else if(date.getHours()>=12&&date.getHours()<20){
            setSayHello("Good Afternoon");
        }
        else{
            setSayHello("Good Night");
        }
    }, [date.getHours()])

    

    return(
        <div>
            <div className="header">
                <div className={displayItem ? "leftHeader": "homeOnly-container"}>
                    <Link to="." className={displayItem? selectType===0? "popular": "hover" : "homeOnly"} onClick={()=>{onChange(0)}}>Home</Link>

                    {displayItem &&<span onClick={()=>{selectChange(1)}} className={selectType===1? "hover_clicked":"hover"}>News</span>}
                    {displayItem &&<span onClick={()=>{selectChange(3)}} className={selectType===3? "hover_clicked":"hover"}>Sport</span>}
                    {displayItem &&<span onClick={()=>{selectChange(4)}} className={selectType===4? "hover_clicked":"hover"}>Entertain</span>}
                    {displayItem &&<span onClick={()=>{selectChange(5)}} className={selectType===5? "hover_clicked":"hover"}>Science</span>}
                    {displayItem &&<span onClick={()=>{selectChange(2)}} className={selectType===2? "hover_clicked":"hover"}>Others</span>}
                </div>

                {displayItem &&<div className="middleHeader">
                    <Input placeholder="News" className="input_search" onChange={inputChange}/>
                    <Button shape="circle" onClick={doSearch} icon={<SearchOutlined />} />
                </div>}


                <div className="rightHeader">


                    {displayItem &&<Select
                            className="filter"
                            showSearch
                            placeholder="Filter By Type"
                            optionFilterProp="children"
                            onChange={onChange2}
                            onSearch={onSearch}
                            filterOption={filterOption}
                            value={selectType}
                            options={
                                
                                types.map((item)=>{
                                    return{
                                        value: item.tid,
                                        label: item.tname.toUpperCase(),
                                    }

                                })
                            }
                        />}

                    {
                        userLogin?
                        <div className="headerButtons">
                            {displayItem && <Avatar onClick={()=>{searchAuthor(uid)}} icon={<UserOutlined />} className="headImg"/>}
                            {displayItem && <button className="logIn" onClick={log_out}>Log out</button>}
                            {displayItem && <button className="register" onClick={register}>Register</button>}

                        </div>

                        :   <div className="headerButtons">
                                 {displayItem && <button className="logIn" onClick={login}>Log in</button>}
                                 {displayItem && <button className="register" onClick={register}>Register</button>}
                            </div>
                    }

                    

                </div>
            </div>

            <Outlet />
            <h1 className="leftSide">{date.getFullYear()+"/"+(date.getMonth()+1).toString().padStart(2,"0")+"/"+(date.getDate()).toString().padStart(2,"0")+" "+(date.getHours()).toString().padStart(2,"0")+":"+(date.getMinutes()).toString().padStart(2,"0")}</h1>
            <h1 className="rightSide">{sayHello+" "+(username===undefined? "": username.substring(0,6))}</h1>
        </div>

    )
}