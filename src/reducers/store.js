/* eslint-disable no-unused-vars */
import { configureStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from '@reduxjs/toolkit';
import rootReducer from './index';

const initialState = {};

const middleware = [thunk];

const store = configureStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware),
);

export default store;
