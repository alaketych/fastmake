import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import classNames from 'classnames';
import { fetchCategories } from '../../../api';
import {
    setCategoryEditId,
    editCategoryChange,
    editCategoryOnSave,
    categoriesOnChangePage,
} from '../../../redux/actions';
import "../../../sass/components/cells/AdminProducts.sass";
import ReactPaginate from "react-paginate";

function AdminCategory(){
    const dispatch = useDispatch();
    const {categories, catPageSize, catPotalRecords} = useSelector(({admin}) => admin);
    const editCategory = useSelector(({admin}) => admin.editCategory);
    const { role, loggedIn} = useSelector(({user}) => user);

    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('userRole');
        if (!!loggedIn && token && (userRole === 'Administrator' || userRole === 'ContentManager')) {
            dispatch(fetchCategories());
        } else {
            history.push('/');
        }
    }, [loggedIn]);

    const onEdit = id => {
        dispatch(setCategoryEditId(id));
    };
    
    const onEditChange = (name, value) => {
        dispatch(editCategoryChange(name, value));
    };

    const editProductOnSaveHandler = type => {
        dispatch(editCategoryOnSave(type));
    };

    const handlePageChange = ({ selected }) => {
        // getPageChange(selected + 1);
        dispatch(categoriesOnChangePage(selected + 1));
    };

    const pageCount = Math.ceil(catPotalRecords / catPageSize);

    return (
        <div className='content-inner'>
            <div className='adminProductsWrapper'>
                <h2 className='adminProductsHeader'>
                    Admin Categories
                </h2>

                <div className='editorWrapper'>
                    <div className='editor'>
                        <input type="text" 
                            onChange={e => onEditChange('thumbnail', e.target.value)}
                            placeholder='Image'
                            value={editCategory.thumbnail}
                            className='editorInput'
                            defaultValue={''}
                        />
                        <input type="text" 
                            onChange={e => onEditChange('label', e.target.value)}
                            placeholder='Label'
                            value={editCategory.label}
                            className='editorInput'
                            defaultValue={''}
                        />
                        <div className='buttonsWrapper'>
                            <button onClick={() => editProductOnSaveHandler('update', dispatch(fetchCategories()))}
                                className={classNames('editorBtn update', {'disabled': !editCategory.id || role === 'ContentManager'})}
                            >
                                Update
                            </button>

                            <button onClick={() => editProductOnSaveHandler('create', dispatch(fetchCategories()))}
                                className='editorBtn create'
                            >
                                Create
                            </button>

                            {
                                role === 'Administrator' && (
                                    <button onClick={() => editProductOnSaveHandler('remove', dispatch(fetchCategories()))}
                                        className={classNames('editorBtn remove', {'disabled': !editCategory.id || role === 'ContentManager'})}
                                    >
                                        Remove
                                    </button>
                                )
                            }
                        </div>
                    </div>
                    <div className='editorItem'>
                        {
                            editCategory.thumbnail && (
                                <div className='editedItem categoryEditIMG'>
                                    <img src={editCategory.thumbnail} alt={'editedImg'}/>
                                </div>
                            )
                        }
                        <a className='editedItem'>{ editCategory.label }
                        </a>
                    </div>
                </div>

                <ul>
                    {
                        (categories || []).map(e => (
                            <li className={classNames('productLi', e.id === editCategory.id ? ('active'): false)}
                                onClick={() => onEdit(e.id)}
                                key={e.id}
                            >
                                <img src={e.thumbnail} alt='IMG_1'/>
                                <div className='descWrapper'>
                                    <a>{ e.label }</a>
                                    <a>{ e.description }</a>
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

export default AdminCategory;