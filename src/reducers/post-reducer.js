/* eslint-disable default-param-last */
// import { connect } from 'react-redux';
import { ActionTypes } from '../actions/index';
// import state from '../state';

// FETCH_POSTS: 'FETCH_POSTS',
// FETCH_POST: 'FETCH_POST',
// UPDATE_POST: 'UPDATE_POST',
// CREATE_POST: 'CREATE_POST',
// DELETE_POST: 'DELETE_POST',
const initialState = {
  allPosts: [],
  currPost: {},
};

function postReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.FETCH_POSTS:
      console.log('fetchPosts_reducer');
      return {
        ...state,
        allPosts: action.payload,
      };
    case ActionTypes.FETCH_POST:
      console.log('fetchPost_reducer');
      return {
        ...state,
        currPost: action.payload,
      };
    case ActionTypes.CREATE_POST:
      console.log('createPosts_reducer');
      return {
        ...state,
        allPosts: action.payload,
      };
    case ActionTypes.DELETE_POST:
      console.log('deletePosts_reducer');
      return {
        ...state,
        // allPosts: action.payload,
      };
    case ActionTypes.UPDATE_POST:
      console.log('createPosts_reducer');
      return {
        ...state,
        currPost: action.payload,
      };
    default:
      return state;
  }
}
export default postReducer;
