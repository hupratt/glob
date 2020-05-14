import React from "react";
import Navigation from "./navigation";
import Footer from "./footer";
import PostContainer from "./post-container";
import SideBar from "./sidebar";

const BlogHome = (props) => {
  return (
    <div>
      <Navigation />
      <div className="container">
        <div className="row">
          <PostContainer {...props} />
          <SideBar />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogHome;
