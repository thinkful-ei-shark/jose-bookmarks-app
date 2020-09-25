const store = {
    items: [
        { id: cuid(), name: 'Soccer News', url: 'https://www.goal.com/en-us', desc: 'Soccer news from around the world', rating: 4, expanded: true, editable: false },
        { id: cuid(), name: 'Meatball Recipe', url: 'https://www.thekitchn.com/how-to-make-meatballs-cooking-lessons-from-the-kitchn-108048', desc: 'Easiest meatball recipe', rating: 3, expanded: true, editable: false },
        { id: cuid(), name: 'Butthole Surfers - Who Was in My Room Last Night', url: 'https://www.youtube.com/watch?v=CNAkbbKycCM', desc: 'Pretty good song', rating: 2, expanded: false, editable: false }
    ],
    hideExpandedItems: false,
    hideEditOptions: false
};

/////////////////////////////////////////////////////////
//////////////////// RENDER FUNCTIONS ///////////////////
///////////////////////////////////////////////////////// 

  // STEP 1.B.

  const generateItemElement = function (item) {
    let bookmarkDescription = `
        <div class='js-item-expanded'>
            <p class='desc-title description'>Description:</p>
            <p class='description'>${item.desc}</p>
            <p>Visit site: <a href="${item.url}">${item.url}</a></p>
        </div>
        `;
    if (!item.expanded) {
      bookmarkDescription = `
        <div class='bookmark-item__collapsed'></div>
      `;
    }
  
    return `
        <li class='js-item-element' data-item-id='${item.id}'>
            <span class='bookmark-item'>${item.name}</span>
            ${bookmarkDescription}
            <div class='bookmark-item-controls'>
                <button class='bookmark-item-toggle js-item-toggle'>
                    <span class='button-label'>expand/compress</span>
                </button>
                 <button class='bookmark-item-edit js-item-edit'>
                    <span class='button-label'>edit entry</span>
                </button>
                <button class='bookmark-item-delete js-item-delete'>
                    <span class='button-label'>delete</span>
                </button>
            </div>
        </li>`;
  };
  
  
  // STEP 1.A.

  const generateBookmarkItemsString = function (bookmarkList) {
    const items = bookmarkList.map((item) => generateItemElement(item));
    return items.join('');
  };
  
  // STEP 1

  const render = function () {
      console.log('rendering')
      // Set up a copy of the store's items in a local 
      // variable 'items' that we will reassign to a new
      // version if any filtering of the list occurs.
      let items = [...store.items];
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
        const bookmarkListItemsString = generateBookmarkItemsString(items);
        
        // insert that HTML into the DOM
        $('.js-bookmark-list').html(bookmarkListItemsString);
    };
    
    
  const addItemToShoppingList = function (itemName) {
    store.items.push({ id: cuid(), name: itemName, checked: false });
  };
  
  const handleNewItemSubmit = function () {
    $('#js-shopping-list-form').submit(function (event) {
      event.preventDefault();
      const newItemName = $('.js-shopping-list-entry').val();
      $('.js-shopping-list-entry').val('');
      addItemToShoppingList(newItemName);
      render();
    });
  };
  
  const toggleCheckedForListItem = function (id) {
    const foundItem = store.items.find(item => item.id === id);
    foundItem.checked = !foundItem.checked;
  };
  
  const handleItemCheckClicked = function () {
    $('.js-shopping-list').on('click', '.js-item-toggle', event => {
      const id = getItemIdFromElement(event.currentTarget);
      toggleCheckedForListItem(id);
      render();
    });
  };
  
  const getItemIdFromElement = function (item) {
    return $(item)
      .closest('.js-item-element')
      .data('item-id');
  };
  
  /**
   * Responsible for deleting a list item.
   * @param {string} id 
   */
  const deleteListItem = function (id) {
    // As with 'addItemToShoppingLIst', this 
    // function also has the side effect of
    // mutating the global store value.
    //
    // First we find the index of the item with 
    // the specified id using the native
    // Array.prototype.findIndex() method. 
    const index = store.items.findIndex(item => item.id === id);
    // Then we call `.splice` at the index of 
    // the list item we want to remove, with 
    // a removeCount of 1.
    store.items.splice(index, 1);
  };
  
  const handleDeleteItemClicked = function () {
    // Like in `handleItemCheckClicked`, 
    // we use event delegation.
    $('.js-shopping-list').on('click', '.js-item-delete', event => {
      // Get the index of the item in store.items.
      const id = getItemIdFromElement(event.currentTarget);
      // Delete the item.
      deleteListItem(id);
      // Render the updated shopping list.
      render();
    });
  };
  
  /**
   * Toggles the store.hideCheckedItems property
   */
  const toggleCheckedItemsFilter = function () {
    store.hideCheckedItems = !store.hideCheckedItems;
  };
  
  /**
   * Places an event listener on the checkbox 
   * for hiding completed items.
   */
  const handleToggleFilterClick = function () {
    $('.js-filter-checked').click(() => {
      toggleCheckedItemsFilter();
      render();
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
    handleNewItemSubmit();
    handleItemCheckClicked();
    handleDeleteItemClicked();
    handleToggleFilterClick();
  };
  
  // when the page loads, call `handleBookmarkList`
  $(handleBookmarkList);