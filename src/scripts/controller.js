import "../styles/main.scss";
import * as model from "./model.js";
import notesView from "./views/notesView.js";
import noteView from "./views/noteView.js";
import searchView from "./views/searchView.js";

const controlAddNote = function (note) {
	model.addNote(note);
	notesView.render(model.state.notes);
};

const controlEditNote = function (note) {
	model.editNote(note);
	notesView.render(model.state.notes);
};

const controlNote = function (note, add = false) {
	if (add) controlAddNote(note);
	else controlEditNote(note);
};

const getHash = function () {
	return window.location.hash.slice(1);
};

const controlNotes = function () {
	const hash = getHash();

	if (!hash || hash === "all") notesView.render(model.state.notes);
	else {
		const filteredNotes = model.filterNotesByCategory(model.state.notes, hash);
		notesView.render(filteredNotes);
	}
};

const controlToggleCompleted = function (id) {
	model.toggleCompletion(id);

	controlNotes();
};

const controlSearch = function (input) {
	const searchedNotes = model.searchNotes(model.state.notes, input);

	if (input !== "") {
		const hash = getHash();
		if (!hash || hash === "all") notesView.render(searchedNotes, true);
		else {
			const filteredSearchNotes = model.filterNotesByCategory(
				searchedNotes,
				hash,
			);
			notesView.render(filteredSearchNotes);
		}
	} else notesView.render(model.state.notes);
};

const controlDeleteNote = function (id) {
	model.deleteNote(id);
	notesView.render(model.state.notes);
};

const init = function () {
	noteView.addHandlerNote(controlNote);
	noteView.addHandlerToggleCompleted(controlToggleCompleted);
	noteView.addHandlerDeleteNote(controlDeleteNote);
	notesView.addHandlerRender(controlNotes);
	searchView.addHandlerSearch(controlSearch);
};
init();
