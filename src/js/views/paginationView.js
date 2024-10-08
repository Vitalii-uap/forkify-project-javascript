import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkupButton(page, type) {
    return `
      <button data-goto="${page}" class="btn--inline pagination__btn--${type}">
        ${
          type === 'prev'
            ? `
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${page}</span>
        `
            : `
          <span>Page ${page}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        `
        }
      </button>
    `;
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton(curPage + 1, 'next');
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton(curPage - 1, 'prev');
    }

    // Other page
    if (curPage < numPages) {
      return `
        ${this._generateMarkupButton(curPage - 1, 'prev')}
        ${this._generateMarkupButton(curPage + 1, 'next')}
      `;
    }

    // Page 1, and there are NO other pages
    return ``;
  }

  //   _generateMarkup() {
  //     const curPage = this._data.page;
  //     const numPages = Math.ceil(
  //       this._data.results.length / this._data.resultsPerPage
  //     );

  //     // Page 1, and there are other pages
  //     if (curPage === 1 && numPages > 1) {
  //       return `<button class="btn--inline pagination__btn--next">
  //            <span>Page ${curPage + 1}</span>
  //             <svg class="search__icon">
  //               <use href="${icons}#icon-arrow-right"></use>
  //             </svg>
  //           </button>`;
  //     }
  //     // Last page
  //     if (curPage === numPages && numPages > 1) {
  //       return `<button class="btn--inline pagination__btn--prev">
  //             <svg class="search__icon">
  //               <use href="${icons}#icon-arrow-left"></use>
  //             </svg>
  //             <span>Page ${curPage - 1}</span>
  //           </button>
  //          `;
  //     }
  //     // Other page
  //     if (curPage < numPages) {
  //       return `<button class="btn--inline pagination__btn--prev">
  //         <svg class="search__icon">
  //           <use href="${icons}#icon-arrow-left"></use>
  //         </svg>
  //         <span>Page ${curPage - 1}</span>
  //       </button>

  //       <button class="btn--inline pagination__btn--next">
  //            <span>Page ${curPage + 1}</span>
  //             <svg class="search__icon">
  //               <use href="${icons}#icon-arrow-right"></use>
  //             </svg>
  //           </button>
  //      `;
  //     }
  //     // Page 1, and there are NO other pages
  //     return ``;
  //   }
}

export default new PaginationView();
