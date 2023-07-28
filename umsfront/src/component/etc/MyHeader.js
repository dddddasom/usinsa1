import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { fetchFn } from './NetworkUtils';


function MyHeader() {

    const LOGINER = localStorage.getItem("LOGINER");
    const ROLE = localStorage.getItem("ROLE");

    // const [keyword, setKeyword] = useState('');
    // const [searchResults, setSearchResults] = useState([]);

    const [keyword, setKeyword] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // function searchHandler(){

    //   fetchFn('GET', `http://localhost:9007/api/item/search/${keyword}`, null)
    //   .then((data) => {

    //     setSearchResults(data.result);
    //     window.location.href = `/item/serach/${keyword}`;
    //   });
    // }

    function searchHandler() {
      fetchFn('GET', `http://localhost:9007/api/item/search/${keyword}`, null)
        .then(data => {
          setSearchResults(data.result);
          window.location.href = `/item/search/${keyword}`;
        });
    }

  return (
    <div> {
    
    <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="/">USINSA</Navbar.Brand>
    <Nav className="me-auto">
        <Nav.Link href="/item/list">게시판</Nav.Link>
       
       {
        ROLE === "1" ?
        <Nav.Link href="/member/list">회원 목록</Nav.Link>
        : <></>
       }

      {  LOGINER === "null" ?
        <>
        <Nav.Link href="/member/login">로그인</Nav.Link>
        <Nav.Link href="/member/insert">회원가입</Nav.Link>
        </>
        : 
        <>
        <Nav.Link href={`/member/detail/${LOGINER}`}>내정보</Nav.Link>
        <Nav.Link href="/member/logout">로그아웃</Nav.Link>
        </>
        
    }
    </Nav>
    </Container>

    {/* <div className="d-flex">
      <input 
      className="form-control me-2"
      type="search"
      placeholder="상품을 입력하세요"
      value={keyword}
      onChange={e => setKeyword(e.target.value)}
      />

      <button className='btn btn-outline-success' onClick={searchHandler}>검색</button>
   
    </div> */}

<div className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="상품을 입력하세요"
                  value={keyword}
                  onChange={e => setKeyword(e.target.value)}
                />
                <button className="btn btn-outline-success" onClick={searchHandler}>검색</button>
            </div>
</Navbar>



    }



    </div>
  

  )
}

export default MyHeader;