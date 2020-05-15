import React from "react";
import { Link } from "react-router-dom";

const renderCategories = (categories) => {
  let cats = [];

  categories.map((category) =>
    cats.push(
      <li key={category.slug}>
        <Link to={`/category/${category.slug}`}>{category.name}</Link>
      </li>
    )
  );
  return cats;
};

const CategoryWidget = ({ categories }) => {
  if (categories) {
    return (
      <div className="card my-4">
        <h5 className="card-header">Categories</h5>
        <div className="card-body">
          <div className="row">
            <div className="col-lg-12">
              <ul className="list-unstyled mb-0">
                {renderCategories(categories)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div className="loading">loading</div>;
  }
};

export default CategoryWidget;
