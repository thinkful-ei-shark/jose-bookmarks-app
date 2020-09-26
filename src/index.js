/////////////////////////////////////////////////////////
//////////////////// STORE DATABASE /////////////////////
///////////////////////////////////////////////////////// 

const store = {
    bookmarks: [
        { id: cuid(), title: 'Soccer News', rating: 3, url: 'https://www.goal.com/en-us', desc: 'Soccer news from around the world', expanded: false },
        { id: cuid(), title: 'Meatball Recipe', rating: 5, url: 'https://www.thekitchn.com/how-to-make-meatballs-cooking-lessons-from-the-kitchn-108048', desc: 'Easiest meatball recipe', expanded: true },
        { id: cuid(), title: 'Avocado Oil', rating: 4, url: 'https://www.healthline.com/nutrition/9-avocado-oil-benefits', desc: 'Health Benefits of Avocado Oil', expanded: true }
    ],
    hideEditOptions: false,
    adding: false,
    error: null,
    filter: 0
};

/////////////////////////////////////////////////////////
//////////////////// RENDER FUNCTIONS ///////////////////
///////////////////////////////////////////////////////// 


//.:*~*:._.:*~*:._ STEP 1.C. _.:*~*:._.:*~*:.//

// Function that will give users access to create their own bookmark

const newBookmarkEntryForm = function() {
    return `  
    <form id="js-bookmark-list-form">
        <label for="bookmark-title-entry">Title:</label>
        <input type="text" name="bookmark-title-entry" class="js-bookmark-title-entry" placeholder="e.g., marinara recipe" required><br>
        <label for="bookmark-url-entry">URL:</label>
        <input type="url" name="bookmark-url-entry" class="js-bookmark-url-entry" placeholder="www.sauceboss.com" required><br>
        <label for="bookmark-desc-entry">Description:</label>
        <input type="text" name="bookmark-desc-entry" class="js-bookmark-desc-entry" placeholder="better than momma's" required><br>
        <label for="rating">Rating:</label>
        <input type="number" name="bookmark-rating-entry" max='5' min='1' class="js-bookmark-rating-entry" placeholder="e.g., 1 - 5" required><br>
        <button type="submit">Add +</button>
    </form>
  `;
  }

// Function that returns HTML based on whether the user wants to
// create a new bookmark entry or look at the list of their already
// created bookmarks

const generateStartTemplate = function() {
    let mainNav = `
        <form id='js-bookmark-start' class='bookmark-start'>
            <button type="submit" >New Bookmark +</button>
            <select name="ratings" id="ratings" required>
                <option value="sort-by">Sort by:</option>
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Star</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
            </select>
        </form>`;

    if (store.adding) {
        mainNav = newBookmarkEntryForm();
    }
    return `
        <h1>Bookmarks List</h1>
        <h2>Welcome fellow bookmarker!</h2>
        <p class='description'>
            This app will enable you to store your favorite
            websites and organize by a rating (1 - 5) form
            most favorite to "I can't believe I was into this band".
        </p>
        <p>Have fun and happy bookmarking 📚</p>
        ${mainNav}
        <ul class="js-bookmark-list"></ul>
    `;
}

  // Function that generates newly created bookmark

  const generateItemElement = function (item) {
    let bookmarkDescription = `
        <div class='description js-item-expanded'>
            <button class='expand-button js-visit-site'>Visit site</button>
            <p class='desc-title description'>Description:</p>
            <p class='description'>${item.desc}</p>
            <button class='bookmark-item-delete js-item-delete'>delete</button>
        </div>
        `;
    if (!item.expanded) {
      bookmarkDescription = `
        <div class='bookmark-item__collapsed'></div>
      `;
    }
  
    return `
        <li class='js-item-element' data-item-id='${item.id}'>
            <span class='bookmark-title'>${item.title}</span>
            <span class='bookmark-rating'>Rating: ${item.rating}</span>
            ${bookmarkDescription}
            <div class='bookmark-item-controls'>
                <button class='bookmark-item-toggle js-item-toggle'>view full entry</button>
            </div>
        </li>`;
  };
  
  
  //.:*~*:._.:*~*:._ STEP 1.B. _.:*~*:._.:*~*:.//

  const generateBookmarkItemsString = function (bookmarkList) {
    const items = bookmarkList.map((item) => generateItemElement(item));
    return items.join('');
  };
  
  //.:*~*:._.:*~*:._ STEP 1.A. _.:*~*:._.:*~*:.//

  const render = function () {
    //   console.log('rendering')
      let pageLoad = generateStartTemplate();
      // Set up a copy of the store's items in a local 
      // variable 'items' that we will reassign to a new
      // version if any filtering of the list occurs.
      let items = [...store.bookmarks];
      // If the `hideCheckedItems` property is true, 
      // then we want to reassign filteredItems to a 
      // version where ONLY items with a "checked" 
      // property of false are included.

    //   if (store.hideCheckedItems) {
    //       items = items.filter(item => !item.checked);
    //     }

        /**
         * At this point, all filtering work has been 
         * done (or not done, if that's the current settings), 
         * so we send our 'items' into our HTML generation function
         */
        let bookmarkListItemsString = generateBookmarkItemsString(items);        
        
        
        // insert that HTML into the DOM
        $('.js-container').html(pageLoad).append(bookmarkListItemsString);
    };
    

