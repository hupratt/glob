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
        <div dangerouslySetInnerHTML={{ __html: post.rich_text }} />
      </div>
    </div>
  );
};

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cards: null, postContent: null, scriptIsNotMounted: true };
  }
  createCards = (posts) => posts.map((post) => createCard(post));
  createCardsContent = (posts) => posts.map((post) => createCardContent(post));

  componentDidUpdate() {
    if (this.props.posts.length > 0 && this.state.scriptIsNotMounted) {
      const { posts } = this.props;
      this.setState(
        {
          cards: this.createCards(posts),
          postContent: this.createCardsContent(posts),
          scriptIsNotMounted: false,
        },
        () => {
          const script = document.createElement("script");
          script.async = false;
          script.src = "http://127.0.0.1:8000/static/js/grid.js";
          document.body.appendChild(script);
          const script2 = document.createElement("script");
          script2.async = false;
          script2.src = "http://127.0.0.1:8000/static/js/prism.js";
          document.body.appendChild(script2);
        }
      );
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className={`grid-wrap ${this.props.animation_class}`}>
          <div className="grid">{this.state.cards}</div>
        </div>
        <div className="content">
          {this.state.postContent}
          <button class="content__close">Close</button>
          <svg class="content__indicator icon icon--caret"></svg>
        </div>
        }
      </React.Fragment>
    );
  }
}

export default Grid;
