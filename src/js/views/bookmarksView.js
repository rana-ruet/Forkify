import View from './view';
import previewView from './previewView';
import icons from 'url:../../img/icons.svg';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  _message = '';

  addHandelerRender(handeler) {
    window.addEventListener('load', handeler);
  }

  _generateMarkup(result = this._data) {
    return result.map(bookmark => previewView.render(bookmark, false)).join('');
  }
}

export default new BookmarksView();
