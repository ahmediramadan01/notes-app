import checkboxIcon from "../../assets/icons/checkbox-icon.svg";
import checkboxCheckedIcon from "../../assets/icons/checkbox-checked-icon.svg";
import editIcon from "../../assets/icons/edit-icon.svg";
import deleteIcon from "../../assets/icons/delete-icon.svg";
import noNotesIllustration from "../../assets/icons/no-notes-illustration.svg";
import noSearchResultsIllustration from "../../assets/icons/no-search-results-illustration.svg";
import closeIcon from "../../assets/icons/close-icon.svg";

class HomeView {
	#data;

	#categoriesTabsElements = document.querySelectorAll(".categories__tab");
	#notesContainerElement = document.querySelector(".notes");

	#clearNotesContainer() {
		this.#notesContainerElement.innerHTML = "";
	}

	#generateNoNotesMarkup() {
		return `
    <figure class="no-notes">
      <img
        src="${noNotesIllustration}"
        alt="No notes illustration"
        width="207px"
        height="188px" />
      <figcaption>You don't have any notes</figcaption>
    </figure>
    `;
	}

	#generateNoSearchResultsMarkup() {
		return `
    <figure class="no-notes">
      <img
        src="${noSearchResultsIllustration}"
        alt="No search results illustration"
        width="207px"
        height="188px" />
      <figcaption>No notes found</figcaption>
    </figure>
    `;
	}

	#generateNotesMarkup() {
		return `
    <dialog class="dialog dialog--delete" >
      <input style="display: none" type="text" id="deleteId" name="deleteId" />
      <div class="dialog__header">
        <h2 class="dialog--delete__heading">Delete note</h2>
        <button
          class="button button--icon button--close">
          <img src="${closeIcon}" alt="Close icon" />
        </button>
      </div>
      <p class="dialog--delete__message">
        Are you sure you want to delete this note?
      </p>
      <div class="dialog__buttons">
        <button class="button button--cancel">
          Cancel
        </button>
        <button class="button button--confirm">Delete</button>
      </div>
    </dialog>
    ${this.#data
			.map((note) => {
				return `
        <article class="note ${note.completed ? "note--completed" : ""}" data-id="${note.id}">
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
                    src="${note.completed ? checkboxCheckedIcon : checkboxIcon}"
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
			.join("")}`;
	}

	render(data, search = false) {
		let markup;

		if (!data || (Array.isArray(data) && data.length === 0)) {
			if (search) markup = this.#generateNoSearchResultsMarkup();
			else markup = this.#generateNoNotesMarkup();
		} else {
			this.#data = data;
			markup = this.#generateNotesMarkup();
		}

		this.#clearNotesContainer();

		this.#notesContainerElement.insertAdjacentHTML("afterbegin", markup);
	}

	addHandlerRender(handler) {
		["load", "hashchange"].forEach((e) =>
			window.addEventListener(e, () => {
				this.#categoriesTabsElements.forEach((element) =>
					element.classList.remove("categories__tab--active"),
				);

				const id = window.location.hash.slice(1);
				document
					.querySelector(`a[href='#${!id ? "all" : id}']`)
					.classList.add("categories__tab--active");

				handler();
			}),
		);
	}
}

export default new HomeView();
