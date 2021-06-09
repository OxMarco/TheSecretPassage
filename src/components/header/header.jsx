import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Header extends Component {

    render() {
        return (
        <>
            <div className="collapse navbar-collapse custom-navmenu" id="main-navbar">
                <div className="container py-2 py-md-5">
                    <div className="row align-items-start">
                        <div className="col-md-2">
                            <ul className="custom-menu">
                                <li><Link to="/home">Home</Link></li>
                                <li><Link to="/dashboard">Dashboard</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            <nav className="navbar navbar-light custom-navbar">
                <div className="container">
                    <Link className="navbar-brand" to="/home">TheSecretPassage.</Link>
                    <a href="#" className="burger" data-bs-toggle="collapse" data-bs-target="#main-navbar">
                        <span></span>
                    </a>
                </div>
            </nav>
        </>
        );
    }

}
