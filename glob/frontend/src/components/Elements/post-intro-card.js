import React from "react";

import { Link } from "react-router-dom";

const renderPost = (post) => {
  return (
    <div className="card mb-4">
      <Link to={`/post/${post.id}`}>
        <img src={post.get_image} className="card-img-top" />
      </Link>
      <div className="card-body">
        <h2 className="card-title">
          <Link to={`/post/${post.id}`}>{post.title}</Link>
        </h2>
        <p
          className="card-text"
          dangerouslySetInnerHTML={{ __html: post.md_excerpt }}
        />
        <Link to={`/post/${post.id}`} className="btn btn-primary">
          Read More →
        </Link>
      </div>
      <div className="card-footer text-muted">Posted on {post.pub_date}</div>
    </div>
  );
};

const PostIntroCard = ({ post }) => {
  if (post) {
    return renderPost(post);
  } else {
    return <div className="card mb-4"></div>;
  }
};

export default PostIntroCard;
