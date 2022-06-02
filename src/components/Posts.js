/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FaTimes, FaPencilAlt } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import {
  fetchPost, fetchPosts, createPost, deletePost,
} from '../actions/index';
import withRouter from './withRouter';

class Posts extends Component {
  componentDidMount() {
    this.props.fetchPosts();
    console.log('posts: ');
    console.log(this.props.posts);
  }

  handleDelete(id) {
    this.props.deletePost(id);
    console.log('posts: ');
    console.log(this.props.posts);
  }

  handleExpand(id) {
    this.props.navigate(`/posts/${id}`);
  }

  conditionalRender(postItems) {
    if (postItems.length > 0) {
      return (
        <div className="postsWrapper">
          <h1>Current Thoughts...</h1>
          <div className="posts">
            {postItems}
          </div>
        </div>
      );
    } else {
      return (
        <div className="posts">
          <h1>Current Thoughts...</h1>
          <p>No Thoughts Stored</p>
        </div>
      );
    }
  }

  // handleOpenPost(id) {
  //   this.props.navigate(`/posts/${id}`);
  // }
  // onClick={() => this.handleOpenPost(post.id)}
  render() {
    const postItems = Object.entries(this.props.posts).map(([id, post]) => (
      <div key={post.id} className="individualPost">
        <div className="postNav">
          <h3>{post.title}</h3>
          <div className="navIcons">
            <FaPencilAlt className="icon"
              style={{
                color: 'black',
                cursor: 'pointer',
              }}
              onClick={() => this.handleExpand(post.id)}
            />
            <FaTimes className="icon" // used this video to understand Icon usage, and a lot of REACT structure: https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=3342s&ab_channel=TraversyMedia
              style={{
                color: 'black',
                cursor: 'pointer',
              }}
              onClick={() => this.handleDelete(post.id)}
            />
          </div>
        </div>
        <img src={post.coverUrl} className="postImage" alt="no cover availible" />
        <ReactMarkdown>{post.tags}</ReactMarkdown>
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    ));
    console.log(this.props.posts);
    return (
      this.conditionalRender(postItems)
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts.allPosts,

});

export default withRouter(connect(mapStateToProps, { fetchPosts, deletePost })(Posts));
