import "../styles/main.scss";
import * as model from "./model.js";
import addNoteView from "./views/addNoteView.js";
import notesView from "./views/notesView.js";
import noteView from "./views/noteView.js";
import searchView from "./views/searchView.js";

const controlAddNote = function (note) {
	model.addNote(note);
	addNoteView.closeDialog();
	notesView.render(model.state.notes);
};

const getHash = function () {
	return window.location.hash.slice(1);
};

const controlNotes = function () {
	const hash = getHash();

	if (!hash || hash === "all") notesView.render(model.state.notes);
	else {
		const filteredNotes = model.filterNotesByCategory(hash);
		notesView.render(filteredNotes);
	}
};

const controlToggleCompleted = function (id) {
	model.toggleCompletion(id);

	controlNotes();
};

const controlSearch = function (input) {
	const searchedNotes = model.searchNotes(input);

	if (input !== "") notesView.render(searchedNotes, true);
	else notesView.render(model.state.notes);
};

const init = function () {
	addNoteView.addHandlerAddNote(controlAddNote);
	notesView.addHandlerRender(controlNotes);
	noteView.addHandlerToggleCompleted(controlToggleCompleted);
	searchView.addHandlerSearch(controlSearch);
};
init();
