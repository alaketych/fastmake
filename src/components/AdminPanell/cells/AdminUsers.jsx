import React, {
    useEffect,
} from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { fetchUsers } from '../../../api';
import {
    setUserEditId,
    editUserChange,
    editUserOnSave,
    usersOnChangePage,
} from '../../../redux/actions';
import "../../../sass/components/cells/AdminProducts.sass";
import CreatableSelect from 'react-select/creatable';
import ReactPaginate from "react-paginate";

function AdminUsers(){
    const dispatch = useDispatch();
    const {users, userPotalRecords, userPageSize, } = useSelector(({admin}) => admin);
    const editUser = useSelector(({admin}) => admin.editUser);
    const {role, loggedIn} = useSelector(({user}) => user);

    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('userRole');
        if (!!loggedIn && token && (userRole === 'Administrator')) {
            dispatch(fetchUsers());
        } else {
            history.push('/');
        }
    }, [loggedIn]);

    const onEdit = id => {
        dispatch(setUserEditId(id));
    };
    
    const onEditChange = (name, value) => {
        dispatch(editUserChange(name, value));
    };

    const editProductOnSaveHandler = type => {
        dispatch(editUserOnSave(type));
    };

    const handlePageChange = ({ selected }) => {
        dispatch(usersOnChangePage(selected + 1));
    };

    const pageCount = Math.ceil(userPotalRecords / userPageSize);

    return (
        <div className='content-inner'>
            <div className='adminProductsWrapper'>
                <h2 className='adminProductsHeader'>
                    Admin Users
                </h2>
                <div className='editorWrapper'>
                    <div className='editor'>
                        {
                            role === 'Administrator' && (
                                <CreatableSelect
                                    onChange={e => onEditChange('role', e.value)}
                                    options={[
                                        {
                                            value: "ContentManager",
                                            label: "Content Manager",
                                        },
                                        {
                                            value: "Customer",
                                            label: "Customer",
                                        },
                                        {
                                            value: "Administrator",
                                            label: "Administrator",
                                        },
                                    ]}
                                    placeholder='Role'
                                    value={{
                                        value: editUser.role,
                                        label: editUser.role,
                                    }}
                                    className='editorSelect'
                                />
                            )
                        }
                        <input type="text" 
                            onChange={e => onEditChange('firstName', e.target.value)}
                            placeholder='First name'
                            value={editUser.firstName}
                            className='editorInput'
                            defaultValue={''}
                        />
                        <input type="text" 
                            onChange={e => onEditChange('lastName', e.target.value)}
                            placeholder='Last name'
                            value={editUser.lastName}
                            className='editorInput'
                            defaultValue={''}
                        />
                        <input type="text" 
                            onChange={e => onEditChange('phone', e.target.value)}
                            placeholder='Phone'
                            value={editUser.phone}
                            className='editorInput'
                            defaultValue={''}
                        />
                        <input type="text" 
                            onChange={e => onEditChange('email', e.target.value)}
                            placeholder='Email'
                            value={editUser.email}
                            className='editorInput'
                            defaultValue={''}
                        />
                        <input type="number" 
                            onChange={e => onEditChange('id', e.target.value)}
                            placeholder='Id'
                            value={editUser.id}
                            className='editorInput'
                            defaultValue={''}
                        />
                        <div className='buttonsWrapper'>
                            <button onClick={() => editProductOnSaveHandler('update', dispatch(fetchUsers()))}
                                className={classNames('editorBtn update', {'disabled': 
                                !(users.data || []).map(e => e.id).includes(editUser.id) || role === 'ContentManager'}
                                )
                            }
                            >
                                Update
                            </button>

                            <button onClick={() => editProductOnSaveHandler('create', dispatch(fetchUsers()))}
                                className={classNames('editorBtn create', {
                                    'disabled': role !== 'Administrator'
                                })}
                            >
                                Create
                            </button>

                            
                        </div>
                    </div>
                    <div className='editorItem'>
                        <a className='editedItem'>{ editUser.role }</a>
                        <a className='editedItem'>{ editUser.firstName }</a>
                        <a className='editedItem'>{ editUser.lastName }</a>
                        <a className='editedItem'>{ editUser.phone }</a>
                        <a className='editedItem'>{ editUser.email }</a>
                        <a className='editedItem'>{ editUser.id }</a>
                    </div>
                </div>

                <ul>
                    {
                        (users.data || []).map(e => (
                            <li className={classNames('productLi', e.id === editUser.id ? ('active'): false)}
                                onClick={() => onEdit(e.id)}
                                key={e.id}
                            >
                                <div className='descWrapper'>
                                    <a>{ e.role }</a>
                                    <a>{ e.firstName }</a>
                                    <a>{ e.lastName }</a>
                                    <a>{ e.phone }</a>
                                    <a>{ e.email }</a>
                                    <a>{ e.id }</a>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                pageCount={ pageCount }
                containerClassName={ "pagination" }
                previousLinkClassName={ "pagination__link" }
                nextLinkClassName={ "pagination__link" }
                disabledClassName={ "pagination__link--disabled" }
                activeClassName={ "pagination__link--active" }
                onPageChange={handlePageChange}
            />
        </div>
    )
};

export default AdminUsers;