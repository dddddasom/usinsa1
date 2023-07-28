import React, { useEffect, useState } from 'react'

import ItemComp from './ItemComp';
import { fetchFn } from '../etc/NetworkUtils';
import ItemListPaging from './ItemListPaging';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function ItemList() {

    const ROLE = localStorage.getItem("ROLE");
    const [pageList, setPageList] = useState([]);

    const selectList = ["", "상의", "하의", "모자", "가방"];
    const [Selected, setSelected] = useState("item.itemType");
  
    const handleSelect = (e) => {
      setSelected(e.target.value);
    };

    useEffect(() => {
        fetchFn("GET", `http://localhost:9007/api/item/list?pageNum=0`).then(
            (data) => {
                setPageList(data.result.content);
            }
        );
    }, []);

    function onSubmitHandler(e){
        e.preventDefault();
        if (Selected === "item.itemType"){
            window.location.href=`/item/list`
        } else {
            window.location.href=`/item/list/itemtype/${Selected}`
        }
    }


    return (
        <div style={{ marginTop: "30px", marginBottom: "30px" }}>
    

            {ROLE === "1" || ROLE === "2" ? 
            <Button variant="dark" style={{ marginBottom: "30px", width: "200px", height: "40px"}}><Link className='a' to={"/item/insert"}>아이템 등록하기 </Link></Button>:<></> }

        <form action='#' onSubmit={onSubmitHandler}>
            상품종류: <select onChange={handleSelect} value={Selected}>
                {selectList.map((itemType) => (
                    <option value={itemType} key={itemType}>
                    {itemType}
                    </option>
                ))}
            </select><br/>
            <button style={{ marginTop: "10px", marginBottom: "10px" }}>가져오기</button>

        </form>
            
            {
                pageList.length > 0 && pageList.map(item => <ItemComp key={item.id} item={item} />)
            }

            <ItemListPaging setFn={setPageList} />
        </div>
    )
}

export default ItemList

