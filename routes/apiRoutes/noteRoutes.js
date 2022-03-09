const router = require('express').Router();
const { createNote, validateNote, deleteNote, findById } = require('../../lib/notes');
const notes = require('../../db/db.json');
const uniqid = require('uniqid');

router.get('/notes', (req, res) => {
    res.json(notes);
});

router.post('/notes', (req, res) => {
    req.body.id = uniqid();

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
        res.json('note deleted');
    } else {
        res.status(404).json({ error: 'note note found'});
    }
});

module.exports = router;