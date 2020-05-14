import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CategoryWidget = ({ posts }) => {
  return (
    <div className="card my-4">
      <h5 className="card-header">Categories</h5>
      <div className="card-body">
        <div className="row">
          <div className="col-lg-12">
            <ul className="list-unstyled mb-0">
              {/* {posts.map((category) => (
                <li>
                  <Link to={`/category/${category.slug}`}>{category.name}</Link>
                </li>
              ))} */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryWidget;
