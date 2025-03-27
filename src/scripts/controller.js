import "../styles/main.scss";
import * as model from "./model.js";
import addNoteView from "./views/addNoteView.js";
import notesView from "./views/notesView.js";

const controlAddNote = function (note) {
	model.addNote(note);
	addNoteView.closeDialog();
	notesView.render(model.state.notes);
};

const init = function () {
	addNoteView.addHandlerAddNote(controlAddNote);
};
init();
