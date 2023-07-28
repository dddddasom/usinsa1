import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchFn } from '../etc/NetworkUtils';
import ItemComp from './ItemComp';

function ItemSearchList() {
    const [pageList, setPageList] = useState([]);
    const keyword = useParams().keyword;

    useEffect(() => {
        fetchFn("GET", `http://localhost:9007/api/item/search/${keyword}`)
        .then((data) => {
                setPageList(data.result);
            }
        );
    }, [keyword]);

    return (
        <div>
            {
                pageList.length > 0 && pageList.map(item => <ItemComp key={item.id} item={item} />)
            }

        </div>
    )
}

export default ItemSearchList