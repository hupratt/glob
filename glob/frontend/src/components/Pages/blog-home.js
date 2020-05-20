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
import "./blog-home.css";
import { withTranslation } from "react-i18next";

class BlogHome extends React.Component {
  state = { language: null, posts: [] };
  componentDidMount() {
    this.props.fetchCategories(categoryListURL);
    this.props.fetchTags(tagsListURL);
  }

  componentDidUpdate(prevProps) {
    const {
      i18n: { language },
      location: { search, pathname },
    } = this.props;
    if (!this.state.language && language !== this.state.language) {
      this.setState({ language });
      this.clearFilters();
      console.log(
        `init: fetching from blog home posts: ${this.props.posts.length} lang: ${language}`
      );
    } else if (language !== this.state.language) {
      this.setState({ language });
      this.clearFilters();
      console.log(
        `language changed: fetching from blog home posts: ${this.props.posts.length} lang: ${language}`
      );
    } else if (prevProps.location.search !== search) {
      const endpoint = `${base}/api/blog/${search}`;
      this.props.fetchPosts(endpoint, language);
      console.log(
        `tag or category selected: fetching from blog home ${endpoint} posts: ${this.props.posts.length} lang: ${language}`
      );
    }
  }

  clearFilters = () => {
    this.props.history.push("/");
    this.props.fetchPosts(postListURL(), this.props.i18n.language);
  };

  render() {
    const {
      posts,
      tags,
      categories,
      loading,
      animation_class,
      history,
    } = this.props;
    return (
      <React.Fragment>
        <Navigation
          animation_class={animation_class}
          lang={this.props.match.params.lang}
          history={history}
        >
          <SideBar
            categories={categories}
            tags={tags}
            clearFilters={this.clearFilters}
          />
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
    fetchPosts: (url_endpoint, lang) =>
      dispatch(fetchPosts(url_endpoint, lang)),
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
    pageStep: state.posts.pageStep,
    images: state.posts.images,
    tags: state.tags.tags,
    categories: state.category.categories,
    animation_class: state.splashscreen.animation_class,
  };
};

// BookDetailPage.propTypes = propTypes;

const BlogHomeWithTrans = withTranslation()(BlogHome);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BlogHomeWithTrans)
);
