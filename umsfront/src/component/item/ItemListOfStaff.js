import React, { useEffect, useState } from 'react'
import { fetchFn } from '../etc/NetworkUtils';
import ItemComp from './ItemComp';
import { useParams } from 'react-router-dom';
import ItemSearchPaging from './ItemSearchPaging';

function ItemListOfStaff() {
    const [pageList, setPageList] = useState([]);
    const username = useParams().username;

    useEffect(() => {
        console.log(username)
        fetchFn("GET", `http://localhost:9007/api/item/list/username/search?username=${username}&pageNum=0`, null)
        .then((data) => {
                setPageList(data.result.content);

            }
        );
    }, [username]);
    

    return (
        <div>
            {
                pageList.length > 0 && pageList.map(item => <ItemComp key={item.id} item={item} />)
            }

            <ItemSearchPaging setFn={setPageList} />
        </div>
    )
}

export default ItemListOfStaff