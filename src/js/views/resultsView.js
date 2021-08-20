import View from './view';
import previewView from './previewView';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errMessage = 'No recipes found for your query. Please try another!';
  _message = 'Start by searching for a recipe or an ingredient. Have fun!';

  _generateMarkup(result = this._data) {
    return result.map(bookmark => previewView.render(bookmark, false)).join('');
  }
}

export default new ResultsView();
