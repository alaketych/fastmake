import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import classNames from 'classnames';
import {
    setProductEditId,
    fetchProducts,
    editProductChange,
    editProductOnSave,
    editProductSearch,
    onProductSearch,
    productsSearchReset,
} from '../../../redux/actions';
import { 
    onChangePage
} from '../../../redux/actions/products';
import "../../../sass/components/cells/AdminProducts.sass";
import CreatableSelect from 'react-select/creatable';
import ReactPaginate from "react-paginate";

function AdminProducts(){

    const dispatch = useDispatch();
    const products = useSelector(({products}) => products.items);
    
    const {
        category,
        sortBy,
        editProductsSearchType,
        editProductsSearchValue,
    } = useSelector(({ filters }) => filters);
    const editProduct = useSelector(({admin}) => admin.editProduct);
    const pageCount = Math.ceil(products.totalRecords / products.pageSize);
    const {loggedIn} = useSelector(({user}) => user);

    const history = useHistory();


    useEffect(() => {
        return () => {
            dispatch(productsSearchReset());
        }
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('userRole');
        if (!!loggedIn && token && (userRole === 'Administrator' || userRole === 'ProductManager')) {
            dispatch(fetchProducts(category, sortBy));
        } else {
            history.push('/');
        }
    }, [loggedIn]);

    const onEdit = id => {
        dispatch(setProductEditId(id));
    };
    
    const onEditChange = (name, value) => {
        dispatch(editProductChange(name, value));
    };

    const editProductOnSaveHandler = (type, callback) => {
        dispatch(editProductOnSave(type, callback));
    };
    
    const handlePageChange = ({ selected }) => {
        // getPageChange(selected + 1);
        dispatch(onChangePage(selected + 1, sortBy));
    };

    const onSearchSelectHandler = (name, value) => {
        dispatch(editProductSearch(name, value));
    };

    const onSearchHandler = (name, value) => {
        dispatch(editProductSearch(name, value))
    };

    return (
        <div className='content-inner'>
            <div className='adminProductsWrapper'>
                <h2 className='adminProductsHeader'>
                    AdminProducts
                </h2>

                <div className='editorWrapper'>
                    <div className='editor'>
                        <input type="text" 
                            onChange={e => onEditChange('thumbnail', e.target.value)}
                            placeholder='Image'
                            value={editProduct.thumbnail}
                            className='editorInput'
                            defaultValue={''}
                        />
                        <input type="text" 
                            onChange={e => onEditChange('label', e.target.value)}
                            placeholder='Label'
                            value={editProduct.label}
                            className='editorInput'
                            defaultValue={''}
                        />
                        <input type="text" 
                            onChange={e => onEditChange('description', e.target.value)}
                            placeholder='Description'
                            value={editProduct.description}
                            className='editorInput'
                            defaultValue={''}
                        />
                        <input type="number" 
                            onChange={e => onEditChange('price', e.target.value)}
                            placeholder='Price'
                            value={editProduct.price}
                            className='editorInput'
                            defaultValue={''}
                        />
                        <div className='buttonsWrapper'>
                            <button onClick={() => editProductOnSaveHandler('update', dispatch(fetchProducts(category, sortBy)))}
                                className={classNames('editorBtn update', {'disabled': !editProduct.id})}
                            >
                                Update
                            </button>

                            <button onClick={() => editProductOnSaveHandler('create', dispatch(fetchProducts(category, sortBy)))}
                                className='editorBtn create'
                            >
                                Create
                            </button>
                            <button onClick={() => editProductOnSaveHandler('remove', dispatch(fetchProducts(category, sortBy)))}
                                className={classNames('editorBtn remove', {'disabled': !editProduct.id})}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                    <div className='editorItem'>
                        {
                            editProduct.thumbnail && (
                                <div className='editedItem'>
                                    <img src={editProduct.thumbnail} alt={'editedImg'}/>
                                </div>
                            )
                        }
                        <a className='editedItem'>{ editProduct.label }</a>
                        <a className=''>{ editProduct.description }</a>
                        <a className='editedItem'>{ editProduct.price }</a>
                    </div>
                </div>
                <div>
                    <CreatableSelect
                        onChange={e => onSearchSelectHandler('editProductsSearchType',e.value)}
                        options={[
                            {
                                value: "Description",
                                label: "Description",
                            },
                            {
                                value: "Label",
                                label: "Label",
                            },
                        ]}
                        placeholder='Product'
                        value={{
                            value: editProductsSearchType,
                            label: editProductsSearchType,
                        }}
                        className='editorSelect'
                    />
                    <input type="text" 
                        onChange={e => onSearchHandler('editProductsSearchValue', e.target.value)}
                        placeholder='Search Value'
                        value={editProductsSearchValue}
                        className='editorInput'
                        defaultValue={''}
                    />
                    <button
                        onClick={() => dispatch(onProductSearch())}
                    >
                        Search
                    </button>
                </div>
                <ul>
                    {
                        (products.data || []).map(e => (
                            <li className={classNames('productLi', e.id === editProduct.id ? ('active'): false)}
                                onClick={() => onEdit(e.id)}
                                key={e.id}
                            >
                                <img src={e.thumbnail} alt='IMG_1'/>
                                <div className='descWrapper'>
                                    <a>{ e.label }</a>
                                    <a>{ e.description }</a>
                                    <a>Price: { e.price }</a>
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

export default AdminProducts;