import './App.css';
import React from "react";

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainEx from './component/etc/MainEx';
import MyHeader from './component/etc/MyHeader';
import MemberLogin from './component/member/MemberLogin';
import MemberList from './component/member/MemberList';
import MemberInsert from './component/member/MemberInsert';
import MemberDelete from './component/member/MemberDelete';
import MemberDetail from './component/member/MemberDetail';
import ReplyUpdate from './component/reply/ReplyUpdate';
import EmptyPage from './component/etc/EmptyPage';
import ReplyInsert from './component/reply/ReplyInsert';
import ItemInsert from './component/item/ItemInsert';
import ItemDetail from './component/item/ItemDetail';
import ItemList from './component/item/ItemList';
import ItemListType from './component/item/ItemListType';
import ItemUpdate from './component/item/ItemUpdate';
import MemberUpdateName from './component/member/MemberUpdateName';
import MemberUpdatePassword from './component/member/MemberUpdatePassword';
import MemberLogout from './component/member/MemberLogout';
import ItemListOfStaff from './component/item/ItemListOfStaff';
import ItemSearchList from './component/item/ItemSearchList';



function App() {
  return (
    <div className="App">
      <header>
        <MyHeader/> 
      </header>

      <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' element={<MainEx/>}/>

          <Route path='/member/login' element={<MemberLogin/>}/>
          <Route path='/member/logout' element={<MemberLogout/>}/>
          <Route path='member/list' element={<MemberList/>}/>
          <Route path='member/detail/:username' element={<MemberDetail/>}/>
          <Route path='/member/insert' element={<MemberInsert/>}/>
          <Route path='/member/updateName/:username' element={<MemberUpdateName/>}/>
          <Route path='/member/updatePassword/:username' element={<MemberUpdatePassword/>}/>
          <Route path='/member/delete/:username' element={<MemberDelete/>}/>

          <Route path='/item/insert' element={<ItemInsert/>} />
          <Route path='/item/detail/:id' element={<ItemDetail/>} />
          <Route path='/item/list/itemType/:itemType' element={<ItemListType/>} />
          <Route path='/item/list/username/:username' element={<ItemListOfStaff/>} />
          <Route path='/item/list' element={<ItemList/>} />
          <Route path='/item/update/:id' element={<ItemUpdate/>} />
          <Route path='/item/search/:keyword' element={<ItemSearchList/>} />

          <Route path='/reply/update/:id' element={<ReplyUpdate/>}/>
          <Route path='/reply/insert' element={<ReplyInsert/>}/>

          <Route path='/*' element={<EmptyPage/>}/>
        </Routes>
      </div>
      </BrowserRouter>
        
 

    </div>
  );
}

export default App;
