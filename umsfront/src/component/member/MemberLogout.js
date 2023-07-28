import React from 'react'
import { useNavigate } from 'react-router-dom';


function MemberLogout() {
    localStorage.setItem("BTOKEN", null);
    localStorage.setItem("LOGINER", null);
    localStorage.setItem("ROLE", null);

    const navigate = useNavigate();

    navigate(-2)
    
  return (
    <div>

      로그아웃 되었습니다.
      <button onClick={() => { navigate(-1); }}>
        돌아가기
      </button>

    </div>
  )
}

export default MemberLogout