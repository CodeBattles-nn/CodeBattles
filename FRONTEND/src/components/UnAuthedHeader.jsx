import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import getApiAddress from "../utils/api";
import ChangeThemeButton from "./ChangeThemeButton";

const UnAuthedHeader = () => {

    return <nav className="navbar navbar-expand-md navbar-dark bg-dark" style={{minHeight: "56px"}}>
        <div className="container-fluid">
            <Link to="/login" className="navbar-brand" style={{"color": "red"}}>
                <img src="/logo200.png" width="30" height="30"
                     className="d-inline-block align-top mr-1" alt="Логотип"/>
                {/*CodeBattles*/}
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                        <Link className="nav-link" to="/login">Вход</Link>
                    </li>
                </ul>
                <ul className="navbar-nav  my-2 my-md-0">
                    <li className="nav-item mr-2" data-toggle="collapse" data-target=".navbar-collapse.show">
                        <Link className="nav-link" to="/statuses">Помощь</Link>
                    </li>


                    <ChangeThemeButton />

                </ul>
            </div>
        </div>
    </nav>
};

export default UnAuthedHeader;