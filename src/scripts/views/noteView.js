class NoteView {
	_notesContainerElement = document.querySelector(".notes");

	addHandlerToggleCompleted(handler) {
		this._notesContainerElement.addEventListener("click", (event) => {
			const checkboxElement = event.target.closest(".note .button--checkbox");
			if (!checkboxElement) return;

			handler(checkboxElement.closest(".note").dataset.id);
		});
	}
}

export default new NoteView();
