class NoteView {
	#notesContainerElement = document.querySelector(".notes");
	#dialogAddElement = document.querySelector(".dialog--add");
	#idElement = document.querySelector("#id");
	#titleElement = document.querySelector("#title");
	#categoryElement = document.querySelector("#category");
	#descriptionElement = document.querySelector("#description");
	#descriptionCountElement = document.querySelector(".description-count");

	constructor() {
		this.#addHandlerEditNote();
		this.#addHandlerOpenDeleteDialog();
	}

	addHandlerToggleCompletion(handler) {
		this.#notesContainerElement.addEventListener("click", (event) => {
			const checkboxElement = event.target.closest(".button--checkbox");
			if (!checkboxElement) return;

			handler(checkboxElement.closest(".note").dataset.id);
		});
	}

	#addHandlerEditNote() {
		this.#notesContainerElement.addEventListener("click", (event) => {
			const editElement = event.target.closest(".button--edit");
			if (!editElement) return;

			const noteElement = event.target.closest(".note");

			this.#dialogAddElement.showModal();

			this.#idElement.value = noteElement.dataset.id;

			this.#titleElement.value = noteElement
				.querySelector(".note__title")
				.textContent.trim();

			this.#categoryElement.value = noteElement
				.querySelector(".note__category")
				.textContent.toLowerCase()
				.trim();

			this.#descriptionElement.value = noteElement
				.querySelector(".note__description")
				.textContent.trim();

			this.#descriptionCountElement.textContent =
				this.#descriptionElement.value.length;
		});
	}

	#addHandlerOpenDeleteDialog() {
		this.#notesContainerElement.addEventListener("click", (event) => {
			if (!event.target.closest(".button--delete")) return;

			document.querySelector(".dialog--delete").showModal();

			document.querySelector("#deleteId").value =
				event.target.closest(".note").dataset.id;
		});
	}

	addHandlerDeleteNote(handler) {
		this.#notesContainerElement.addEventListener("click", (event) => {
			if (event.target.closest(".button--confirm"))
				handler(document.querySelector("#deleteId").value);
			else if (
				event.target.closest(".button--close") ||
				event.target.closest(".button--cancel")
			)
				document.querySelector(".dialog--delete").close();
			else return;
		});
	}
}

export default new NoteView();
