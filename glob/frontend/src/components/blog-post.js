import React from "react";
import Navigation from "./navigation";
import Footer from "./footer";
import SideBar from "./sidebar";
import PostDetail from "./post-detail";

const BlogPost = (props) => {
  return (
    <div>
      <Navigation />
      <div className="container">
        <div className="row">
          <PostDetail {...props} />
          <SideBar />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPost;
