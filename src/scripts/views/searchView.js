class SearchView {
	#searchElement = document.querySelector(".form-field--search__input");

	addHandlerSearch(handler) {
		this.#searchElement.addEventListener("input", function () {
			handler(this.value);
		});
	}
}

export default new SearchView();
