import React from "react";
import Navigation from "./navigation";
import Footer from "./footer";
import PostContainer from "./post-container";
import SideBar from "./sidebar";
import { fetchPosts } from "../actions/posts";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { postListURL } from "../constants";

class BlogHome extends React.Component {
  componentDidMount() {
    this.props.fetchPosts(postListURL());
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.location.search !== this.props.location.search ||
      prevProps.location.pathname !== this.props.location.pathname
    ) {
      this.props.fetchPosts(postListURL());
    }
  }
  getPage() {
    const values = queryString.parse(this.props.location.search);
    return values.page === undefined ? 1 : parseInt(values.page);
  }
  render() {
    return (
      <div>
        <Navigation />
        <div className="container">
          <div className="row">
            <PostContainer
              posts={this.props.posts}
              pageCount={this.props.pageCount}
              getPage={this.getPage}
            />
            <SideBar posts={this.props.posts} />
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
  };
};

const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts,
    pageCount: state.posts.pageCount,
    pageStep: state.posts.pageStep,
    images: state.posts.images,
  };
};

// BookDetailPage.propTypes = propTypes;

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BlogHome)
);
