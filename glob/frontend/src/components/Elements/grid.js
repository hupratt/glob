import React from "react";
import { Link } from "react-router-dom";

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

const createPostDetail = (post) => {
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
      <h3 className="content__item-subtitle">
        "How I learned to cherish life after a trip to hell"
      </h3>
      <div className="content__item-text">
        <p>
          When I was in the islands nearly a generation ago, I was acquainted
          with a young American couple who had among their belongings an
          attractive little son of the age of seven—attractive but not
          practicably companionable with me, because he knew no English. He had
          played from his birth with the little Kanakas on his father’s
          plantation, and had preferred their language and would learn no other.
          The family removed to America a month after I arrived in the islands,
          and straightway the boy began to lose his Kanaka and pick up English.
          By the time he was twelve he hadn’t a word of Kanaka left; the
          language had wholly departed from his tongue and from his
          comprehension. Nine years later, when he was twenty-one, I came upon
          the family in one of the lake towns of New York, and the mother told
          me about an adventure which her son had been having. By trade he was
          now a professional diver. A passenger boat had been caught in a storm
          on the lake, and had gone down, carrying her people with her. A few
          days later the young diver descended, with his armor on, and entered
          the berth-saloon of the boat, and stood at the foot of the
          companionway, with his hand on the rail, peering through the dim
          water. Presently something touched him on the shoulder, and he turned
          and found a dead man swaying and bobbing about him and seemingly
          inspecting him inquiringly. He was paralyzed with fright.
        </p>
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
  createPostsDetail = (posts) => posts.map((post) => createPostDetail(post));

  componentDidUpdate() {
    if (this.props.posts.length > 0 && this.state.scriptIsNotMounted) {
      const { posts } = this.props;
      this.setState(
        {
          cards: this.createCards(posts),
          postContent: this.createPostsDetail(posts),
          scriptIsNotMounted: false,
        },
        () => {
          const script = document.createElement("script");
          script.async = false;
          script.src = "http://127.0.0.1:8000/static/js/grid.js";
          document.body.appendChild(script);
        }
      );
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="grid-wrap">
          <div className="grid">{this.state.cards}</div>
        </div>
        <div className="content">
          {this.state.postContent}
          <button class="content__close">Close</button>
          <svg class="content__indicator icon icon--caret"></svg>
        </div>
      </React.Fragment>
    );
  }
}

export default Grid;
