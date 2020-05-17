import React, { Component, Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";

import "semantic-ui-css/semantic.min.css";
import { CSSTransition } from "react-transition-group";
import BlogHome from "./components/Pages/blog-home";
import BlogPost from "./components/Pages/blog-post";
import { Route } from "react-router-dom";
import "../static/css/base.css";
import "./App.css";

const youtubeLoader = () => {
  return (
    <CSSTransition in={true} appear classNames="youtube" timeout={5000}>
      <div className="youtube" />
    </CSSTransition>
  );
};
class App extends Component {
  render() {
    return (
      // i18n translations might still be loaded by the xhr backend
      // use react's Suspense
      <React.Fragment>
        <Suspense fallback="loading">
          {youtubeLoader()}
          <Router>
            <Route exact path="/" component={BlogHome} />
          </Router>
        </Suspense>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
