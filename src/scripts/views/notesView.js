import checkboxIcon from "../../assets/icons/checkbox-icon.svg";
import editIcon from "../../assets/icons/edit-icon.svg";
import deleteIcon from "../../assets/icons/delete-icon.svg";
import noNotesIllustration from "../../assets/icons/no-notes-illustration.svg";
import noSearchResultsIllustration from "../../assets/icons/no-search-results-illustration.svg";

class NotesView {
	_data;
	_notesContainerElement = document.querySelector(".notes");

	_clearNotesContainer() {
		this._notesContainerElement.innerHTML = "";
	}

	_generateNotesMarkup() {
		return this._data
			.map((note) => {
				return `
        <article class="note">
          <div class="note__header">
            <div class="note__category note__category--${note.category}">
              ${note.category.slice(0, 1).toUpperCase()}${note.category.slice(1)}
            </div>
            <ul class="note__buttons-list">
              <li>
                <button
                  class="button button--icon button--checkbox"
                  role="checkbox">
                  <img
                    src="${checkboxIcon}"
                    alt="Checkbox icon" />
                </button>
              </li>
              <li>
                <button class="button button--icon button--edit">
                  <img src="${editIcon}" />
                </button>
              </li>
              <li>
                <button class="button button--icon button--delete">
                  <img
                    src="${deleteIcon}"
                    alt="Delete icon" />
                </button>
              </li>
            </ul>
          </div>
          <h3 class="note__title">${note.title}</h3>
          <p class="note__description">
            ${note.description}
          </p>
          <time class="note__date" datetime="${note.creationDate}">${note.creationDate.split("-").reverse().join(".")}</time>
        </article>
        `;
			})
			.join("");
	}

	_renderNoNotes() {
		const markup = `
    <figure class="no-notes">
      <img
        src="${noNotesIllustration}"
        alt="No notes illustration"
        width="207px"
        height="188px" />
      <figcaption>You don't have any notes</figcaption>
    </figure>
    `;

		this._clearNotesContainer();

		this._notesContainerElement.insertAdjacentHTML("afterbegin", markup);
	}

	_renderNoSearchResults() {
		const markup = `
    <figure class="no-notes">
      <img
        src="${noSearchResultsIllustration}"
        alt="No search results illustration"
        width="207px"
        height="188px" />
      <figcaption>No notes found</figcaption>
    </figure>
    `;

		this._clearNotesContainer();

		this._notesContainerElement.insertAdjacentHTML("afterbegin", markup);
	}

	render(data, search = false) {
		if (!data || (Array.isArray(data) && data.length === 0)) {
			if (search) return this._renderNoSearchResults();
			else return this._renderNoNotes();
		}

		this._data = data;

		const markup = this._generateNotesMarkup();

		this._clearNotesContainer();

		this._notesContainerElement.insertAdjacentHTML("afterbegin", markup);
	}

	addHandlerRender(handler) {
		window.addEventListener("load", handler);
	}
}

export default new NotesView();
