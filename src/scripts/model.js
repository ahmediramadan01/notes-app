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

export const editNote = function (note) {
	const noteIndex = state.notes.findIndex((n) => note.id === n.id);
	state.notes[noteIndex] = { ...state.notes[noteIndex], ...note };
	console.log(state.notes);

	persistNotes();
};

export const toggleCompletion = function (id) {
	const noteIndex = state.notes.findIndex((note) => note.id === +id);
	state.notes[noteIndex].completed = !state.notes[noteIndex].completed;

	persistNotes();
};

export const searchNotes = function (notes, input) {
	return notes.filter((note) =>
		note.title.toLowerCase().includes(input.toLowerCase()),
	);
};

export const filterNotesByCategory = function (notes, hash) {
	return notes.filter((note) => hash === note.category);
};

const init = function () {
	if (localStorage.getItem("notes"))
		state.notes = JSON.parse(localStorage.getItem("notes"));
};
init();
