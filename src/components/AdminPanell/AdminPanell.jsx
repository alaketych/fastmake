import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import "../../sass/components/AdminPanell.sass";

function AdminPanell() {
    const {loggedIn, role} = useSelector(({user}) => user);

    const history = useHistory();

    useEffect(() => {
        if (!loggedIn) {
            history.push('/');
        }
    }, [loggedIn]);

    return (
        <div className='adminPanell_Wrapper'>
            <div className='link'>
                <Link to="/admin-category"
                    style={{
                        textDecoration: "none",
                        border: '1px solid #e3e3e3',
                        padding: '12px',
                        borderRadius: '7px',
                    }}
                >
                    Categories
                </Link>
            </div>
            <div className='link'>
                <Link to="/admin-products"
                    style={{
                        textDecoration: "none",
                        border: '1px solid #e3e3e3',
                        padding: '12px',
                        borderRadius: '7px',
                    }}
                >
                    Products
                </Link>
            </div>
            {
                role === 'Administrator' && (
                    <div className='link'>
                        <Link to="/admin-users"
                            style={{
                                textDecoration: "none",
                                border: '1px solid #e3e3e3',
                                padding: '12px',
                                borderRadius: '7px',
                            }}
                        >
                            Users
                        </Link>
                    </div>
                )
            }
        </div>
    )
};

AdminPanell.defaultProps = {
    
};

export default AdminPanell;