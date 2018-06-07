import axios from "axios";

import {
  ADD_NOTE,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_NOTES,
  GET_NOTE,
  NOTE_LOADING,
  DELETE_NOTE
} from "./types";

// Add Note
export const addNote = noteData => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/notes", noteData)
    .then(res =>
      dispatch({
        type: ADD_NOTE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Notes
export const getNotes = () => dispatch => {
  dispatch(setNoteLoading());
  axios
    .get("/api/notes")
    .then(res =>
      dispatch({
        type: GET_NOTES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_NOTES,
        payload: null
      })
    );
};

// Get Note
export const getNote = id => dispatch => {
  dispatch(setNoteLoading());
  axios
    .get(`/api/notes/${id}`)
    .then(res =>
      dispatch({
        type: GET_NOTE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_NOTE,
        payload: null
      })
    );
};

// Delete Note
export const deleteNote = id => dispatch => {
  axios
    .delete(`/api/notes/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_NOTE,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Like
export const addLike = id => dispatch => {
  axios
    .post(`/api/notes/like/${id}`)
    .then(res => dispatch(getNotes()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Remove Like
export const removeLike = id => dispatch => {
  axios
    .post(`/api/notes/unlike/${id}`)
    .then(res => dispatch(getNotes()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Comment
export const addComment = (noteId, commentData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/notes/comment/${noteId}`, commentData)
    .then(res =>
      dispatch({
        type: GET_NOTE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Comment
export const deleteComment = (noteId, commentId) => dispatch => {
  axios
    .delete(`/api/notes/comment/${noteId}/${commentId}`)
    .then(res =>
      dispatch({
        type: GET_NOTE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set loading state
export const setNoteLoading = () => {
  return {
    type: NOTE_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
