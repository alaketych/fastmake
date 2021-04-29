import React from "react"
import { Link } from "react-router-dom"
import { Logo } from "../components/_index"
import "../sass/components/Footer.sass"

function Footer() {
    return (
        <footer className="footer">
            <div className="content-inner">
                <div className="wrapper">
                    <Logo />

                    <div className="submenu">
                        <ul className="submenu__info">
                            <li className="submenu__item">
                                <Link to="/products" style={{ textDecoration: "none", color: "inherit" }}>
                                    Products
                                </Link>
                            </li>

                            <li className="submenu__item">
                                <Link to="/catalog" style={{ textDecoration: "none", color: "inherit" }}>
                                    Categories
                                </Link>
                            </li>
                        </ul>

                        <ul className="submenu__info">
                            <li className="submenu__item">
                                <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
                                    Login
                                </Link>
                            </li>

                            <li className="submenu__item">
                                <Link to="/registration" style={{ textDecoration: "none", color: "inherit" }}>
                                    Registration
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <h1 className="footer__rights">all rights are reserved copyright 2021.</h1>
            </div>
    </footer>
    )
}

export default Footer