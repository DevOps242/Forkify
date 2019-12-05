// Creating a object that targets the DOM and sending it to the module that needs it.

export const elements = {
  seachForm: document.querySelector('.search'),
  searchInput: document.querySelector('.search__field'),
  searchResList: document.querySelector('.results__list'),
  searchRes: document.querySelector('.results'),
  searchResPages: document.querySelector('.results__pages'),
  recipe: document.querySelector('.recipe'),
  shopping: document.querySelector('.shopping__list'),
  likesMenu: document.querySelector('.likes__field'),
  likesList: document.querySelector('.likes__list')
};

// Creating a loader to be resuable 
export const elementStrings = {
    loader: 'loader'
};

// Creating the loader 
export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>

        </div>
    `;
    parent.insertAdjacentHTML('afterBegin', loader);
};

//Clearing the loader from the DOM after data have been retrived.
export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);     
};