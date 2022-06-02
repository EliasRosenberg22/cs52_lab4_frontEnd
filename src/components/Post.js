/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-unused-class-component-methods */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FaTimes, FaPencilAlt } from 'react-icons/fa';
// import ReactMarkdown from 'react-markdown';
import {
  // eslint-disable-next-line no-unused-vars
  fetchPost, fetchPosts, createPost, deletePost, updatePost,
} from '../actions/index';
import withRouter from './withRouter';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      title: '',
      tags: '',
      content: '',
      coverUrl: '',

    };
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onBodyChange = this.onBodyChange.bind(this);
    this.onUrlChange = this.onUrlChange.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }

  componentDidMount() {
    const id = this.props.params.postID;
    this.props.fetchPost(id);
  }

  handleDelete(id) {
    this.props.deletePost(id);
    this.props.navigate('/');
  }

  onTitleChange = (event) => {
    this.setState({ title: event.target.value });
    console.log(this.state.title);
  };

  onTagsChange = (event) => {
    this.setState({ tags: event.target.value });
  };

  onBodyChange = (event) => {
    this.setState({ content: event.target.value });
  };

  onUrlChange = (event) => {
    this.setState({ coverUrl: event.target.value });
    console.log(this.state.coverUrl);
  };

  handleEdit = (event) => {
    this.switchEditingMode();
    this.setState({ [event.target.name]: event.target.value });
  };

  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onEdit() {
    const fields = {
      title: this.state.title,
      tags: this.state.tags,
      content: this.state.content,
      coverUrl: this.state.coverUrl,
    };
    this.props.updatePost(fields, this.props.params.postID);
    this.setState({ isEditing: false });
  }

  switchEditingMode() {
    this.setState(() => {
      return {
        // eslint-disable-next-line react/no-access-state-in-setstate
        isEditing: !this.state.isEditing,
      };
    });
    console.log('editing switched!');
    console.log(this.state.isEditing);
  }

  renderSomeSection() {
    if (this.state.isEditing) { // figure out some way to set the note text to the updated text
      return (
        <div>
          <FaPencilAlt className="icon"
            style={{
              color: 'black',
              cursor: 'pointer',
            }}
            onClick={() => this.handleEdit()}
          />
          <FaTimes className="icon" // used this video to understand Icon usage, and a lot of REACT structure: https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=3342s&ab_channel=TraversyMedia
            style={{
              color: 'black',
              cursor: 'pointer',
            }}
            onClick={() => this.handleDelete(this.props.state.id)}
          />
          <form className="addNewPost" onSubmit={this.onSubmit}>
            <h2>Title</h2>
            <input className="titleInput" maxLength={80} onChange={this.onTitleChange} value={this.state.title} />

            <h2>Tags</h2>
            <input className="tagsInput" maxLength={40} onChange={this.onTagsChange} value={this.state.tags} />

            <h2>Text</h2>
            <textarea onChange={this.onBodyChange} value={this.state.content} />

            <h2>Cover Image URL</h2>
            <input className="coverImageURLInput" onChange={this.onUrlChange} value={this.state.coverUrl} />

            <button type="button" className="postSubmit" onClick={this.onEdit}>Submit Changes</button>
            <button type="button" className="postSubmit" onClick={() => this.props.navigate('/')}>back</button>
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <FaPencilAlt className="icon"
            style={{
              color: 'black',
              cursor: 'pointer',
            }}
            onClick={() => this.handleEdit()}
          />
          <FaTimes className="icon" // used this video to understand Icon usage, and a lot of REACT structure: https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=3342s&ab_channel=TraversyMedia
            style={{
              color: 'black',
              cursor: 'pointer',
            }}
            onClick={() => this.handleDelete(this.props.state.id)}
          />
          <h2>Title</h2>
          <input className="titleInput" value={this.props.post.title} />

          <h2>Tags</h2>
          <input className="tagsInput" value={this.props.post.tags} />

          <h2>Text</h2>
          <textarea value={this.props.post.content} />

          <h2>Cover Image URL</h2>
          <img src={this.props.post.coverUrl} alt="none stored" width={400} height={400} />
          <button type="button" className="postSubmit" onClick={() => this.props.navigate('/')}>back</button>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderSomeSection()}
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  post: state.posts.currPost,
});

export default withRouter(connect(mapStateToProps, {
  fetchPosts, deletePost, fetchPost, updatePost,
})(Post));
