class AddNoteView {
	_dialogElement = document.querySelector(".dialog");
	_buttonOpenElement = document.querySelector(".button--open");
	_formElement = document.querySelector(".dialog__form");
	_descriptionCountElement = document.querySelector(".description-count");
	_descriptionFieldElement = document.querySelector("#description");
	_buttonCloseElement = document.querySelector(".button--close");
	_buttonCancelElement = document.querySelector(".button--cancel");

	constructor() {
		this._addHandlerOpenDialog();
		this._addHandlerCloseDialog();
		this._addHandlerResetForm();
		this._addHandlerDescriptionCount();
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
		this._descriptionFieldElement.addEventListener("input", (event) => {
			this._descriptionCountElement.textContent = event.target.value.length;
		});
	}

	addHandlerAddNote(handler) {
		this._formElement.addEventListener("submit", function (event) {
			event.preventDefault();

			const now = new Date();
			const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

			const noteArray = [...new FormData(this)];
			const noteObject = Object.fromEntries(noteArray);
			const note = {
				...noteObject,
				creationDate: formattedDate,
				completed: false,
			};

			handler(note);
		});
	}
}

export default new AddNoteView();
