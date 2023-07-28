import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { fetchFn } from '../etc/NetworkUtils';
import { Button, Card, Row } from 'react-bootstrap';

function ItemComp(props) {
    const item = props.item;
    const username = useParams().username;


    function onsubmitHandler(e){
      e.preventDefault();
      
      fetchFn("GET", `http://localhost:9007/api/item/list/username/search?username=${username}&pageNum=0`, null)
      .then(data => {
          window.location.href=`/item/list/username/${item.username}`
      })
  }

  return (
<div>
      <Row className="justify-content-center">
       <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
      <div>
        <Card.Title> 
        <p><span className='c'>등록자 
            : <Link className='b' to={`/item/list/username/${item.username}`} onSubmit={onsubmitHandler}>{item.username}</Link>          
            </span></p>
        상품이름 : <Link className='b' to={`/item/detail/${item.id}`}> {item.itemName}</Link>
        </Card.Title>
        <Card.Text>
        가격 : {item.price}<br/>
        할인률 : {item.discount}<br/>
        할인가격 : {item.price*(100 - item.discount)/100}
        </Card.Text>
        <Button variant="dark"><Link className='a' to={`/item/list/username/${item.username}` } onSubmit={onsubmitHandler}>{item.username}</Link></Button>
        </div>
      </Card.Body>
    </Card>
    </Row>
    </div>
  )
}

export default ItemComp