import '../style.scss';
import {
  BrowserRouter, Routes, Route, NavLink,
} from 'react-router-dom';
// import { createRoot } from 'react-dom/client';
import React from 'react';
import NewPost from './NewPost';
import Posts from './Posts';
import Post from './Post';
// store from '../reducers/store';

// Followed a lot of this video in constructing my first files for this lab and understanding how redux work. https://www.youtube.com/watch?v=93p3LxR9xfM&t=1230s.
// Its code basically pervades all of my files, and has influenced my reducers, actions, store, etc.
export default function App(props) {
  return (
    <div className="here">
      <h1>Mind Palace</h1>
      <BrowserRouter>
        <Nav />
        <Routes className="routeButtons">
          <Route path="/" element={<Posts />} />
          <Route path="/posts/new" element={<NewPost />} />
          <Route path="/posts/:postID" element={<Post />} />
          <Route path="*" element={<FallBack />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function Nav(props) {
  return (
    <nav>
      <ul>
        <li><NavLink className="active" to="/" exact>Thoughts</NavLink></li>
        <li><NavLink className="active" to="/posts/new">Add a Thought</NavLink></li>
        <li><NavLink className="active" to="posts/:postID">Past Thoughts</NavLink></li>
      </ul>
    </nav>
  );
}

function FallBack(props) {
  return <h2>URL Not Found</h2>;
}

// function Post(props) {
//   const { id } = useParams();
//   return <div> ID: {id} </div>;
// }
