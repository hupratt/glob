import React from "react";
import CategoryWidget from "./category";
import TagWidget from "./tag";
import ProfileWidget from "./profile";

const SideBar = ({ posts }) => {
  return (
    <div className="col-md-4">
      <ProfileWidget />
      <CategoryWidget posts={posts} />
      <TagWidget posts={posts} />
    </div>
  );
};

export default SideBar;
