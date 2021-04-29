import React, { useEffect, useState } from "react"
import { CategoryItem  } from "../components/_index"
import { getCategories } from '../configuration/app'
import '../sass/components/Catalog.sass'

function CatalogPage() {
    const [category, setCategory] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          const response = await getCategories();
          setCategory(response.data.data);
        };
    
        fetchData();
    }, []);

    return (
        <div className="content-inner">
            <div className="list__category">
                    {
                        category && category.map(item => 
                            <CategoryItem 
                                key={ item.id }
                                itemId={ item.id }
                                image={ item.thumbnail }
                                title={ item.label }
                            />
                        )
                    }
            </div>
        </div>
    )
}

export default CatalogPage