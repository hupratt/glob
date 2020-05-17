import React from "react";
import CategoryWidget from "./category";
import TagWidget from "./tag";
import ProfileWidget from "./profile";
import "./sidebar.css";

const SideBar = ({ categories, tags, clearFilters }) => {
  return (
    <div className="col-md-4 blog-sidebar">
      <ProfileWidget />
      <CategoryWidget categories={categories} />
      <TagWidget tags={tags} clearFilters={clearFilters} />
    </div>
  );
};

export default SideBar;
