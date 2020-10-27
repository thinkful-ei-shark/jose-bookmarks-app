//saveBookmark function:This function will check whether there are any existing bookmarks. If there are
//imports always at top
import $, { data } from "jquery";
import css from './index.css';
import api from "./api";
import store from './store';
import bookmarkapp from "./bookmarkapp";

//Main function to call all functions and generate to DOM
function main() {
  api.getItems().then((data) => {
    data.forEach((data) => store.addBookmark(data));
    bookmarkapp.render();
  });
  bookmarkapp.render();
  bookmarkapp.bindEvenListeners();

};

$(main);