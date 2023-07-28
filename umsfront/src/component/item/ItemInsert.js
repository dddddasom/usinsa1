import React, { useEffect, useState } from 'react'
import { InsertFetchFn } from '../etc/NetworkUtils';

function ItemInsert() {
    const username = localStorage.getItem("LOGINER");
    const ROLE = localStorage.getItem("ROLE");

    const selectList = ["", "상의", "하의", "모자", "가방"];
    const [Selected, setSelected] = useState("");
  
    const handleSelect = (e) => {
      setSelected(e.target.value);
    };


    useEffect(() => {
        if (ROLE === "1" || ROLE === "2"){
            return;
        } alert("잘못된 접근입니다.");
        window.location.href=`/`

    }, [ROLE])

    function onSubmitHandler(e){

        e.preventDefault();

        const formData = new FormData(e.target);
        const itemName = formData.get('itemName');
        const price = formData.get('price');
        const discount = formData.get('discount');
        const ea = formData.get('ea');
        const itemDescribe = formData.get('itemDescribe');
        const itemType = Selected

        const dto = {
            username,
            itemName,
            price,
            discount,
            ea,
            itemDescribe,
            itemType
        };

        InsertFetchFn("item", dto);
    }
  return (
    <div>
        { (ROLE === "1" || ROLE ==="2" ) &&
<>  
<h2>상품 등록</h2>
        <form action='#' onSubmit={onSubmitHandler}>
            등록자 : <input name='username' value={username} readOnly/><br/>
            상품이름 : <input name='itemName'/><br/>
            가격 : <input name='price'/><br/>
            할인률 : <input name='discount'/><br/>
            재고 : <input name='ea'/><br/>
            상품정보 : <input name='itemDescribe'/><br/>
            
            상품종류: <select onChange={handleSelect} value={Selected}>
                {selectList.map((itemType) => (
                    <option value={itemType} key={itemType}>
                    {itemType}
                    </option>
                ))}
            </select><br/>
            <button>등록</button>
        </form></>
        }
    </div>
  )
}

export default ItemInsert