import React from "react";
import draftJsEditor from "./draftJsEditor";
import { Link } from "react-router-dom";
import "./grid.css";

const createCard = (post) => {
  return (
    <Link to={`/post/${post.id}`} className="grid__item" key={post.id}>
      <div className="grid__item-bg"></div>
      <div className="grid__item-wrap">
        <img className="grid__item-img" src={post.get_image} alt="Some image" />
      </div>
      <h3 className="grid__item-title">{post.title}</h3>
      <h4 className="grid__item-number">{post.id}</h4>
    </Link>
  );
};

const renderAuthor = (authors) => {
  return (
    <div class="blog-meta">
      {authors.forEach((author) => {
        <div class="author comments-area">
          <div class="author comment-list">
            <div class="single-comment justify-content-between d-flex">
              <div class="user justify-content-between d-flex">
                <div class="thumb">
                  <img class="blog-avatar" />
                </div>
                <div class="desc">
                  <div class="d-flex justify-content-between">
                    <div
                      class="d-flex align-items-center"
                      style="margin-top:5px;"
                    >
                      <h5>
                        <a href="#">{author.first_name}</a>
                      </h5>
                      <p class="date"></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>;
      })}
    </div>
  );
};
const createCardContent = (post) => {
  return (
    <div className="content__item" key={post.id}>
      <div className="content__item-intro">
        <img
          className="content__item-img"
          src={post.get_image}
          alt="Some image"
        />
        <h2 className="content__item-title">{post.title}</h2>
      </div>
      <h3 className="content__item-subtitle">{post.introduction}</h3>
      <div className="content__item-text">
        {/* <draftJsEditor body={post.body} /> */}
        <div dangerouslySetInnerHTML={{ __html: post.body }} />
      </div>
      <div className="blog-meta">
        {/* {post &&
          post.authors &&
          post.authors.map((author) => {
            return ( */}
        <div className="author comments-area">
          <div className="author comment-list">
            <div className="single-comment justify-content-between d-flex">
              <div className="user justify-content-between d-flex">
                <div className="thumb">
                  <img className="blog-avatar" />
                </div>
                <div className="desc">
                  <div className="d-flex justify-content-between">
                    <div
                      className="d-flex align-items-center"
                      style="margin-top:5px;"
                    >
                      <h5>
                        <a href="#">author</a>
                      </h5>
                      <p className="date"></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* );
          })} */}
      </div>
    </div>
  );
};

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: null,
      postContent: null,
      scriptIsNotMounted: true,
    };
  }
  createCards = (posts) => posts.map((post) => createCard(post));
  createCardsContent = (posts) => posts.map((post) => createCardContent(post));

  componentDidUpdate(prevProps) {
    const { posts } = this.props;
    if (
      (posts.length > 0 && this.state.scriptIsNotMounted) ||
      prevProps.posts !== posts
    ) {
      this.setState(
        {
          cards: this.createCards(posts),
          postContent: this.createCardsContent(posts),
          scriptIsNotMounted: false,
        },
        () => {
          const script = document.createElement("script");
          script.async = false;
          script.src = "/static/js/grid.js";
          document.body.appendChild(script);
          const script2 = document.createElement("script");
          script2.async = false;
          script2.src = "/static/js/prism.js";
          document.body.appendChild(script2);
        }
      );
    }
  }
  render() {
    const { animation_class } = this.props;
    const { cards, postContent } = this.state;

    return (
      <React.Fragment>
        <div className={`grid-wrap ${animation_class}`}>
          <div className="grid">{cards}</div>
        </div>
        <div className="content">
          {postContent}
          <button class="content__close">Close</button>
          <svg class="content__indicator icon icon--caret"></svg>
        </div>
        }
      </React.Fragment>
    );
  }
}

export default Grid;
