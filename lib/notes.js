const fs = require('fs');
const path = require('path');

function createNote(body, notesArr) {
    const note = body;
    notesArr.push(note);
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notesArr, null, 2));
    return note;
};

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
};

function deleteNote(note, notesArr) {
    
};

function findById(id, notesArr) {
    const result = notesArr.filter(note => note.id === id)[0];
    return result;
};

module.exports = {
    createNote,
    validateNote,
    deleteNote
};