import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, onChangePage } from '../redux/actions/products';
import { getPageChange } from '../configuration/app';
import { setCategory, setSortBy } from '../redux/actions/filters';
import { ProductItem, Loader, SortPopup, CategoryFilter } from "../components/_index";
import ReactPaginate from "react-paginate";
import "../sass/components/Pagination.sass";
import {
    editProductSearch,
    onProductSearch,
    productsSearchReset,
} from '../redux/actions';
import CreatableSelect from 'react-select/creatable';

const categoryNames = ['Dairy and Eggs', 'Fruits and Vegetables', 'Drinks']
const sortItems = [
    { name: 'popular',  type: 'id' },
    { name: 'name',     type: 'label' },
    { name: 'lower price', type: `price&descending=false`},
    { name: 'higher price', type: `price&descending=true`},
]
  
function ProductPage() {
    const dispatch  = useDispatch()
    const items = useSelector(({products}) => products.items)
    const isLoaded = useSelector(({products}) => products.isLoaded)
    const {
        category,
        sortBy,
        pageNumber,
        editProductsSearchType,
        editProductsSearchValue,
    } = useSelector(({ filters }) => filters)
    const [state, setState] = useState({
        items: (items || {}).data || [],
    });

    useEffect(() => {
        return () => {
            dispatch(productsSearchReset());
        }
    }, []);

    useEffect(() => {
        setState({
            ...state,
            items: (items || {}).data || [],
        })
    }, [JSON.stringify(items)]);

    useEffect(() => {
        dispatch(fetchProducts(category, sortBy))
    }, [category, sortBy]);
    
    const onSelectCategory = index => {
        dispatch(setCategory(index))
    };
    
    const onSelectSortType = type => {
        dispatch(setSortBy(type.type));
        dispatch(fetchProducts(category, type.type, pageNumber))
    };

    const handlePageChange = ({ selected }) => {
        // getPageChange(selected + 1);
        dispatch(onChangePage(selected + 1, sortBy));
    }

    const handleInputChange = (e) => {
        const value = e.target.value;
        const newData = [...items.data || []].filter(el => 
            el.label.toLowerCase().includes(value.toLowerCase())
            || el.price.toString().includes(value.toLowerCase())
            || el.description.toLowerCase().includes(value.toLowerCase())
        );
        setState({
            ...state,
            items: newData,
        })
    };
    
    const onSearchSelectHandler = (name, value) => {
        dispatch(editProductSearch(name, value));
    };

    const onSearchHandler = (name, value) => {
        dispatch(editProductSearch(name, value))
    };

    const pageCount = Math.ceil(items.totalRecords / items.pageSize)

    return (
        <div className="content-inner">
            <div className="content-stretch space-bottom">
                <CategoryFilter
                    items = { categoryNames }
                    activeCategory = { category }
                    onClickCategory = { onSelectCategory }
                />
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
                <SortPopup
                    items = { sortItems }          
                    activeSortType = { sortBy }
                    onClickSortType = { onSelectSortType }
                /> 
            </div>
            
            <div className="list__item">
                {
                    
                    isLoaded ? state.items.map(item => 
                        <ProductItem
                            key={ item.id }
                            image={ item.thumbnail }
                            title={ item.label }
                            description={ item.description }
                            price={ item.price }
                            discount="-10%"
                            link={ item.id }
                        />
                    ) : 
                    Array(12)
                    .fill(0)
                    .map((_, index) => (<Loader key={index} />))

                }
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
}


export default ProductPage