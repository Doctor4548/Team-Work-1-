import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


import { Store } from './app/store';
import { Provider } from 'react-redux';

import PostList from "./features/post/PostList"
import UserRegister from './features/users/UserRegister';
import UserLogin from './features/users/UserLogin';
import Header from './page/Header';

import Page from "./page/Page"

import ArticlePage from './features/post/ArticlePage';
import UserPosts from './features/post/UserPosts';

import Error from './page/Error';



import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';


const router=createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Header />} >
    <Route index element={<PostList />}/>
    <Route path="login" element={<UserLogin />} />
    <Route path='register' element={<UserRegister />}/>
    
    <Route path='userPage' element={<Page />} errorElement={<Error />}>
      <Route path=':username' element={<UserPosts />}/> 
    </Route>

    <Route path='page' element={<Page />} errorElement={<Error />} >
      <Route path=':id' element={<ArticlePage />}/>

    </Route>



  </Route>
))


function App(){
  return(
    <Provider store={Store}>
      <RouterProvider router={router} />
    </Provider>

  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);


