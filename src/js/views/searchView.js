// 

import { elements } from './base';

// 
export const getInput = () => elements.searchInput.value;

// Clearing the search input after results have rendered.
export const clearInput = () =>  {
    elements.searchInput.value = ''
};

// Clearing the search input after search for another item.
export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};

export const highlightSelected = id => {
    // Puting the targeting DOM elements in an array to loop through each and remove and add class name.
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    })
    //CSS Selector - targeting link with all attributes
  document.querySelector(`.results__link[href="#${id}"]`).classList.add('results__link--active');
};

/*
// 'Pasta with tomato and spinach'
acc: 0 / acc + cur.length = 5 / newTitle = ['Pasta']
acc: 5 / acc + cur.length = 9 / newTitle = ['Pasta', 'with']
acc: 9 / acc + cur.length = 15 / newTitle = ['Pasta', 'with', 'tomato']
acc: 15 / acc + cur.length = 18 / newTitle = ['Pasta', 'with', 'tomato']
acc: 18 / acc + cur.length = 24 / newTitle = ['Pasta', 'with', 'tomato']
*/

//To create a title word limit for the display.
export const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        // 1. Take title, Split it, then reduce()
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.lenth;
        }, 0);
        
        //return the result with the join() (opposite of splice)
        return `${newTitle.join(' ')} ...`;
    }
    return title;
};

// Creating a template for dynamic data to present in the HTML
const renderRecipe = recipe => {
    const markup = `
            <li>
                <a class="results__link" href="#${recipe.recipe_id}">
                    <figure class="results__fig">
                        <img src="${recipe.image_url}" alt="${recipe.title}">
                    </figure>
                    <div class="results__data">
                        <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                        <p class="results__author">${recipe.publisher}</p>
                    </div>
                </a>
            </li>
    `;
    // placing the markup to append after one another in the order they are presented.
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

//type : 'prev' or 'next'
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page -1 : page + 1}>
    <span>Page ${type === 'prev' ? page -1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;



// Calling the actuall page buttons
const renderButtons = (page, numResults, resPerPage) => {
    // using Math.ceil() to round to the next ceiling higher number
    const pages = Math.ceil(numResults / resPerPage);
    
    let button; 
    if (page === 1 && pages > 1) {
        // Button to go to next page
       button = createButton(page, 'next');
    }else if (page < pages) {
        // Both buttons
        button = `
            ${createButton(page, 'next')}
            ${createButton(page, 'prev')}
        `;
    }else if (page === pages && pages >1) {
         // Only button to go to prev page
       button = createButton(page, 'prev');
    }
    
    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

// Looping through the object to present to the HTML.
export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    // Only to display number 10 
    // Render results of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    
    
    //Taking a part of this recipe
    recipes.slice(start, end).forEach(renderRecipe);
    
    // render pagination buttons
    renderButtons(page, recipes.length, resPerPage);
};







