import React, { Component, Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "./actions/auth";
import "semantic-ui-css/semantic.min.css";
import { CSSTransition } from "react-transition-group";
import BlogHome from "./components/blog-home";
import BlogPost from "./components/blog-post";
import { Route } from "react-router";

class App extends Component {
  render() {
    return (
      // i18n translations might still be loaded by the xhr backend
      // use react's Suspense
      <Suspense fallback="loading">
        <CSSTransition in={true} appear classNames="youtube" timeout={100}>
          <div />
        </CSSTransition>
        <Router>
          <div>
            <Route exact path="/" component={BlogHome} />
            <Route path="/category/:category" component={BlogHome} />
            <Route path="/tag/:tag" component={BlogHome} />
            <Route path="/post/:id" component={BlogPost} />
          </div>
        </Router>
      </Suspense>
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
