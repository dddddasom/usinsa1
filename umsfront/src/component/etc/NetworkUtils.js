export function fetchFn(method, url, dto){
 
    const token = localStorage.getItem("BTOKEN");

    let options = {
        method: method,
        headers : {
            "Content-Type" : "application/json"
        }
    };

    if(token !== null && token.length > 0) {
        options.headers.Authorization = "Bearer "+token;
    }

    if(dto){
        options.body = JSON.stringify(dto);
    }

    return fetch(url, options)
    .then((response) => {

        if(response.status === 403){
            window.location.href = `/member/login`;
        }

        if(!response.ok){
            throw new Error("잘못된 접근입니다.");
        }
        return response.json();
    })
    .catch((error) => {
        alert(error.message);
    })
}


export function InsertFetchFn(servicename, dto){

    return fetchFn("POST", `http://localhost:9007/api/${servicename}`, dto)
    .then((data) => {
        if(data.result === undefined){
            return
        }

        if(servicename === "auth"){
            servicename = "member"
        }

        let what = `${data.result.id}`;

        if(servicename === "member"){
            what = data.result.username;
        } 

        if(servicename === "item"){
            what = data.result.id;
        }
       
        if(servicename === "reply"){
            servicename = "item"
            what = data.result.bid;
        }

        window.location.href = `/${servicename}/detail/${what}`;
    })  
}

export function UpdateFetchFn(servicename, dto){

    return fetchFn("PUT", `http://localhost:9007/api/${servicename}`, dto)
    .then((data) => {
        if(data.result === undefined){
            return
          }
        if(servicename === "member"){
            window.location.href = `/${servicename}/detail/${data.result.username}`;
        } else if (servicename === "item") {
            window.location.href = `/${servicename}/detail/${data.result.id}`;
        } else if (servicename === "reply") {
            servicename = "item"
            window.location.href = `/${servicename}/detail/${data.result.bid}`;
        } else if (servicename === "member/name") {
            window.location.href=`/member/detail/${data.result.username}`;
        } else if (servicename === "member/password") {
            if(data.result.username === undefined){
                alert("비밀번호가 잘못되었습니다.");
                return
              }
            window.location.href=`/member/detail/${data.result.username}`;
        }
    })
}

export function DeleteFetchFn(servicename, dto){

    return fetchFn("DELETE", `http://localhost:9007/api/${servicename}`, dto)
    .then((data) => {
        if(data.result === undefined){
            return
          }
      
        let what = `${data.result.id}`;

        if(servicename === "reply"){
            servicename = "item"
            what = data.result.bid;
            window.location.href = `/${servicename}/detail/${what}`;
        } else {
             window.location.href = `/${servicename}/list`;
        } 
    })
}

export function idCheckFetFn(username) {

    const url = new URL(`http://localhost:9007/api/auth/checkid?username=${username}`);

    let options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }

 
    return fetch(url, options)
        .then(res => {
            
            return res.json();
        })
}