import View from './view';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _btnOpenModal = document.querySelector('.nav__btn--add-recipe');
  _btnCloseModal = document.querySelector('.btn--close-modal');
  _overlay = document.querySelector('.overlay');
  _modal = document.querySelector('.add-recipe-window');
  _message = 'Recipe was uploaded successfully :)';

  constructor() {
    super();
    this._addHandlerShowModal();
    this._addHandlerCloseModal();
  }

  toggleModal = () => {
    this._modal.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  };

  _addHandlerShowModal() {
    this._btnOpenModal.addEventListener('click', this.toggleModal);
  }

  _addHandlerCloseModal() {
    this._btnCloseModal.addEventListener('click', this.toggleModal);
    this._overlay.addEventListener('click', this.toggleModal);
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        this.toggleModal();
      }
    });
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', e => {
      e.preventDefault();
      const dataArr = [...new FormData(this._parentElement)];
      const data = Object.fromEntries(dataArr);

      handler(data);
    });
  }
}

export default new AddRecipeView();
