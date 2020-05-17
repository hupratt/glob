import React from "react";
import "./splashscreen.css";
import { animation } from "../../actions/splashscreen";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const heroArea = () => {
  return (
    <React.Fragment>
      <main style={{ height: "80vh" }}>
        <header className="codrops-header">
          <h1 className="codrops-header__title">PythonBots</h1>
        </header>
      </main>
    </React.Fragment>
  );
};

class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { heroArea: null, scriptLoaded: false, heroLoaded: false };
  }

  componentDidUpdate() {
    if (!this.props.loading && !this.state.scriptLoaded) {
      this.setState(
        {
          heroArea: heroArea(),
          scriptLoaded: true,
        },
        () => {
          setTimeout(() => {
            const script = document.createElement("script");
            script.async = false;
            script.src = "/static/js/makelines.js";
            document.body.appendChild(script);
            setTimeout(() => {
              this.props.animation_complete();
            }, 4000);
          }, 2000);
        }
      );
    }
  }
  render() {
    return <React.Fragment>{this.state.heroArea}</React.Fragment>;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    animation_complete: (status) => dispatch(animation(status)),
  };
};

const mapStateToProps = (state) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SplashScreen)
);
