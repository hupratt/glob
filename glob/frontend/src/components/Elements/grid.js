import React from "react";
import draftJsEditor from "./draftJsEditor";
import { Link } from "react-router-dom";
import "./grid.css";
import { withTranslation } from "react-i18next";

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

const renderAuthors = (authors) => {
  return authors.map((author) => {
    return (
      <div className="authors-area">
        <div className="author comment-list">
          <div className="single-comment justify-content-between d-flex">
            <div className="user justify-content-between d-flex">
              <div className="thumb">
                <img className="blog-avatar" src={author.image} />
              </div>
              <div class="desc">
                <div class="d-flex justify-content-between">
                  <div class="d-flex align-items-center">
                    <h5>{author.name}</h5>
                    <p class="date">{author.published_date}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
};
const renderTags = (tags) => {
  return (
    <div className="tags">
      <p>
        Tagged with:{" "}
        {tags.map((tag) => {
          return (
            <a href="#">
              <span className="badge badge-secondary">{tag}</span>
            </a>
          );
        })}
      </p>
    </div>
  );
};

const renderComments = (comments, times_commented) => {
  return (
    <div class="comments-area">
      <h4>{times_commented} Comments</h4>

      <form action="/addcomment/" method="post" enctype="multipart/form-data">
        <label for="comment-form-content">Comment this</label>
        <input type="hidden" name="obj" value="{{ blog.pk }}" />
        <input
          type="text"
          id="comment-form-content"
          name="content"
          required="required"
        />
        <button>Submit</button>
      </form>

      <div class="comment-list">
        {comments.map((comment) => {
          return (
            <div class="single-comment justify-content-between d-flex">
              <div class="user justify-content-between d-flex">
                <div class="thumb">
                  <img src={comment.user_image} class="blog-avatar" />
                </div>
                <div class="desc">
                  <div class="d-flex  justify-content-between">
                    <p class="comment">{comment.content}</p>
                    <div class="d-flex align-items-center">
                      <h5>
                        <a href="#">{comment.user_fullname}</a>
                      </h5>
                      <p class="date">{comment.timestamp} </p>
                    </div>
                    <div class="reply-btn">
                      <a href="#" class="btn-reply text-uppercase">
                        reply
                      </a>
                      <form
                        action="/addcommentofcomment/"
                        method="post"
                        enctype="multipart/form-data"
                      >
                        <label for="comment-form-content">Comment this</label>
                        <input
                          type="hidden"
                          name="obj"
                          value="{{ comment.pk }}"
                        />
                        <input
                          type="text"
                          id="comment-form-content"
                          name="content"
                          required="required"
                        />
                        <button>Submit</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
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
        {renderAuthors(post.authors)}
        {renderTags(post.tags)}
        {renderComments(post.comments, post.times_commented)}
      </div>
    </div>
  );
};

class Grid extends React.Component {
  state = { language: null };
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
    const {
      posts,
      i18n: { language },
    } = this.props;

    if (
      (posts.length > 0 && this.state.scriptIsNotMounted) ||
      prevProps.posts !== posts ||
      prevProps.i18n.language !== this.state.language
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
          this.setState({ language });
          console.log("fetching from grid", posts);
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

const GridWithTrans = withTranslation()(Grid);

export default GridWithTrans;
