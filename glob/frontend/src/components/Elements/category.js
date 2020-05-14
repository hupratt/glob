import React from "react";
import { Link } from "react-router-dom";

const CategoryWidget = ({ categories }) => {
  return (
    <div className="card my-4">
      <h5 className="card-header">Categories</h5>
      <div className="card-body">
        <div className="row">
          <div className="col-lg-12">
            <ul className="list-unstyled mb-0">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link to={`/category/${category.slug}`}>{category.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryWidget;
