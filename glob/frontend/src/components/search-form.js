import React from "react";

const SearchForm = () => {
  return (
    <div className="card my-4">
      <h5 className="card-header">Search</h5>
      <div className="card-body">
        <form
          role="search"
          method="get"
          className="form-search"
          action="/blog/search/"
          _lpchecked="1"
        >
          <div className="input-group">
            <input
              type="text"
              className="form-control search-query"
              name="q"
              placeholder="Search…"
              title="Search for:"
            />
            <span className="input-group-btn">
              <button className="btn btn-secondary" type="button">
                Go!
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;
