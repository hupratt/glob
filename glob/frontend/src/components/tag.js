import React from "react";

const renderTags = (posts) => {
  let elements = [];
  posts.map((post) => {
    post.string_tags &&
      post.string_tags.forEach((tag) => {
        elements.push(
          <a href="#">
            <span className="badge badge-secondary">{tag}</span>
          </a>
        );
      });
  });
  return elements;
};

const TagWidget = ({ posts }) => {
  return (
    <div className="card my-4">
      <h5 className="card-header">Tags</h5>
      <div className="card-body">{renderTags(posts)}</div>
    </div>
  );
};

export default TagWidget;
