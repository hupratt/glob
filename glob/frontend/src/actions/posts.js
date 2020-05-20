import axios from "axios";
import * as actionTypes from "./actionTypes";

export const fetchPosts = (url_endpoint, lang) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOADING_FETCH_POSTS });
    console.log("running axios to fetch first the blog posts", lang);
    axios
      .request({
        url: url_endpoint,
        method: "get",
        headers: { "django-language": lang },
      })
      .then((res) => {
        dispatch({
          type: actionTypes.FETCH_POSTS_SUCCESS,
          data: Object.values(res.data.results),
          length: res.data.count,
        });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.FETCH_POSTS_FAIL, error: err });
      });
  };
};

// export const onSelectRadio = (event) => {
//   return (dispatch) => {
//     console.log(`language ${event.currentTarget.value} selected`);
//     dispatch({
//       type: actionTypes.RADIO_BUTTON_CLICK,
//       language: event.currentTarget.value,
//     });
//   };
// };

// export const onPageChange = (pageNumber) => {
//   return (dispatch) => {
//     console.log(`${pageNumber} was called`);
//     dispatch({ type: actionTypes.PAGE_CHANGED, currentPage: pageNumber });
//   };
// };

// export const loadmoar = (url_endpoint, bookPerPage, offset) => {
//   return (dispatch) => {
//     dispatch({ type: actionTypes.LOADING_MORE_BOOKS });
//     axios
//       .get(url_endpoint)
//       .then((res) => {
//         dispatch({
//           type: actionTypes.LOAD_MORE,
//           data: Object.values(res.data.results),
//           offset: offset,
//           bookPerPage: bookPerPage,
//         });
//       })
//       .catch((err) => {
//         dispatch({ type: actionTypes.FETCH_FAIL, error: err });
//       });
//   };
// };
