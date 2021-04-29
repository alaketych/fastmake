import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Logo } from "./_index";
import { userSetUserRole } from '../redux/actions';
import { userLogOut } from '../redux/actions/user';
import { useSelector, useDispatch } from 'react-redux';
import "../sass/components/Header.sass"

function Header() {
    const dispatch = useDispatch();
    const loggedIn = useSelector(({user}) => user.loggedIn);
    const [state, setState] = useState({
        userToken: '',
        userRole: '',
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('userRole');
        if (token && role) {
            dispatch(userSetUserRole(role));
        }
        setState({
            userToken: token,
            userRole: role,
        });
    }, []);

    useEffect(() => {
        const newToken = localStorage.getItem('token');
        const newRole = localStorage.getItem('userRole');
        setState({
            userToken: newToken,
            userRole: newRole,
        });
    }, [loggedIn]);

    const onLogout = () => {
        dispatch(userLogOut());
        localStorage.clear();
        setState({
            userToken: '',
            userRole: '',
        });
    };

    return (
        <header className="header">
            <div className="header-inner">
                <div className="header__top">
                    <Logo />

                    <div className="header__info">
                        <nav className="navigation">
                            <ul className="navigation__menu">
                                <li className="header__item">
                                    <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                                        Home
                                    </Link>
                                </li>

                                {
                                    !state.userToken && (
                                        <>
                                            <li className="header__item">
                                                <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
                                                    Login
                                                </Link>
                                            </li>

                                            <li className="header__item">
                                                <Link to="/registration" style={{ textDecoration: "none", color: "inherit" }}>
                                                    Registration
                                                </Link>
                                            </li>
                                        </>
                                    )
                                }

                                {
                                    state.userToken && (state.userRole === 'Administrator' || state.userRole === 'ContentManager') && (
                                        <li className="header__item">
                                            <Link to="/manager" style={{ textDecoration: "none", color: "inherit" }}>
                                                Administration
                                            </Link>
                                        </li>
                                    )
                                }
                                {
                                    state.userToken && (
                                        <li className="header__item" onClick={onLogout}>
                                            <Link style={{ textDecoration: "none", color: "inherit" }}>
                                                Log out
                                            </Link>
                                        </li>
                                    )
                                }
                            </ul>
                        </nav>
                    </div>
                </div>

                <ul className="services">
                    <li className="service__item enum">
                        <Link to="/catalog" style={{ textDecoration: "none", color: "inherit" }}>
                            <img className="service-logo" src="/images/light.png" alt="" />
                            Catalog
                        </Link>
                    </li>

                    <li className="service__item enum">
                        <Link to="/products" style={{ textDecoration: "none", color: "inherit" }}>
                            <img className="service-logo" src="/images/light.png" alt="" />
                            Products
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default Header