import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    onChangePage,
    fetchCategoryProducts } from '../redux/actions/products';
import {
    editProductSearch,
    onProductSearch,
    productsSearchReset,
} from '../redux/actions';
import { ProductItem, Loader, SortPopup } from "../components/_index";
import { setCategory, setSortBy } from '../redux/actions/filters';
import CreatableSelect from 'react-select/creatable';
import ReactPaginate from "react-paginate";
import "../sass/components/Pagination.sass";

const sortItems = [
    { name: 'popular',  type: 'id' },
    { name: 'name',     type: 'label' },
    { name: 'lower price', type: `price&descending=false`},
    { name: 'higher price', type: `price&descending=true`},
]

function ProductsCategoryPage({
    match
}) {
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
        setState({
            ...state,
            items: (items || {}).data || [],
        })
    }, [JSON.stringify(items)]);

    useEffect(() => {
        if (match && match.params.id) {
            dispatch(fetchCategoryProducts(match.params.id, sortBy, pageNumber))
        }
    }, [match, sortBy, pageNumber]);

    const [products, setProducts] = useState([])

    const handlePageChange = ({ selected }) => {
        dispatch(onChangePage(selected + 1, sortBy));
    }

    const onSelectSortType = type => {
        dispatch(setSortBy(type.type));
        dispatch(fetchCategoryProducts(category, type.type, pageNumber))
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

export default ProductsCategoryPage;