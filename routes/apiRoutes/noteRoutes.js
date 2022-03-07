const router = require('express').Router();
const { createNote, validateNote, deleteNote, findById } = require('../../lib/notes');
const notes = require('../../db/db.json');
const { randomID } = require('create-id');

router.get('/notes', (req, res) => {
    res.json(notes);
});

router.post('/notes', (req, res) => {
    const length = 10;
    const type = ["letter", "number"];

    req.body.id = randomID(length, type);

    if (!validateNote(req.body)) {
        res.status(400).send('The note was not properly formatted');
    } else {
        const note = createNote(req.body, notes);
        res.json(note);
    }
});

router.delete('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        deleteNote(result, notes);
        res.send('note deleted');
    } else {
        res.send(404);
    }
});

module.exports = router;