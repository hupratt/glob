import React from "react";
import queryString from "query-string";
import { fetchPosts } from "../actions/posts";
import PostIntroCard from "./post-intro-card";
import { postListURL } from "../constants";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

class PostContainer extends React.Component {
  getPage() {
    const values = queryString.parse(this.props.location.search);
    return values.page === undefined ? 1 : parseInt(values.page);
  }

  componentDidMount() {
    this.getPosts();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.location.search !== this.props.location.search ||
      prevProps.location.pathname !== this.props.location.pathname
    ) {
      this.getPosts();
    }
  }

  getPosts = () => {
    // let category =
    //   this.props.match.params.category === undefined
    //     ? "*"
    //     : this.props.match.params.category;
    // let tag =
    //   this.props.match.params.tag === undefined
    //     ? "*"
    //     : this.props.match.params.tag;

    // let offset = (this.getPage() - 1) * this.state.pageStep;
    console.log(`fetching ${postListURL}`);
    this.props.fetchPosts(postListURL());
  };

  render() {
    return (
      <div className="col-md-8">
        {this.props.posts.map((post) => (
          <PostIntroCard key={post.id} post={post} />
        ))}

        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li
              className={
                this.getPage() <= 1 ? "page-item disabled" : "page-item "
              }
            >
              <Link
                to={`${this.props.match.url}?page=${this.getPage() - 1}`}
                className="page-link"
              >
                Previous
              </Link>
            </li>
            <li
              className={
                this.getPage() >= this.props.pageCount
                  ? "page-item disabled"
                  : "page-item "
              }
            >
              <Link
                to={`${this.props.match.url}?page=${this.getPage() + 1}`}
                className="page-link"
              >
                Next
              </Link>
            </li>
          </ul>
        </nav>
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
  connect(mapStateToProps, mapDispatchToProps)(PostContainer)
);
