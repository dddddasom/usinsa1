import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { UpdateFetchFn, fetchFn } from '../etc/NetworkUtils';

function MemberUpdatePassword() {

    const LOGINER = localStorage.getItem("LOGINER");
    const username = useParams().username;
    const passwordRef = useRef();


    useEffect(()=>{
        fetchFn("GET", `http://localhost:9007/api/member/name/${username}`, null)
        .then(data=>{
            if (LOGINER === data.result.username){
                passwordRef.current.focus()
            } else {
                window.location.href=`/`;
            }
           
        })
    },[username, LOGINER]);

    function onSubmitHandler(e){
        e.preventDefault();

        const formData = new FormData(e.target);
        const password = formData.get("password");
        const password2 = formData.get("password2");
        const orgPassword = formData.get("orgPassword");
        
        const dto = {
            username,
            password, 
            password2, 
            orgPassword
        }

        UpdateFetchFn("member/password", dto)
    }

  return (
    <div>
        <h2>비밀번호 수정</h2>
        <form action='#' onSubmit={onSubmitHandler}>
            username : <input value={username} readOnly/><br/>
            신규비번 : <input name='password' ref={passwordRef}/><br/>
            신규비번확인 : <input name='password2'/><br/>
            기존비번 : <input name='orgPassword'/><br/>
            <button>비밀번호 수정 완료</button>
        </form>
    </div>
  )
}

export default MemberUpdatePassword