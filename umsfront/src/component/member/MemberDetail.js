import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { fetchFn } from '../etc/NetworkUtils';
import { Button } from 'react-bootstrap';

function MemberDetail() {

    const username = useParams().username;
    const [member, setMember] = useState(null);
    const LOGINER = localStorage.getItem("LOGINER");
    const ROLE = localStorage.getItem("ROLE");

    useEffect(()=>{
        fetchFn("GET", `http://localhost:9007/api/member/name/${username}`, null)
        .then(data=>{

            if (ROLE === "1" || LOGINER === username){
                setMember(data.result);
              }
              else {
                window.location.href=`/`;
              }
        })
    },[username, LOGINER, ROLE])

  return (
    <div>
        <h2>회원 정보 자세히 보기</h2>
        {member !== null && <>
        <div className='member'>
            <p>username: {member.username}</p>
            <p>name: {member.name}</p>
            <p>가입일: {member.createDate}</p>
            <p>수정일: {member.updateDate}</p>
            <p>핸드폰 번호: {member.phoneNumber}</p>
            <p>주소: {member.address}</p>
            <p>키: {member.height}</p>
            <p>몸무게: {member.weight}</p>
        </div>
        <div>
            <Button variant="dark"><Link className='a' to={`/member/updateName/${username}`}>수정</Link></Button>&nbsp;
            <Button variant="dark"><Link className='a' to={`/member/delete/${username}`}>삭제</Link></Button>
        </div>
        </>
        }
    </div>
  )
}

export default MemberDetail