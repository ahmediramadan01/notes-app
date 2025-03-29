class NoteView {
	_notesContainerElement = document.querySelector(".notes");
	_dialogElement = document.querySelector(".dialog");
	_buttonOpenElement = document.querySelector(".button--open");
	_formElement = document.querySelector(".dialog__form");
	_idElement = document.querySelector("#id");
	_titleElement = document.querySelector("#title");
	_categoryElement = document.querySelector("#category");
	_descriptionElement = document.querySelector("#description");
	_descriptionCountElement = document.querySelector(".description-count");
	_buttonCloseElement = document.querySelector(".button--close");
	_buttonCancelElement = document.querySelector(".button--cancel");

	constructor() {
		this._addHandlerOpenDialog();
		this._addHandlerCloseDialog();
		this._addHandlerResetForm();
		this._addHandlerDescriptionCount();
		this._addHandlerEditNote();
	}

	_resetForm() {
		this._formElement.reset();
	}

	openDialog() {
		this._dialogElement.showModal();
	}

	closeDialog() {
		this._dialogElement.close();
		this._resetForm();
	}

	_addHandlerOpenDialog() {
		this._buttonOpenElement.addEventListener(
			"click",
			this.openDialog.bind(this),
		);
	}

	_addHandlerCloseDialog() {
		this._buttonCloseElement.addEventListener(
			"click",
			this.closeDialog.bind(this),
		);
		this._buttonCancelElement.addEventListener(
			"click",
			this.closeDialog.bind(this),
		);
	}

	_addHandlerResetForm() {
		window.addEventListener("keydown", (event) => {
			if (event.key === "Escape") {
				this._resetForm();
			}
		});
	}

	_addHandlerDescriptionCount() {
		this._descriptionElement.addEventListener("input", (event) => {
			this._descriptionCountElement.textContent = event.target.value.length;
		});
	}

	addHandlerNote(handler) {
		this._formElement.addEventListener("submit", (event) => {
			event.preventDefault();
			let note;

			if (document.querySelector("#id").value === "") {
				const now = new Date();
				const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

				const noteArray = [...new FormData(this._formElement)];
				const noteObject = Object.fromEntries(noteArray);
				note = {
					...noteObject,
					id: String(Date.now()),
					creationDate: formattedDate,
					completed: false,
				};
				handler(note, true);
			} else {
				const noteArray = [...new FormData(this._formElement)];
				const noteObject = Object.fromEntries(noteArray);
				note = {
					...noteObject,
				};
				console.log(note);
				handler(note, false);
			}

			this.closeDialog();
		});
	}

	addHandlerToggleCompleted(handler) {
		this._notesContainerElement.addEventListener("click", (event) => {
			const checkboxElement = event.target.closest(".button--checkbox");
			if (!checkboxElement) return;

			handler(checkboxElement.closest(".note").dataset.id);
		});
	}

	_addHandlerEditNote() {
		this._notesContainerElement.addEventListener("click", (event) => {
			const editElement = event.target.closest(".button--edit");
			if (!editElement) return;

			const noteElement = event.target.closest(".note");

			this._dialogElement.showModal();

			this._idElement.value = noteElement.dataset.id;

			this._titleElement.value = noteElement
				.querySelector(".note__title")
				.textContent.trim();

			this._categoryElement.value = noteElement
				.querySelector(".note__category")
				.textContent.toLowerCase()
				.trim();

			this._descriptionElement.value = noteElement
				.querySelector(".note__description")
				.textContent.trim();

			this._descriptionCountElement.textContent =
				this._descriptionElement.value.length;
		});
	}
}

export default new NoteView();
