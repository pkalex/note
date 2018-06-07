import {
  ADD_NOTE,
  GET_NOTES,
  GET_NOTE,
  DELETE_NOTE,
  NOTE_LOADING
} from "../actions/types";

const initialState = {
  notes: [],
  note: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case NOTE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_NOTES:
      return {
        ...state,
        notes: action.payload,
        loading: false
      };
    case GET_NOTE:
      return {
        ...state,
        note: action.payload,
        loading: false
      };
    case ADD_NOTE:
      return {
        ...state,
        notes: [action.payload, ...state.notes]
      };
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter(note => note._id !== action.payload)
      };
    default:
      return state;
  }
}
