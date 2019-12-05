// Global app controller

// importing Axios 
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import  { elements, renderLoader, clearLoader } from './views/base';

// Implementing States - to store

/**Global state of the app
* - Search Object
* - Current Recipe Object
* - Shopping List Object
* - Liked Recipes
*/
const state = {};

/* This is the Search Controller */
const controlSearch = async () => {
    // 1. Get the query from the view
        const query = searchView.getInput(); //TODO

    
        if (query) {
            // 2. New search object and add to state
            state.search = new Search(query);
            
            // 3. Prepare UI for results
            searchView.clearInput();
            searchView.clearResults();
            renderLoader(elements.searchRes);
            
            try{
                // 4. Seach for Recipes
            await state.search.getResult();
            
            // 5. Render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
            }catch (err) {
                alert('Something wrong with the search...');
                clearLoader();
            }
            
        }  
}

elements.seachForm.addEventListener('submit', e => {
    //To prevent the page from reloading.
    e.preventDefault();
    controlSearch();
});


elements.searchResPages.addEventListener('click', e => {
    // using the closest() method to grab the node element.
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});



/* This is the Recipe Controller */
// Making a global event listener for the url hash

const controlRecipe = async () => {
    //Getting the ID from the URL.
    const id = window.location.hash.replace('#', '');
   
    if (id) {
        // Prepare the UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);
        
        //Highlight selected searchitem if there was a search request
        if (state.search) searchView.highlightSelected(id);
        
        
        // Create a new recipe object
        state.recipe = new Recipe(id);
        
        
        try {
           // Get recipe data
        await state.recipe.getRecipe();
        state.recipe.parseIngredients();
        
        
        // Calculate Servings and time
        state.recipe.calcTime();
        state.recipe.calcServings();
        
        // Render Recipe        
        clearLoader(); 
        recipeView.renderRecipe(
            state.recipe,
            state.likes.isLiked(id)
      
        );
        }catch (err) {
            console.log(err);
            alert('Error processing recipe');
        }
        
    }
};

/* get item when window loads
window.addEventListener('hashchange', controlRecipe);
window.addEventListener('load', controlRecipe); 
*/
// Doing above as one with arrays and loops
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

/** 
*LIST CONTROLLER
*/

const controlList = () => {
    // Create a new list If there is none yet
    if (!state.list) state.list = new List();
    
    // Add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el => {
       const item = state.list.addItem(el.count, el.unit, el.ingredient); 
       listView.renderItem(item);
        
    });
}

// Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
   const id = e.target.closest('.shopping__item').dataset.itemid;
    
    // Handle the delete button
    
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        // Delete from state
        state.list.deleteItem(id);
        
        // Delete from UI
        listView.deleteItem(id);
        
        // Handle the count update
    } else if (e.target.matches('.shopping__count-value')) {
        // Read data from interface and update it in our state
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }
});


/** 
*LIKE CONTROLLER
*/
//TESTING 


const controlLike = () => {
    if (!state.likes) state.likes = new Likes();
    const currentID = state.recipe.id;
    
    // User has NOT yet liked current recipe
    if (!state.likes.isLiked(currentID)) {
        // Add like to the state
        const newLike = state.likes.addLike(
            currentID, 
            state.recipe.title, 
            state.recipe.author, 
            state.recipe.image
        );

        // Toggle the like button
        likesView.toggleLikeBtn(true);
        
        // Add like to UI List
        likesView.renderLikes(newLike);
        console.log(state.likes);
        
    // user HAS like the current recipe
    } else {
        // Remove like from the state
        state.likes.deleteLike(currentID);
        
        // Toggle the like button
         likesView.toggleLikeBtn(false);
        
        // Remove like from UI List
        likesView.deleteLike(currentID);
        
    }
    likesView.toggleLikeMenu(state.likes.getNumLikes());
};

// Restore liked recipes on page load 
window.addEventListener('load', () => {
    state.likes = new Likes();
    
    // Restore Likes
    state.likes.readStorage();
    
    // Toggle Like menu button
    likesView.toggleLikeMenu(state.likes.getNumLikes()); 
    
    // Render the existing likes
    state.likes.likes.forEach(like => likesView.renderLikes(like));
});


// Handling recipe button clicks

elements.recipe.addEventListener('click', e => {
    // targeting the css class or if it matches any child element of the btn-decrease class
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        //Decrease button is clicked.
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
        
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        //Increase button is clicked.
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        // Add ingredients to shopping list
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        //Like Controller
        controlLike();
    }
});








