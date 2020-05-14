import React from "react";
import axios from "axios";
import queryString from "query-string";

import PostIntroCard from "./post-intro-card";
import { Link } from "react-router-dom";

class PostContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      pageCount: 0,
      pageStep: 10,
      images: null,
    };
  }

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
    let category =
      this.props.match.params.category === undefined
        ? "*"
        : this.props.match.params.category;
    let tag =
      this.props.match.params.tag === undefined
        ? "*"
        : this.props.match.params.tag;

    let offset = (this.getPage() - 1) * this.state.pageStep;
    axios
      .get(
        `/api/blog/?limit=${this.state.pageStep}&offset=${offset}&category=${category}&tag=${tag}`
      )
      .then((res) => {
        const posts = res.data.results;
        this.setState({
          posts,
          pageCount: Math.ceil(
            parseInt(res.data.results.length) / this.state.pageStep
          ),
        });
      });
  };

  render() {
    return (
      <div className="col-md-8">
        {this.state.posts.map((post) => (
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
                this.getPage() >= this.state.pageCount
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

export default PostContainer;
