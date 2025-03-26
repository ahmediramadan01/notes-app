export const state = {
	notes: [],
};

export const addNote = function (note) {
	state.notes.push(note);
};
