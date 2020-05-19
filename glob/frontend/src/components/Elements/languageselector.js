import React from "react";
import ReactFlagsSelect from "react-flags-select";
import "react-flags-select/css/react-flags-select.css";
import { withTranslation } from "react-i18next";
import "./languageselector.css";

class LanguageSelection extends React.Component {
  componentDidMount() {
    var language =
      window.localStorage.i18nextLng ||
      window.navigator.userLanguage ||
      window.navigator.language;
    switch (true) {
      case language.toLowerCase().includes("pt"):
        this.refs.flag.updateSelected("PT");
        break;
      case language.toLowerCase().includes("fr"):
        this.refs.flag.updateSelected("FR");
        break;
      case language.toLowerCase().includes("en"):
        this.refs.flag.updateSelected("GB");
        break;
      case language.toLowerCase().includes("de"):
        this.refs.flag.updateSelected("DE");
        break;
      default:
        this.props.i18n.changeLanguage("GB");
    }
  }
  onSelectFlag = (countryCode) => {
    switch (countryCode) {
      case "PT":
        this.props.i18n.changeLanguage("pt");
        break;
      case "FR":
        this.props.i18n.changeLanguage("fr");
        break;
      case "EN":
        this.props.i18n.changeLanguage("en");
        break;
      case "DE":
        this.props.i18n.changeLanguage("de");
        break;
      default:
        this.props.i18n.changeLanguage("en");
    }
  };
  render() {
    const pt = this.props.t("Portuguese");
    const fr = this.props.t("French");
    const de = this.props.t("German");
    const en = this.props.t("English");

    return (
      <React.Fragment>
        <ReactFlagsSelect
          ref="flag"
          countries={["PT", "GB", "FR", "DE"]}
          onSelect={this.onSelectFlag}
          customLabels={{
            PT: pt,
            GB: en,
            FR: fr,
            DE: de,
          }}
          placeholder=""
          showSelectedLabel={false}
        />
      </React.Fragment>
    );
  }
}

const LanguageSelectionWithTrans = withTranslation()(LanguageSelection);

export default LanguageSelectionWithTrans;
