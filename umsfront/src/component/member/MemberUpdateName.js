import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { UpdateFetchFn, fetchFn } from '../etc/NetworkUtils';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, Container, Row } from 'react-bootstrap';

function MemberUpdateName() {
    
    const LOGINER = localStorage.getItem("LOGINER");
    const username = useParams().username;
    const [member, setMember] = useState(null);

    useEffect(()=>{
        fetchFn("GET", `http://localhost:9007/api/member/name/${username}`, null)
        .then(data=>{
            if (LOGINER === data.result.username){
                setMember(data.result);
            } else {
                window.location.href=`/`;
            }
           
        })
    },[username, LOGINER]);

    function onSubmitHandler(e){

        e.preventDefault();

        const formData = new FormData(e.target);
        const name = formData.get("name");
        const password = formData.get("password");
        const phoneNumber = formData.get("phoneNumber");
        const address = formData.get("address");
        const height = formData.get("height");
        const weight = formData.get("weight");

        const dto = {
            username, 
            name, 
            password,
            phoneNumber,
            address,
            height,
            weight
        }
        
        UpdateFetchFn("member/name", dto);
    }

    function onInputHandler(e){
        let val = e.target.value;
        let newMember = {...member, [e.target.name]:val};
        setMember(newMember);
    }

  return (
    <div>
    <h2>회원 정보 수정</h2>
    {member !== null &&
  <Container>
  <Row className="justify-content-center">
    <Col md={2}>
  <Form onSubmit={onSubmitHandler}>

    <Form.Group className="mb-3" controlId="formBasicEmail1">
      <Form.Label>아이디</Form.Label>
      <Col sm={40}> 
      <Form.Control value={username} disabled />
      </Col>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicEmail2">
      <Form.Label >이름</Form.Label>
      <Col sm={40}  className="d-flex justify-content-center">
      <Form.Control  name="name" value={member.name} onInput={onInputHandler}/>
      </Col>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicEmail3">
      <Form.Label >핸드폰 번호</Form.Label>
      <Col sm={40}  className="d-flex justify-content-center">
      <Form.Control  name="phoneNumber" value={member.phoneNumber} onInput={onInputHandler}/>
      </Col>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicEmail4">
      <Form.Label >주소</Form.Label>
      <Col sm={40}  className="d-flex justify-content-center">
      <Form.Control  name="address" value={member.address} onInput={onInputHandler}/>
      </Col>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicEmail5">
      <Form.Label >키</Form.Label>
      <Col sm={40}  className="d-flex justify-content-center">
      <Form.Control  name="height" value={member.height} onInput={onInputHandler}/>
      </Col>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicEmail6">
      <Form.Label >몸무게</Form.Label>
      <Col sm={40}  className="d-flex justify-content-center">
      <Form.Control  name="weight" value={member.weight} onInput={onInputHandler}/>
      </Col>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicEmail7">
      <Form.Label >비밀번호</Form.Label>
      <Col sm={40}  className="d-flex justify-content-center">
      <Form.Control  name="password" type='password'/>
      </Col>
    </Form.Group>
    
    <Button variant="dark" type="submit">
      수정
    </Button>

    <Button variant="dark" type="submit">
      비밀번호 수정
    </Button>

  </Form>
  </Col>
  </Row>
  </Container>
  }
  </div>
  )
    // <div>
    //     <h2>회원 정보 수정</h2>
    //     {
    //         member !== null &&
    //         <form action='#' onSubmit={onSubmitHandler}>
    //             username : <input value={username} disabled/><br/>
    //             이름 : <input name='name' value={member.name} onInput={onInputHandler}/><br/>
    //             password : <input name='password'/><br/>
    //             <button>이름 수정</button>
    //             <Link to={`/member/updatePassword/${username}`}>비밀번호 수정</Link>
    //         </form>
    //     }
    // </div>
//   )
}

export default MemberUpdateName