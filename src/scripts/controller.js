import "../styles/main.scss";
import * as model from "./model.js";
import addView from "./views/addView.js";
import searchView from "./views/searchView.js";
import homeView from "./views/homeView.js";
import noteView from "./views/noteView.js";

const controlAddNote = function (note) {
	model.addNote(note);
	homeView.render(model.state.notes);
};

const controlEditNote = function (note) {
	model.editNote(note);
	homeView.render(model.state.notes);
};

const controlNote = function (note, add = false) {
	if (add) controlAddNote(note);
	else controlEditNote(note);
};

const getHash = function () {
	return window.location.hash.slice(1);
};

const controlRenderNotes = function () {
	const hash = getHash();

	if (!hash || hash === "all") homeView.render(model.state.notes);
	else {
		const filteredNotes = model.filterNotesByCategory(model.state.notes, hash);
		homeView.render(filteredNotes);
	}
};

const controlToggleCompletion = function (id) {
	model.toggleCompletion(id);

	controlRenderNotes();
};

const controlSearch = function (input) {
	const searchedNotes = model.searchNotes(model.state.notes, input);

	if (input !== "") {
		const hash = getHash();
		if (!hash || hash === "all") homeView.render(searchedNotes, true);
		else {
			const filteredSearchNotes = model.filterNotesByCategory(
				searchedNotes,
				hash,
			);
			homeView.render(filteredSearchNotes);
		}
	} else homeView.render(model.state.notes);
};

const controlDeleteNote = function (id) {
	model.deleteNote(id);
	homeView.render(model.state.notes);
};

const init = function () {
	addView.addHandlerAddNote(controlNote);
	searchView.addHandlerSearch(controlSearch);
	homeView.addHandlerRender(controlRenderNotes);
	noteView.addHandlerToggleCompletion(controlToggleCompletion);
	noteView.addHandlerDeleteNote(controlDeleteNote);
};
init();
