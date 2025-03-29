class NoteView {
	_notesContainerElement = document.querySelector(".notes");
	_dialogAddElement = document.querySelector(".dialog--add");
	_buttonOpenElement = document.querySelector(".button--open");
	_formElement = document.querySelector(".dialog--add__form");
	_idElement = document.querySelector("#id");
	_titleElement = document.querySelector("#title");
	_categoryElement = document.querySelector("#category");
	_descriptionElement = document.querySelector("#description");
	_descriptionCountElement = document.querySelector(".description-count");
	_buttonCloseElement = document.querySelector(".button--close");
	_buttonCancelElement = document.querySelector(".button--cancel");

	constructor() {
		this._addHandlerOpenFormDialog();
		this._addHandlerCloseFormDialog();
		this._addHandlerResetForm();
		this._addHandlerDescriptionCount();
		this._addHandlerEditNote();
		this._addHandlerOpenDeleteDialog();
	}

	_resetForm() {
		this._formElement.reset();
	}

	openFormDialog() {
		this._dialogAddElement.showModal();
	}

	closeFormDialog() {
		this._dialogAddElement.close();
		this._resetForm();
	}

	_addHandlerOpenFormDialog() {
		this._buttonOpenElement.addEventListener(
			"click",
			this.openFormDialog.bind(this),
		);
	}

	_addHandlerCloseFormDialog() {
		this._buttonCloseElement.addEventListener(
			"click",
			this.closeFormDialog.bind(this),
		);
		this._buttonCancelElement.addEventListener(
			"click",
			this.closeFormDialog.bind(this),
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

			this.closeFormDialog();
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

			this._dialogAddElement.showModal();

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

	_addHandlerOpenDeleteDialog() {
		this._notesContainerElement.addEventListener("click", (event) => {
			if (!event.target.closest(".button--delete")) return;

			document.querySelector(".dialog--delete").showModal();

			document.querySelector("#deleteId").value =
				event.target.closest(".note").dataset.id;
		});
	}

	addHandlerDeleteNote(handler) {
		this._notesContainerElement.addEventListener("click", (event) => {
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
