import React from "react";

import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

export default function Header(){
    const user = useSelector((state)=>{return state.users.loginin_user.user})
    return(
        <div>
            <div className="header">
                {user}
                <Link to="login">Login</Link>
                <Link to=".">Home</Link>
            </div>

            <Outlet />
        </div>

    )
}