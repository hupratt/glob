import React from "react";
import Navigation from "./navigation";
import Footer from "./footer";
import PostContainer from "./post-container";
import SideBar from "./sidebar";
import { fetchPosts } from "../actions/posts";
import { fetchCategories } from "../actions/categories";
import { fetchTags } from "../actions/tags";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { postListURL, categoryListURL, tagsListURL } from "../constants";

class BlogHome extends React.Component {
  componentDidMount() {
    this.fetchStuff();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.location.search !== this.props.location.search ||
      prevProps.location.pathname !== this.props.location.pathname
    ) {
      this.fetchStuff();
    }
  }
  fetchStuff = () => {
    this.props.fetchPosts(postListURL());
    this.props.fetchCategories(tagsListURL);
    this.props.fetchTags(categoryListURL);
  };
  render() {
    const { posts, pageCount, tags, categories } = this.props;
    return (
      <div>
        <Navigation />
        <div className="container">
          <div className="row">
            <PostContainer posts={posts} pageCount={pageCount} />
            <SideBar categories={categories} tags={tags} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: (url_endpoint) => dispatch(fetchPosts(url_endpoint)),
    fetchCategories: (url_endpoint) => dispatch(fetchCategories(url_endpoint)),
    fetchTags: (url_endpoint) => dispatch(fetchTags(url_endpoint)),
  };
};

const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts,
    error: state.posts.error,
    loading: state.posts.loading,
    moreloading: state.posts.moreloading,
    pageCount: state.posts.pageCount,
    pageStep: state.posts.pageStep,
    images: state.posts.images,
    tags: state.tags.tags,
    categories: state.category.categories,
  };
};

// BookDetailPage.propTypes = propTypes;

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BlogHome)
);
