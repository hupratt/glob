import React from "react";
import { Link } from "react-router-dom";
import { postListURL } from "../../constants";

const renderTags = (taglist) => {
  let elements = [];
  taglist.map((blogpost) => {
    blogpost.tags.forEach((tag) => {
      console.log("tag.slug", tag.slug);
      let endpoint = postListURL(0, "", "", "", "", "", tag.slug);
      endpoint = endpoint.slice(endpoint.indexOf("?limit"), endpoint.length);
      elements.push(
        <Link to={endpoint} key={tag.slug}>
          <span className="badge badge-secondary">{tag.name}</span>
        </Link>
      );
    });
  });
  return elements;
};

const TagWidget = ({ tags, clearFilters }) => {
  return (
    <div className="card my-4">
      <h5 className="card-header">Tags</h5>
      <div className="card-body">{renderTags(tags)}</div>
      <button className="btn" onClick={() => clearFilters()}>
        Clear filters
      </button>
    </div>
  );
};

export default TagWidget;