/////////////////////////////////////////////////////////
/////////////////// TRIGGER FUNCTIONS ///////////////////
///////////////////////////////////////////////////////// 

  //.:*~*:._.:*~*:._ STEP 2.C. _.:*~*:._.:*~*:.//

  const addItemToBookmarkList = function (newItemTitle, newURL, newDesc, newRating) {
    store.bookmarks.push({ id: cuid(), title: newItemTitle, rating: newRating, url: newURL, desc: newDesc, expanded: false, editable: false });
  };

  //.:*~*:._.:*~*:._ STEP 2.B. _.:*~*:._.:*~*:.//

    const handleNewItemSubmit = function () {
        $('.js-container').on('submit', '#js-bookmark-list-form', function (event) {
            event.preventDefault();
            const newItemTitle = $('.js-bookmark-title-entry').val();
            const newURL = $('.js-bookmark-url-entry').val();
            const newDesc = $('.js-bookmark-desc-entry').val();
            const newRating = $('.js-bookmark-rating-entry').val();
            $('.js-shopping-list-entry').val('');
            // Before the next function runs, there's needs to be a call to the API
            //  - the entry must be verified
            //  - converted from json into a string
            addItemToBookmarkList(newItemTitle, newURL, newDesc, newRating);
            //Hides form after we've taken data from the form, called the api and added it to the store 
            store.adding = false;
            render();
        }); 
    };

    //.:*~*:._.:*~*:._ STEP 2.A. _.:*~*:._.:*~*:.//
    
    // These functions lead the user to a new entry form
    // and obtain the user input information

  const handleOpenBookMarkForm = function () {
    $('.js-container').on('submit', '#js-bookmark-start', function (event) {
      event.preventDefault();
      // this function will trigger the creation of a new "create bookmark"
      // form "newBookmarkEntryTemplate()"
    //   console.log('take me to your leader...');
      store.adding = true;
      render();
    });
  };

  //.:*~*:._.:*~*:._ STEP 3.C. _.:*~*:._.:*~*:.//
  // This function will find the ID of the current list item
  // and it will alternate its expanded status

  const toggleExpandedListItem = function (id) {
    const foundItem = store.bookmarks.find(item => item.id === id);
    foundItem.expanded = !foundItem.expanded;
  };
  
    //.:*~*:._.:*~*:._ STEP 3.A. _.:*~*:._.:*~*:.//

    // These functions expanded and collapse the full view
    // of the bookmark list item

  const handleExpandedViewToggle = function () {
    $('.js-container').on('click', '.js-item-toggle', event => {
      const id = getItemIdFromElement(event.currentTarget);
      toggleExpandedListItem(id);
      render();
    });
  };
  
  //.:*~*:._.:*~*:._ STEP 3.B. _.:*~*:._.:*~*:.//

  // This function will retrieve the ID of the current list item
  // by traversing to the closest <li> and obtaining its unique ID number

  const getItemIdFromElement = function (item) {
    return $(item)
      .closest('.js-item-element')
      .data('item-id');
  };
  
  /**
   * Responsible for deleting a bookmark item.
   * @param {string} id 
   */

   //.:*~*:._.:*~*:._ STEP 4.B. _.:*~*:._.:*~*:.//

  const deleteListItem = function (id) {
    // As with 'addItemToShoppingLIst', this 
    // function also has the side effect of
    // mutating the global store value.
    //
    // First we find the index of the item with 
    // the specified id using the native
    // Array.prototype.findIndex() method. 
    const index = store.bookmarks.findIndex(item => item.id === id);
    // Then we call `.splice` at the index of 
    // the list item we want to remove, with 
    // a removeCount of 1.
    store.bookmarks.splice(index, 1);
  };
  
  //.:*~*:._.:*~*:._ STEP 4.A. _.:*~*:._.:*~*:.//

  // These functions will enable the user to delete an item from the list

  const handleDeleteItemClicked = function () {
    // Like in `handleExpandedViewToggle`, 
    // we use event delegation.
    $('.js-container').on('click', '.js-item-delete', event => {
      // Get the index of the item in store.items.
      const id = getItemIdFromElement(event.currentTarget);
      // Delete the item.
      deleteListItem(id);
      // Render the updated shopping list.
      render();
    });
  };
  

  //.:*~*:._.:*~*:._ STEP 5.B. _.:*~*:._.:*~*:.//

  /**
   * This function returns an array of ratings that are greater
   * or equal to the rating value on the dropdown menu
   */
  const dropdownSelectionFilter = function (currentRating) {
    // The state of the page when the user first loads it
    let pageLoad = generateStartTemplate();
    // Extracting from the store the bookmarks that have a rating equal to or greater
    // than the currentRating
    const ratingGroup = [];
    store.bookmarks.map(rate => (rate.rating >= currentRating) ? ratingGroup.push(rate) : null)
    // Display the filtered bookmarks to the DOM
    let bookmarkListItemsString = generateBookmarkItemsString(ratingGroup);
    // insert that HTML into the DOM
    $('.js-container').html(pageLoad).append(bookmarkListItemsString);
  }
    
  
   //.:*~*:._.:*~*:._ STEP 5.A. _.:*~*:._.:*~*:.//

  /**
   * Places an event listener on dropdown menu
   * and only displays the items that have a minimum rating and above
   */
  const handleDropdownSelection = function () {
    // create a trigger for the ratings
    $('.js-container').on('change', '#ratings', (event) => {
    // get the current rating value from the user
        const currentRating = $(event.currentTarget).val();
    // save the current rating into the store
        store.filter = currentRating;
        console.log(store);
    // sent to the dropdownSelectionFilter function
        dropdownSelectionFilter(currentRating);
    });
  };
  

/////////////////////////////////////////////////////////
////////////////// CALLBACK FUNCTION ////////////////////
///////////////////////////////////////////////////////// 

  /*
   * This function will be our callback when the
   * page loads. It will initially: 
   *  - Rendering our bookmarks list, 
   *  - then call our individual functions that handle:
   *    -- new bookmark submission ('Save'),
   *    -- user clicks on the 'expand/compress' button, 
   *    -- the 'edit entry' button,
   *    -- and the 'delete' button 
   *    for individual shopping list items.
   */
  const handleBookmarkList = function () {
    render();
    handleOpenBookMarkForm();
    handleNewItemSubmit();
    handleExpandedViewToggle();
    handleDeleteItemClicked();
    handleDropdownSelection();
  };
  
  // when the page loads, call `handleBookmarkList`
  $(handleBookmarkList);