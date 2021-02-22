const express = require('express');
const router = express.Router();
const Datastore = require('nedb');

// db = {};
db.previews = new Datastore('./database/previews.db');
db.previews.loadDatabase();

router.get('/', (req, res) => {
    db.previews.find({}, (err, previews) => {
        if (err) res.status(500).json({ message: `Error encountered in GET method / - ${err}` });
        res.status(200).json(previews);
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;

    db.previews.findOne({ _id: id }, (err, preview) => {
        if (err) res.status(500).json({ message: `Error encountered in GET method /:id - ${err}` });
        res.status(200).json(previews);
    });
});

router.post('/create', (req, res) => {
    const { desc, brand, url, status } = req.body;
    const docPreview = {
        desc: desc,
        brand: brand,
        url: url,
        status: status
    }
    
    db.previews.insert(docPreview, (err, newPreview) => {
        if (err) res.status(500).json({ message: `Error encountered on POST method /create - ${err}` });
        res.status(200).json({ message: 'Preview Link was added successfully!' });
    });
});

router.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const { desc, brand, url, status } = req.body;

    db.previews.update({ _id: id }, {desc: desc,brand: brand, url: url, status: status}, {}, (err, numReplaced) => {
        if(err) res.status(500).json({ message: `Error encountered on POST method /edit - ${err}` })
        res.status(200).json({ message: 'Preview Link was edited successfully!', countReplaced: numReplaced });
    });
});

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;

    db.previews.remove({ _id: id }, {}, (err, numRemoved) => {
        if (err) res.status(500).json({ message: `Error encountered on DELETE method /delete - ${err}` })
        res.status(200).json({ message: 'Preview Link was deleted successfully!' });
    });
});


module.exports = router