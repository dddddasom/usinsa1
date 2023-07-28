import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchFn } from '../etc/NetworkUtils';
import ItemSearchPageByStaff from './ItemSearchPageByStaff';
import ItemComp from './ItemComp';

function ItemListByStaff() {
    const [pageList, setPageList] = useState([]);
    const username = useParams().username;

    useEffect(()=>{
        fetchFn("GET", `http://localhost:9007/api/item/list/search?username=${username}&pageNum=0`, null)
        .then((data) =>{
            setPageList(data.result.content);
        })
    },[username])

  return (
    <div>
        {
            pageList.length > 0 && pageList.map(item => <ItemComp key={item.id} item={item}/>)
        }
        <ItemSearchPageByStaff setFn={setPageList}/>
        
    </div>
  )
}

export default ItemListByStaff