import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addUploadView from './views/addUploadView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if (module.hot) module.hot.accept();

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    //   render spinner
    recipeView.renderSpinner();

    // set active class to the selected item
    resultsView.update(model.getSearchResultPage());
    bookmarksView.update(model.state.bookmark);

    //   1.Load recipe from API
    await model.loadRecipe(id);

    // Render receipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResult(query);

    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultPage());

    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderError();
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultPage(goToPage));

  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);

  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controllAddBookmark = function () {
  // add or delete bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  //update recipe view
  recipeView.update(model.state.recipe);

  // render bookmark
  bookmarksView.render(model.state.bookmark);
};

const controllBookmark = function () {
  bookmarksView.render(model.state.bookmark);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // show spinner
    addUploadView.renderSpinner();

    // upload recipe
    await model.uploadRecipe(newRecipe);

    //render recipe
    recipeView.render(model.state.recipe);

    // render bookmark
    bookmarksView.render(model.state.bookmark);

    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // success message
    addUploadView.renderMessage();

    // close fform window
    setTimeout(() => {
      addUploadView.toggleModal();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    addUploadView.renderError(err.message);
  }
};

//iife
(function () {
  bookmarksView.addHandelerRender(controllBookmark);
  recipeView.addHandelerRender(controlRecipe);
  recipeView.addHandlerUpdateServing(controlServings);
  recipeView.addHandlerAddBookmark(controllAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlPagination);
  addUploadView.addHandlerUpload(controlAddRecipe);
})();
