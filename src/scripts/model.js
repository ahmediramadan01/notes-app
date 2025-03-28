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

export const toggleCompletion = function (noteId) {
	const noteIndex = state.notes.findIndex((note) => note.id === +noteId);
	state.notes[noteIndex].completed = !state.notes[noteIndex].completed;

	persistNotes();
};

const init = function () {
	if (localStorage.getItem("notes"))
		state.notes = JSON.parse(localStorage.getItem("notes"));
};
init();
