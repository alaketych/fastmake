import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Logo } from "./_index";
import { userSetUserRole } from '../redux/actions';
import { userLogOut } from '../redux/actions/user';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from "../components/_index"
import "../sass/components/Header.sass"
import "../sass/components/Cart.sass"

function Header() {
    const dispatch = useDispatch();
    const loggedIn = useSelector(({user}) => user.loggedIn);
    const [state, setState] = useState({
        userToken: '',
        userRole: '',
    });

    const { totalPrice, totalCount } = useSelector(({cart}) => ({
        totalPrice: cart.totalPrice,
        totalCount: cart.totalCount,
    }));

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

                            <div className="header__cart">
                                <Link to="/cart">
                                    <button className="button--cart">
                                        <span>{ totalPrice } ₽</span>
                                        <div className="button__delimiter"></div>
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 18 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                                                stroke="white"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                                                stroke="white"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                                                stroke="white"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <span>{ totalCount }</span>
                                    </button>
                                </Link>
                            </div>
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