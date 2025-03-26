class AddNoteView {
	_dialogElement = document.querySelector(".dialog");
	_buttonOpenElement = document.querySelector(".button--open");
	_formElement = document.querySelector(".dialog__form");
	_buttonCloseElement = document.querySelector(".button--close");
	_buttonCancelElement = document.querySelector(".button--cancel");

	constructor() {
		this._addHandlerOpenDialog();
		this._addHandlerCloseDialog();
		this._addHandlerResetForm();
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

	addHandlerAddNote(handler) {
		this._formElement.addEventListener("submit", function (event) {
			event.preventDefault();

			const dataArray = [...new FormData(this)];
			const data = Object.fromEntries(dataArray);
			console.log(`🚀 ~ data ->`, data);

			handler(data);
		});
	}
}

export default new AddNoteView();
