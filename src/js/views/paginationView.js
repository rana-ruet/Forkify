import View from './view';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerPagination(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPage = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );

    //   1st page having other page
    if (curPage === 1 && numPage > 1) {
      return `
            <button data-goto="${
              curPage + 1
            }" class="btn--inline pagination__btn--next">
               <span>Page ${curPage + 1}</span>
               <svg class="search__icon">
               <use href="${icons}#icon-arrow-right"></use>
               </svg>
            </button>`;
    }

    // last page
    if (curPage === numPage && numPage > 1) {
      return `
            <button data-goto="${
              curPage - 1
            }" class="btn--inline pagination__btn--prev">
               <svg class="search__icon">
               <use href="${icons}#icon-arrow-left"></use>
               </svg>
               <span>Page ${curPage - 1}</span>
            </button>`;
    }
    //   other page
    if (curPage < numPage) {
      return `
            <button data-goto="${
              curPage - 1
            }" class="btn--inline pagination__btn--prev">
               <svg class="search__icon">
               <use href="${icons}#icon-arrow-left"></use>
               </svg>
               <span>Page ${curPage - 1}</span>
            </button>
            <button data-goto="${
              curPage + 1
            }" class="btn--inline pagination__btn--next">
               <span>Page ${curPage + 1}</span>
               <svg class="search__icon">
               <use href="${icons}#icon-arrow-right"></use>
               </svg>
            </button>`;
    }

    //   only one page
    return '';
  }
}

export default new PaginationView();
