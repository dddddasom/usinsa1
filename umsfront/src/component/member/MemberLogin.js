import React from 'react'
import { fetchFn } from '../etc/NetworkUtils';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, Container, Row } from 'react-bootstrap';

function MemberLogin() {
    localStorage.setItem("BTOKEN", null);

    function onSubmitHandler(e){

        e.preventDefault();

        const formData = new FormData(e.target);
        const username = formData.get("username");
        const password = formData.get("password")

        const dto = {
            username, 
            password
        }

        fetchFn("POST", "http://localhost:9007/api/auth/login", dto)
        .then((data)=>{
            localStorage.setItem("BTOKEN", data.result.token);
            localStorage.setItem("LOGINER", data.result.username);
            localStorage.setItem("ROLE", data.result.role);
            window.location.href="/";
        });
    }

  return (
    <div>
        <h2>로그인</h2>
        <Container>
    <Row className="justify-content-center">
      <Col md={2}>
    <Form onSubmit={onSubmitHandler}>

      <Form.Group className="mb-3" controlId="formBasicEmail1">
        <Form.Label>아이디</Form.Label>
        <Col sm={40}> 
        <Form.Control name="username" />
        </Col>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail2">
        <Form.Label>비밀번호</Form.Label>
        <Col sm={40}> 
        <Form.Control type='password' name="password"/>
        </Col>
      </Form.Group>

      <Button variant="dark" type="submit">
        로그인
      </Button>
    </Form>
    </Col>
    </Row>
    </Container>
        {/* <form action='#' onSubmit={onSubmitHandler}>
            아이디 : <input name='username'/><br/>
            비밀번호 : <input type='password' name='password'/><br/>
            <button>로그인</button>
        </form> */}
    </div>
  )
}

export default MemberLogin