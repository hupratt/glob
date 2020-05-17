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

class App extends Component {
  render() {
    return (
      // i18n translations might still be loaded by the xhr backend
      // use react's Suspense
      <Suspense fallback="loading">
        <CSSTransition in={true} appear classNames="youtube" timeout={2000}>
          <div style={{ zIndex: "1000" }} />
        </CSSTransition>
        <Router>
          {/* // this.props.match.params */}
          <Route exact path="/" component={BlogHome} />
          {/* <Route path="/category/:category" component={BlogHome} /> */}
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
