import React from 'react'
import { useParams } from 'react-router-dom';
import { InsertFetchFn } from '../etc/NetworkUtils';

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';

function ReplyInsert() {

    const username = localStorage.getItem("LOGINER");
    const bid = useParams().id;

    function onSubmitHandler(e){
        e.preventDefault();

        const formData = new FormData(e.target);
        const dto = {
        content: formData.get("content"),
        username,
        bid
        }

        InsertFetchFn("reply", dto);

    }

  return (
    <div>
      <form action='#' onSubmit={onSubmitHandler}>
  <div style={{ display: 'flex', justifyContent: 'center',  height: '10%' }}>
    <div style={{ width: '600px', display: 'flex' }}>
      <div style={{ flexBasis: '80%' }}>
        <FloatingLabel controlId="floatingTextarea2" label="Comments">
          <Form.Control 
            name='content'
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: '100px', marginTop: '10px', textAlign: 'center' }}
          />
        </FloatingLabel> 
      </div>
      <div style={{ flexBasis: '15%', marginTop: '10px', marginLeft: '10px'}}>
        <Button type="submit" variant="dark" style={{ height: '100px', width: '100%' }}>작성하기</Button>
      </div>
    </div>
  </div>
</form>

    </div>
  )
}

export default ReplyInsert


// import React from 'react'
// import { useParams } from 'react-router-dom';
// import { InsertFetchFn } from '../etc/NetworkUtils';

// function ReplyInsert() {

//     const username = localStorage.getItem("LOGINER");
//     const bid = useParams().id;

//     function onSubmitHandler(e){
//         e.preventDefault();

//         const formData = new FormData(e.target);
//         const dto = {
//         content: formData.get("content"),
//         username,
//         bid
//         }

//         InsertFetchFn("reply", dto);

//     }

//   return (
//     <div>
//         <form action='#' onSubmit={onSubmitHandler}>
//             내용 <input name='content'/>
//             <button>작성</button>
//         </form>


//     </div>
//   )
// }

// export default ReplyInsert