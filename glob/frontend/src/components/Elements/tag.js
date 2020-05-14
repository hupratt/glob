import React from "react";

const renderTags = (taglist) => {
  let elements = [];
  taglist.map((tag) => {
    elements.push(
      <a href="#" key={tag.slug}>
        <span className="badge badge-secondary">{tag.name}</span>
      </a>
    );
  });
  return elements;
};

const TagWidget = ({ tags }) => {
  return (
    <div className="card my-4">
      <h5 className="card-header">Tags</h5>
      <div className="card-body">{renderTags(tags)}</div>
    </div>
  );
};

export default TagWidget;
