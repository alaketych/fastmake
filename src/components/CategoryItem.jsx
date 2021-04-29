import React from "react"
import { Link } from "react-router-dom"
import "../sass/components/CategoryItem.sass"

function CategoryItem({ image, title, itemId }) {
    return (
        <Link to={ `/products/category/${ itemId }` }>
            <div className="category-item enum">
                <div className="category-item__thumb">
                    <Link to={ `/products/category/${ itemId }` } style={{ textDecoration: "none", color: "inherit" }}>
                        <img className="category-item__image" src={ image } alt="item" />
                    </Link>
                </div>

                <h4 className="category-item__title slanted-both-sides">{ title }</h4>
            </div>
        </Link>
    )
}

export default CategoryItem