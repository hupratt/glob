import { v4 as uuidv4 } from "uuid";

/* Shorter versions of the book detail description */
const getPosition = (string, subString, index) =>
  string.split(subString, index).join(subString).length;

export const shortDescr = (description) => {
  if (description && description.length > 0) {
    var shortVersion = description;
    var i = 1;
    if (description.indexOf(".") < 60) {
      while (getPosition(shortVersion, ".", i) < 60) {
        shortVersion = description.slice(0, getPosition(description, ".", i));
        i++;

        if (i > 5) {
          break;
        }
      }
      return shortVersion;
    } else {
      return description.slice(0, 60) + " (...)";
    }
  }
};

/* Posthog utilities */
const get_cookies_array = () => {
  let cookies = {};
  if (document.cookie && document.cookie != "") {
    let split = document.cookie.split(";");
    for (var i = 0; i < split.length; i++) {
      var name_value = split[i].split("=");
      name_value[0] = name_value[0].replace(/^ /, "");
      cookies[decodeURIComponent(name_value[0])] = decodeURIComponent(
        name_value[1]
      );
    }
  }
  return cookies;
};

const findPosthogCookieName = () => {
  const cookies = get_cookies_array();
  for (var name in cookies) {
    if (name.indexOf("ph_") == 0) {
      return name;
    }
  }
  return null;
};

export const posthogCookieDistinctId = () => {
  let id = "";
  if (findPosthogCookieName()) {
    id = JSON.parse(get_cookies_array()[findPosthogCookieName()]).distinct_id;
    console.log("distinct_id", id);
  } else {
    id = uuidv4();
    console.log("generated distinct_id", id);
  }
  return id;
};
export const grabCookieConsent = () => {
  return get_cookies_array()["cookies"];
};
