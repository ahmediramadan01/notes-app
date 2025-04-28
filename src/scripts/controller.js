import "../styles/main.scss";
import * as model from "./model.js";
import addNoteView from "./views/addNoteView.js";
import searchView from "./views/searchView.js";
import homeView from "./views/homeView.js";
import noteView from "./views/noteView.js";

function controlRenderNotes() {
	const category = window.location.hash.slice(1);
	if (model.state.search) homeView.render(model.filterNotes(category), true);
	else homeView.render(model.filterNotes(category));
}

function controlNote(note) {
	if (!model.state.notes.some((element) => element.id === note.id)) {
		model.addNote(note);
	} else {
		model.editNote(note);
	}
	controlRenderNotes();
}

function controlToggleCompletion(id) {
	model.toggleCompletion(id);
	controlRenderNotes();
}

function controlSearch(input) {
	model.state.search = input;
	controlRenderNotes();
}

function controlDeleteNote(id) {
	model.deleteNote(id);
	controlRenderNotes();
}

function init() {
	addNoteView.addHandlerAddNote(controlNote);
	homeView.addHandlerRender(controlRenderNotes);
	searchView.addHandlerSearch(controlSearch);
	noteView.addHandlerToggleCompletion(controlToggleCompletion);
	noteView.addHandlerDeleteNote(controlDeleteNote);
}
init();
