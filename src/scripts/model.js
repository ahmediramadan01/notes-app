export const state = {
	notes: [],
	search: "",
	showCompleted: false,
};

export function addNote(note) {
	state.notes.push(note);
	persistNotes();
}

export function editNote(note) {
	const noteIndex = state.notes.findIndex((n) => note.id === n.id);
	state.notes[noteIndex] = { ...state.notes[noteIndex], ...note };
	persistNotes();
}

export function toggleCompletion(id) {
	const noteIndex = state.notes.findIndex((note) => note.id === id);
	state.notes[noteIndex].completed = !state.notes[noteIndex].completed;
	persistNotes();
}

export function filterNotes(category) {
	let filteredNotes = [...state.notes];
	if (state.showCompleted) {
		filteredNotes = state.notes.filter((note) => note.completed);
	}

	if (!category || category === "all")
		return filteredNotes.filter((note) =>
			note.title.toLowerCase().includes(state.search.toLowerCase()),
		);
	else
		return filteredNotes
			.filter((note) => category === note.category)
			.filter((note) =>
				note.title.toLowerCase().includes(state.search.toLowerCase()),
			);
}

export function deleteNote(id) {
	const noteIndex = state.notes.findIndex((note) => note.id === id);
	state.notes.splice(noteIndex, 1);
	persistNotes();
}

function persistNotes() {
	localStorage.setItem("notes", JSON.stringify(state.notes));
}

function getLocalNotes() {
	if (localStorage.getItem("notes"))
		state.notes = JSON.parse(localStorage.getItem("notes"));
}
getLocalNotes();
