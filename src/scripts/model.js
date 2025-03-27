export const state = {
	notes: [],
};

const persistNotes = function () {
	localStorage.setItem("notes", JSON.stringify(state.notes));
};

export const addNote = function (note) {
	state.notes.push(note);
	persistNotes();
};

const init = function () {
	if (localStorage.getItem("notes"))
		state.notes = JSON.parse(localStorage.getItem("notes"));
};
init();
