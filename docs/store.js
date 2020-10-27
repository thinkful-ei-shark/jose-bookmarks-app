//store.js is used to render and manipulate data that is utilized in bookmarkapp.js locally 
//create store to connect to the api
const bookmarks = [];
const filter = 1;
const error = null;

//create functions to manipulate the data of the api

const addBookmark = function (bookmark) {
  bookmark.expanded = false;
  this.bookmarks.push(bookmark);
 
};

const findById = function(id){
  return this.bookmarks.find(bm => bm.id === id);
};

const deleteBookmark = function(id) {
  this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
}

const setError = function(error){
  this.error = error;
}

//export functions to index.js
export default{
  addBookmark,
  bookmarks,
  findById,
  deleteBookmark,
  filter,
  setError,
  error,
};