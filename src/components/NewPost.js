/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
// import { connect } from 'react-redux';

// import {actions needed for this component} from from '../actions';

/* eslint-disable no-unused-vars */
/* eslint-disable react/prefer-stateless-function */
import { connect } from 'react-redux';
import { fetchPost, fetchPosts, createPost } from '../actions/index';
import withRouter from './withRouter';

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      tags: '',
      content: '',
      url: '',
    };
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onBodyChange = this.onBodyChange.bind(this);
    this.onUrlChange = this.onUrlChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onTitleChange = (event) => {
    this.setState({ title: event.target.value });
  };

  onTagsChange = (event) => {
    this.setState({ tags: event.target.value });
  };

  onBodyChange = (event) => {
    this.setState({ content: event.target.value });
  };

  onUrlChange = (event) => {
    this.setState({ url: event.target.value });
  };

  onSubmit(event) {
    event.preventDefault();

    const post = {
      title: this.state.title,
      tags: this.state.tags,
      content: this.state.content,
      coverUrl: this.state.url,
    };

    this.props.createPost(post);
    console.log('post: ');
    console.log(post);
  }

  render() {
    return (
      <div className="formBody">
        <form className="addNewPost" onSubmit={this.onSubmit}>
          <h2>Title</h2>
          <input className="titleInput" maxLength={80} onChange={this.onTitleChange} value={this.state.title} />

          <h2>Tags</h2>
          <input className="tagsInput" maxLength={40} onChange={this.onTagsChange} value={this.state.tags} />

          <h2>Text</h2>
          <textarea onChange={this.onBodyChange} value={this.state.content} />

          <h2>Cover Image URL</h2>
          <input className="coverImageURLInput" onChange={this.onUrlChange} value={this.state.url} />

          <button type="button" className="postSubmit" onClick={this.onSubmit}>Submit your post!</button>
          <button type="button" className="postSubmit" onClick={() => this.props.navigate('/')}>back</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts.allPosts,

});

export default withRouter(connect(mapStateToProps, { createPost })(NewPost));

// // note how here we leave the first argument null, we don't need to connect any state just actions
// export default connect(null, {})(addNewPost);
