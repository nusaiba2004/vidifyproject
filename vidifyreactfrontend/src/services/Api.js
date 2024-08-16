// apiConfig.js
const serverUrl = "http://localhost:3001";

const API = {
  main: serverUrl + "/",
  login: serverUrl + "/login",
  register: serverUrl + "/register",
  verifyOtp: serverUrl + "/verify-otp",
  getVideoByCategories: serverUrl + "/getVideoByCategories",
  getCategories: serverUrl + "/getCategories",
  languages: serverUrl + "/getLanguages",
  addVideo: serverUrl + "/addVideo",
  addMovie: serverUrl + "/addMovie",
  addShorts: serverUrl + "/addShorts",
  getMovies: serverUrl + "/getMovies",
};

export default API;
