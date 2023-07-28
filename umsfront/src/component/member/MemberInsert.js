import React, { useState } from 'react'
import { fetchFn, idCheckFetFn } from '../etc/NetworkUtils';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Col, Container, Row } from 'react-bootstrap';

function MemberInsert() {
    localStorage.setItem("BTOKEN", null);
    const [idCheckResult, setIdCheckResult] = useState('');

    const [checked, setChecked] = useState(false);

    function onSubmitHandler(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const dto = {
            username : formData.get("username"),
            name : formData.get("name"),
            password : formData.get("password"),
            password2 : formData.get("password2"),
            role: formData.get("radio")
        }

        fetchFn("POST", "http://localhost:9007/api/auth/insert", dto)
        .then(data=>{
            console.log(data.result);
            window.location.href=`/member/login`;
        })
    }

    function onChangeHandler(e) {
        const username = e.target.value;
        if (username !== "") {
            idCheckFetFn(username)
                .then(data => {
                    setIdCheckResult(data.result)
                }) 
        }else{
            setIdCheckResult("");
        }
    }

  return (
    <div>
    <h2>회원 가입</h2>
    <Container>
    <Row className="justify-content-center">
      <Col md={2}>
      <Form onSubmit={onSubmitHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail1">

        <Form.Label>아이디</Form.Label>
        <Col sm={40}> 
        <Form.Control name="username" onChange={onChangeHandler} />
        </Col>
        <Form.Text className="text-muted">
          {idCheckResult}
          </Form.Text>
        </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail2">
        <Form.Label >이름</Form.Label>
        <Col sm={40}  className="d-flex justify-content-center">
        <Form.Control  name="name"/>
        </Col>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword1">
        <Form.Label>비밀번호</Form.Label>
        <Col sm={40}>
        <Form.Control type="password" name='password' />
        </Col>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword2">
        <Form.Label>비밀번호2</Form.Label>
        <Col sm={40}>
        <Form.Control type="password" name='password2' />
        </Col>
      </Form.Group>

      <Button variant="dark" type="submit">
        회원가입
      </Button>
      <ToggleButton
         name='radio'
         className="mb-2"
         id="toggle-check"
         type="checkbox"
         variant="outline-primary"
         checked={checked}
         value="2"
         onChange={(e) => setChecked(e.currentTarget.checked)}
       >
         기업 회원 가입
       </ToggleButton>
       <br />

      </Form>
    </Col>
    </Row>
    </Container>


</div>
    // <div>
    //     <h2>회원 가입</h2>
    //     <form action='#' onSubmit={onSubmitHandler}>
        
    //         아이디 : <input name='username' onChange={onChangeHandler}/> {idCheckResult}<br/>
    //         이름 : <input name='name'/><br/>
    //         비밀번호 : <input name='password'/><br/>
    //         비밀번호2 : <input name='password2'/><br/>
    //         <button>회원가입</button><br/>

    //   <ToggleButton
    //     name='radio'
    //     className="mb-2"
    //     id="toggle-check"
    //     type="checkbox"
    //     variant="outline-primary"
    //     checked={checked}
    //     value="2"
    //     onChange={(e) => setChecked(e.currentTarget.checked)}
    //   >
    //     기업 회원 가입
    //   </ToggleButton>
    //   <br />
            
    //     </form>


    
    // </div>
  )
}

export default MemberInsert