import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setEditFields } from '../redux/actions/products';
import { Button } from "../components/_index"
import { Link } from "react-router-dom"
import "../sass/components/ProductItem.sass"

function ProductItem({
    image,
    title,
    description,
    price,
    discount,
    link,
}) {

    const dispatch = useDispatch();

    const setEditFieldsHandler = () => {
        dispatch(setEditFields({
            thumbnail: image,
            title,
            description,
            price,
            discount,
            link,
        }))
    };

    return (
        <div className="product-item enum" onClick={setEditFieldsHandler}>
            <div className="discount">{ discount }</div>
            <div className="item__thumb">
                <Link to={ `/products/${ link }` } style={{ textDecoration: "none", color: "inherit" }}>
                    <img className="item__image" src={ image } alt="item" />
                </Link>
            </div>

            <div className="inner-padding">
                <h4 className="product-item__title tiny-height-padding">
                    <Link to={ `/products/${ link }` } style={{ textDecoration: "none", color: "inherit" }}>
                        { title }
                    </Link>
                </h4>
                <h4 className="product-item__description">{ description }</h4>
            
                <div className="product-item__content">
                    <h4 className="item__price">{ price } UAH</h4>
                    <Button 
                        label="Purchase"
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductItem