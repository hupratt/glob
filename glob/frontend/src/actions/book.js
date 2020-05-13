import axios from "axios";

import * as actionTypes from "./actionTypes";
import { bookDetailURL, endpoint } from "../constants";

export const fetchBook = (id, dataIsCached = false) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOADING_BOOK });
    console.log(`running axios to fetch book number ${id}`);
    axios
      .get(bookDetailURL(id))
      .then((res) => {
        dispatch({ type: actionTypes.FETCH_BOOK, data: res.data });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.FETCH_FAIL, error: err });
      });
  };
};

const updateBookFail = (error) => {
  return {
    type: actionTypes.UPDATEBOOK_FAIL,
    error: error,
  };
};

export const handleAddBook = (book, history, setUploadPercentage) => {
  return (dispatch) => {
    const formData = new FormData();

    for (var key in book) {
      if (book[key] !== undefined && key !== "picture") {
        formData.append(key, book[key]);
      }
    }
    axios
      .post(`${endpoint}/book/add/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Token " + localStorage.getItem("token"),
        },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        },
      })
      .then(
        dispatch({
          type: actionTypes.UPDATEBOOK_SUCCESS,
          success: true,
        })
      )
      .then(
        setTimeout(
          () =>
            dispatch({
              type: actionTypes.UPDATEBOOK_SUCCESS,
              success: false,
            }),
          2000
        )
      )
      .then((res) => {
        history.push(`/books/${res.data.id}/`);
      })
      .catch((err) => dispatch(updateBookFail(err.response.data)));
  };
};

export const addBookItem = (updatedBook, history) => {
  return (dispatch) => {
    const { id } = updatedBook;
    const formData = new FormData();
    formData.append("id", id);
    axios
      .post(`${endpoint}/bookitem/${id}/add/`, formData, {
        headers: {
          Authorization: "Token " + localStorage.getItem("token"),
        },
      })
      .then(
        dispatch({
          type: actionTypes.UPDATEBOOK_SUCCESS,
          success: true,
        })
      )
      .then(
        setTimeout(
          () =>
            dispatch({
              type: actionTypes.UPDATEBOOK_SUCCESS,
              success: false,
            }),
          2000
        )
      )
      .then((_) => {
        history.push(`/books/${id}/`);
      })
      .catch((err) => dispatch(updateBookFail(err.response.data)));
  };
};

export const deleteBookItem = (updatedBook, history) => {
  return (dispatch) => {
    const { book_quantity, id } = updatedBook;
    if (book_quantity.length > 0) {
      const randBookid = book_quantity[0].id;
      axios
        .delete(`${endpoint}/bookitem/${randBookid}/delete/`, {
          headers: {
            Authorization: "Token " + localStorage.getItem("token"),
          },
        })
        .then(
          dispatch({
            type: actionTypes.UPDATEBOOK_SUCCESS,
            success: true,
          })
        )
        .then(
          setTimeout(
            () =>
              dispatch({
                type: actionTypes.UPDATEBOOK_SUCCESS,
                success: false,
              }),
            1000
          )
        )
        .then((_) => {
          history.push(`/books/${id}/`);
        })
        .catch((err) => dispatch(updateBookFail(err.response.data)));
    }
  };
};

export const updateBook = (
  formData,
  setUploadPercentage,
  urlendpoint,
  history,
  book
) => {
  return (dispatch) => {
    axios
      .put(urlendpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Token " + localStorage.getItem("token"),
        },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        },
      })
      .then(
        dispatch({
          type: actionTypes.UPDATEBOOK_SUCCESS,
          success: true,
        })
      )
      .then(
        setTimeout(
          () =>
            dispatch({
              type: actionTypes.UPDATEBOOK_SUCCESS,
              success: false,
            }),
          100000
        )
      )
      .then((_) => {
        history.push(`/books/${book.id}/`);
      })
      .catch((err) => dispatch(updateBookFail(err.response.data)));
  };
};
