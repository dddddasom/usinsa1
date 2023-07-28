import React, { useEffect, useState } from 'react'
import ItemComp from './ItemComp';
import { fetchFn } from '../etc/NetworkUtils';
import ItemListTypePaging from './ItemListTypePaging';
import { Link, useParams } from 'react-router-dom';

function ItemTypeList() {
    
    const ROLE = localStorage.getItem("ROLE");
    const [pageList, setPageList] = useState([]);

    const selectList = ["", "상의", "하의", "모자", "가방"];
    const [Selected, setSelected] = useState("item.itemType");

    const itemType = useParams().itemType;
  
    const handleSelect = (e) => {
      setSelected(e.target.value);
    };

    useEffect(() => {

        fetchFn("GET", `http://localhost:9007/api/item/itemtype/itemtype?itemType=${itemType}&pageNum=0`)
        .then(
            (data) => {
                setPageList(data.result.content);
            }
        );

    }, [itemType]);

    function onSubmitHandler(e){
        e.preventDefault();

        if (Selected === "item.itemType"){
            window.location.href=`/item/list`
        } else {
            window.location.href=`/item/list/itemtype/${Selected}`
        }
     
    }


  return (
    <div>
{ROLE === "1" || ROLE === "2" ? <Link to={"/item/insert"}> 등록하기 </Link>:<></> }
        <form action='#' onSubmit={onSubmitHandler}>
        상품종류: <select onChange={handleSelect} value={Selected}>
                {selectList.map((itemType) => (
                    <option value={itemType} key={itemType}>
                    {itemType}
                    </option>
                ))}
            </select><br/>
            <button>가져오기</button>

        </form>

            {
                pageList.length >= 0 && pageList.map(item => <ItemComp key={item.id} item={item} />)
            }
 
            <ItemListTypePaging itemType={itemType} setFn={setPageList}/> 
    </div>
  )
}

export default ItemTypeList