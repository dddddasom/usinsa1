import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { fetchFn } from '../etc/NetworkUtils';
import ReplyInsert from '../reply/ReplyInsert';
import ReplyList from '../reply/ReplyList';
import { Button } from 'react-bootstrap';

function ItemDetail() {

    const LOGINER = localStorage.getItem("LOGINER");
    const id = useParams().id;
    const username = useParams().username;
    const [item, setItem] = useState(null);

    useEffect(() => {
        fetchFn("GET", `http://localhost:9007/api/item/id/${id}`, null)
            .then(data => {
                setItem(data.result);
            })
    }, [id])


    function onsubmitHandler(e){
        e.preventDefault();
        
        fetchFn("GET", `http://localhost:9007/api/item/list/username/search?username=${username}&pageNum=0`, null)
        .then(data => {
            window.location.href=`/item/list/username/${item.username}`
        })
    }





    function deleteHere(){
        let isOk = window.confirm("정말 삭제하시겠습니까?")

        if(isOk){
            const dto = {
                id
            }
            fetchFn("DELETE", "http://localhost:9007/api/item", dto)
            .then(() =>{
                window.location.href="/item/list";
            })
        }
    }



  return (
    <div>
        <h2>상품정보 자세히 보기</h2>
            {
                item !== null &&<>

                <div className='item'>
                   {item.member && <p>등록자 : {item.member.username}</p>}
                   <span>등록자 : <Link to={`/item/list/username/${item.username}`} onSubmit={onsubmitHandler}>{item.username}</Link></span>
                    <p>상품이름 : {item.itemName}</p>
                    <p>가격 : {item.price}</p>
                    <p>할인률 : {item.discount}</p>
                    <p>할인가격 : {item.price*(100 - item.discount)/100}</p>
                    <p>재고 : {item.ea}</p>
                    <p>상품정보 : {item.itemDescribe}</p>
                    종류: {item.itemType}
                    <p>등록날짜 : {item.createDate}</p>
                    <p>수정날짜 : {item.updateDate}</p>
                </div>
                <div>
                    <Button variant="dark"><Link className='a' to={"/item/list"}>돌아가기</Link></Button>&nbsp;


                   {
                        LOGINER === item.username ? <>
                        <Button variant="dark"><Link className='a' to={`/item/update/${id}`}>수정</Link></Button>&nbsp;
                        <Button variant="dark"><Link className='a' onClick={deleteHere}>삭제</Link></Button>
                        </> : <></>
                    }
    
                    <ReplyInsert/>
                    <ReplyList/>
                </div>
                </>
            }
    </div>
  )
}

export default ItemDetail