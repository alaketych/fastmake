import React from "react"
import { Link } from "react-router-dom"
import logo from "../assets/images/Logo.png"

function Logo() {
    return (
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <div className="header__logo">
                <img width="75" className="logo" src={ logo } alt="DataArt"/>
        
                <div className="header__logo__info">
                    <h2 className="header__logo__title">DataArt</h2>
                    <p className="header__logo__descr">shopping cart</p>
                </div>
            </div>
        </Link>
    )
}

export default Logo