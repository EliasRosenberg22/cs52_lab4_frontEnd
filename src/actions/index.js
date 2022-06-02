import axios from 'axios';

// keys for actiontypes
export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  UPDATE_POST: 'UPDATE_POST',
  CREATE_POST: 'CREATE_POST',
  DELETE_POST: 'DELETE_POST',
};

const ROOT_URL = 'https://platform.cs52.me/api';
const API_KEY = '?key=e_rosenberg';

export function fetchPosts() {
  console.log('fetching from index.js');
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts${API_KEY}`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_POSTS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function createPost(fields, navigate) {
  console.log('fields');
  console.log(fields);
  return (dispatch) => {
    axios.post(`${ROOT_URL}/posts${API_KEY}`, fields)
      .then((response) => {
        console.log(`sending data: ${response.data}`);
        dispatch({ type: ActionTypes.CREATE_POST, payload: response.data });
        console.log('data sent!');
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function updatePost(fields, id) {
  console.log('fields');
  console.log(fields);
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${id}?key=${API_KEY}`, fields)
      .then((response) => {
        console.log(`sending data: ${response.data}`);
        console.log(response.data);
        dispatch({ type: ActionTypes.UPDATE_POST, payload: response.data });
        console.log('post updated!');
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function fetchPost(id) {
  console.log('fetching a specific post');
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}?key=${API_KEY}`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function deletePost(id, navigate) {
  console.log('current id');
  console.log(id);
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}?key=${API_KEY}`)
      .then((response) => {
        console.log('deleting post: ');
        console.log(response.data);
        dispatch({ type: ActionTypes.DELETE_POST, payload: response.data });
      }).then(() => axios.get(`${ROOT_URL}/posts${API_KEY}`))
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_POSTS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
        console.log(error);
      });
  };
}
