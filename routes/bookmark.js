const express = require('express');
const router = express.Router();
const Datastore = require('nedb');

db = {};
db.bookmarks = new Datastore('./database/bookmarks.db');
db.bookmarks.loadDatabase();

router.get('/', (req, res) => {
    db.bookmarks.find({}, (err, bookmarks) => {
        if (err) res.status(500).json({ message: `Error encountered in GET method / - ${err}` });
        res.status(200).json(bookmarks);
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;

    db.bookmarks.findOne({ _id: id }, (err, bookmark) => {
        if (err) res.status(500).json({ message: `Error encountered in GET method /:id - ${err}` });
        res.status(200).json(bookmark);
    });
});

router.post('/create', (req, res) => {
    const { desc, brand, url, status } = req.body;
    const docBookmark = {
        desc: desc,
        brand: brand,
        url: url,
        status: status
    }
    
    db.bookmarks.insert(docBookmark, (err, newBookmark) => {
        if (err) res.status(500).json({ message: `Error encountered on POST method /create - ${err}` });
        res.status(200).json({ message: 'Bookmark was added successfully!' });
    });
});

router.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const { desc, brand, url, status } = req.body;

    db.bookmarks.update({ _id: id }, {desc: desc,brand: brand, url: url, status: status}, {}, (err, numReplaced) => {
        if(err) res.status(500).json({ message: `Error encountered on POST method /edit - ${err}` })
        res.status(200).json({ message: 'Bookmark was edited successfully!', countReplaced: numReplaced });
    });
});

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;

    db.bookmarks.remove({ _id: id }, {}, (err, numRemoved) => {
        if (err) res.status(500).json({ message: `Error encountered on DELETE method /delete - ${err}` })
        res.status(200).json({ message: 'Bookmark was deleted successfully!' });
    });
});


module.exports = router