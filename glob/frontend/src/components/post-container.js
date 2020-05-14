import React from "react";
import PostIntroCard from "./post-intro-card";

const PostContainer = ({ posts, pageCount, getPage }) => {
  return (
    <div className="col-md-8">
      {posts.map((post) => (
        <PostIntroCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostContainer;
