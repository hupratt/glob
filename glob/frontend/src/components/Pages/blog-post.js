import React from "react";
import Navigation from "../Elements/navigation";
import Footer from "../Elements/footer";
import SideBar from "../Elements/sidebar";

const PostDetail = ({ post }) => {
  if (post) {
    return (
      <div className="col-md-8">
        <img src={post.header_image_url.url} className="img-fluid rounded" />
        <hr />
        <h1>{post.title}</h1>
        <hr />
        <div dangerouslySetInnerHTML={{ __html: post.md_body }} />
      </div>
    );
  } else {
    return <div className="col-md-8">Loading...</div>;
  }
};

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
