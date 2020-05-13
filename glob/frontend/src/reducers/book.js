import { updateObject } from "./utility";
import * as actionTypes from "../actions/actionTypes";

const initState = {
  loading: false,
  error: null,
  book: {},
  data: [],
  dataIsCached: false,
  success: false,
};

const fetchItemsSuccess = (state, action) => {
  return updateObject(state, {
    data: action.data,
    error: null,
    loading: false,
  });
};

const fetchBookLocally = (state, action) => {
  return updateObject(state, {
    book: state.data.find((post) => post.id == action.bookID),
    loading: false,
    dataIsCached: true,
  });
};
const fetchBook = (state, action) => {
  return updateObject(state, {
    book: action.data,
    error: null,
    loading: false,
    dataIsCached: true,
  });
};

const loading = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const fetchItemsFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const updateBookFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const updateSuccess = (state, action) => {
  return updateObject(state, {
    success: action.success,
  });
};
const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.LOADING_BOOK:
      return loading(state, action);
    case actionTypes.FETCH_FAIL:
      return fetchItemsFail(state, action);
    case actionTypes.FETCH_SUCCESS:
      return fetchItemsSuccess(state, action);
    case actionTypes.FETCH_BOOK_LOCAL:
      return fetchBookLocally(state, action);
    case actionTypes.FETCH_BOOK:
      return fetchBook(state, action);
    case actionTypes.UPDATEBOOK_FAIL:
      return updateBookFail(state, action);
    case actionTypes.UPDATEBOOK_SUCCESS:
      return updateSuccess(state, action);

    default:
      return state;
  }
};

export default reducer;
