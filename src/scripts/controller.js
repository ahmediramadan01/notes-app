import "../styles/main.scss";
import * as model from "./model.js";
import addNoteView from "./views/addNoteView.js";
import notesView from "./views/notesView.js";
import searchView from "./views/searchView.js";

const controlAddNote = function (note) {
	model.addNote(note);
	addNoteView.closeDialog();
	notesView.render(model.state.notes);
};

const controlNotes = function () {
	const id = window.location.hash.slice(1);

	if (!id || id === "all") notesView.render(model.state.notes);
	else {
		const filteredNotes = model.state.notes.filter(
			(note) => id === note.category,
		);
		notesView.render(filteredNotes);
	}
};

const controlSearch = function (input) {
	const searchedNotes = model.state.notes.filter((note) =>
		note.title.toLowerCase().includes(input.toLowerCase()),
	);

	if (input !== "") notesView.render(searchedNotes, true);
	else notesView.render(model.state.notes);
};

const init = function () {
	addNoteView.addHandlerAddNote(controlAddNote);
	notesView.addHandlerRender(controlNotes);
	searchView.addHandlerSearch(controlSearch);
};
init();
