import React from "react";
import Navigation from "../Elements/navigation";
import Footer from "../Elements/footer";
import SideBar from "../Elements/sidebar";
import { fetchPosts } from "../../actions/posts";
import { fetchCategories } from "../../actions/categories";
import { fetchTags } from "../../actions/tags";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  postListURL,
  categoryListURL,
  tagsListURL,
  base,
} from "../../constants";
import Grid from "../Elements/grid";
import SplashScreen from "../Elements/splashscreen";

class BlogHome extends React.Component {
  componentDidMount() {
    this.props.fetchCategories(tagsListURL);
    this.props.fetchTags(categoryListURL);
    this.props.fetchPosts(postListURL());
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.location.search !== this.props.location.search ||
      prevProps.location.pathname !== this.props.location.pathname
    ) {
      const endpoint = `${base}/api/blog/${this.props.location.search}`;
      this.props.fetchPosts(endpoint);
    }
  }

  render() {
    console.log("this.props.posts", this.props.posts);
    const {
      posts,
      pageCount,
      tags,
      categories,
      loading,
      animation_completed,
      animation_class,
      location,
    } = this.props;
    return (
      <React.Fragment>
        <Navigation animation_class={animation_class}>
          <SideBar categories={categories} tags={tags} />
        </Navigation>
        <SplashScreen loading={loading} />
        <Grid posts={posts} animation_class={animation_class} />
        <Footer animation_class={animation_class} />
      </React.Fragment>
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
    animation_completed: state.splashscreen.animation_completed,
    animation_class: state.splashscreen.animation_class,
  };
};

// BookDetailPage.propTypes = propTypes;

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BlogHome)
);
