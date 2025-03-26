import "../styles/main.scss";
import * as model from "./model.js";
import addNoteView from "./views/addNoteView.js";

const controlAddNote = function (note) {
	model.addNote(note);
	addNoteView.closeDialog();
};

const init = function () {
	addNoteView.addHandlerAddNote(controlAddNote);
};
init();
