class SearchView {
	_searchElement = document.querySelector(".form-field--search__input");

	addHandlerSearch(handler) {
		this._searchElement.addEventListener("input", function () {
			handler(this.value);
		});
	}
}

export default new SearchView();
