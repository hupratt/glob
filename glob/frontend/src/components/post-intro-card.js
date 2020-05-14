import React from "react";
import axios from "axios";

import { Link } from "react-router-dom";

class PostIntroCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null, image: null };
  }

  componentDidMount() {
    this.getPost();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.getPost();
    }
  }

  getPost = () => {
    this.setState(
      { data: this.props.post },
      () =>
        this.state.data.image &&
        axios
          .get("/api/v2/images/" + this.state.data.image + "/")
          .then((res) => {
            this.setState({ image: res.data.meta.download_url }, () => {
              console.log(this.state);
            });
          })
    );
  };

  renderPost(data, image) {
    return (
      <div className="card mb-4">
        <Link to={`/post/${data.id}`}>
          <img src={image} className="card-img-top" />
        </Link>
        <div className="card-body">
          <h2 className="card-title">
            <Link to={`/post/${data.id}`}>{data.title}</Link>
          </h2>
          <p
            className="card-text"
            dangerouslySetInnerHTML={{ __html: data.md_excerpt }}
          />
          <Link to={`/post/${data.id}`} className="btn btn-primary">
            Read More →
          </Link>
        </div>
        <div className="card-footer text-muted">Posted on {data.pub_date}</div>
      </div>
    );
  }

  render() {
    const { data, image } = this.state;
    if (data) {
      return this.renderPost(data, image);
    } else {
      return <div className="card mb-4"></div>;
    }
  }
}

export default PostIntroCard;
