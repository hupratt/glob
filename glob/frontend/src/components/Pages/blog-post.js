import React from "react";
import Navigation from "../Elements/navigation";
import Footer from "../Elements/footer";
import SideBar from "../Elements/sidebar";
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
