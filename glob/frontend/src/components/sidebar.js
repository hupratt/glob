import React from "react";
import CategoryWidget from "./category";
import TagWidget from "./tag";
import ProfileWidget from "./profile";

const SideBar = () => {
  return (
    <div className="col-md-4">
      <ProfileWidget />
      <CategoryWidget />
      <TagWidget />
    </div>
  );
};

export default SideBar;
