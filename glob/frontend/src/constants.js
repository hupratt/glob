export const base = process.env.REACT_APP_BASE;

const apiURL = "/api";
const mediaURL = "/media/";

export const endpoint = `${base}${apiURL}`;
export const mediaEndpoint = `${base}${mediaURL}`;
export const googleLogin = `${base}/accounts/google/login/`;
export const facebookLogin = `${base}/accounts/facebook/login/`;
export const githubLogin = `${base}/accounts/github/login/`;
export const postListURL = (
  offset = 0,
  language = "",
  checkedItems = "",
  category = "",
  price = "0,100",
  text = ""
) =>
  `${endpoint}/blog/?limit=12&offset=${offset}&language=${language}&authors=${checkedItems}&category=${category}&price=${price}&text=${text}`;

export const s3_base_url = `https://bookshop-images-f1492f08-f236-4a55-afb7-70ded209cb24.s3.eu-west-2.amazonaws.com/`;
