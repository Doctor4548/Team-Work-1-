import React from "react";

import { Outlet } from "react-router-dom";
import { Select } from 'antd';
import { Input } from 'antd';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setType, setSearch } from "../features/post/PostSlice";
import axios from "axios";

import { logout, saveUserName } from "../features/users/UserSlice";

export default function Header(){
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [userLogin,setUserLogin]=React.useState(false);


    function login(){
        navigate("../login");
    }

    function register(){
        navigate("../register");
    }

    const user_token=useSelector((state)=>{return state.users.loginin_user});

    
    

    React.useEffect(() => {
        const fetchData = async () => {
            if(user_token === "" || user_token === undefined){
                setUserLogin(false);
            }
            else{
                setUserLogin(true);
                const code = await axios({
                    headers: {
                        "Content-Type": "application/json",
                        "token": user_token
                    },
                    url: 'http://47.251.69.199/user/getUserInfo',
                    method: "GET",
                    data: {}
                });
                dispatch(saveUserName(code.data.data));
            }
        };
    
        fetchData();
    }, [user_token, dispatch]);

    const [types, setTypes]=React.useState([]);

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


    const onChange = (value) => {
        dispatch(setType(value));
      };

    function inputChange(e){
        dispatch(setSearch(e.target.value));
    }

    const onSearch = (value) => {
        console.log('search:', value);
    };

    const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());



    return(
        <div>
            <div className="header">
                <div className="leftHeader">
                    <span className="popular">Popular</span>
                    <span>News</span>
                    <span>Sport</span>
                    <span>Entertain</span>
                    <span>Science</span>
                    <span>Others</span>
                </div>
                <Input placeholder="News" className="input_search" onChange={inputChange}/>

                <div className="rightHeader">

                    <Select
                            className="filter"
                            showSearch
                            placeholder="Filter By Type"
                            optionFilterProp="children"
                            onChange={onChange}
                            onSearch={onSearch}
                            filterOption={filterOption}
                            options={
                                
                                types.map((item)=>{
                                    return{
                                        value: item.tid,
                                        label: item.tname.toUpperCase(),
                                    }

                                })
                            }
                        />

                    {
                        userLogin?
                        <div>
                            <button className="register" onClick={log_out}>Log out</button>
                        </div>

                        :   <div className="headerButtons">
                                 <button className="logIn" onClick={login}>Log in</button>
                                <button className="register" onClick={register}>Register</button>
                            </div>
                    }

                    

                </div>
            </div>

            <Outlet />
        </div>

    )
}