import React from "react";
import CategoryWidget from "./category";
import TagWidget from "./tag";
import ProfileWidget from "./profile";

const SideBar = ({ categories, tags }) => {
  return (
    <div className="col-md-4">
      <ProfileWidget />
      <CategoryWidget categories={categories} />
      <TagWidget tags={tags} />
    </div>
  );
};

export default SideBar;