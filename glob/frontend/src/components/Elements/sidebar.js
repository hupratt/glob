import React from "react";
import CategoryWidget from "./category";
import TagWidget from "./tag";
import ProfileWidget from "./profile";
import "./sidebar.css";

const SideBar = ({ categories, tags, clearFilters }) => {
  return (
    <div className="col-md-4 blog-sidebar">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarResponsive"
        aria-controls="navbarResponsive"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span>
          <i class="fas fa-times"></i>
        </span>
      </button>
      <ProfileWidget />
      <CategoryWidget categories={categories} />
      <TagWidget tags={tags} clearFilters={clearFilters} />
    </div>
  );
};

export default SideBar;
