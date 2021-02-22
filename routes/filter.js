const express = require('express');
const router = express.Router();
const Datastore = require('nedb');

// db = {};
db.filters = new Datastore('./database/filters.db');
db.filters.loadDatabase();

router.get('/', (req, res) => {
    db.filters.find({}, (err, filters) => {
        if (err) res.status(500).json({ message: `Error encountered in GET method / - ${err}` });
        res.status(200).json(filters);
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;

    db.filters.findOne({ _id: id }, (err, filter) => {
        if (err) res.status(500).json({ message: `Error encountered in GET method /:id - ${err}` });
        res.status(200).json(filter);
    });
});

router.post('/create', (req, res) => {
    const { desc, brand, value, status } = req.body;
    const docFilter = {
        desc: desc,
        brand: brand,
        value: value,
        status: status
    }
    
    db.filters.insert(docFilter, (err, newFilter) => {
        if (err) res.status(500).json({ message: `Error encountered on POST method /create - ${err}` });
        res.status(200).json({ message: 'Filter was added successfully!' });
    });
});

router.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const { desc, brand, value, status } = req.body;

    db.filters.update({ _id: id }, {desc: desc,brand: brand, value: value, status: status}, {}, (err, numReplaced) => {
        if(err) res.status(500).json({ message: `Error encountered on POST method /edit - ${err}` })
        res.status(200).json({ message: 'Filter was edited successfully!', countReplaced: numReplaced });
    });
});

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;

    db.filters.remove({ _id: id }, {}, (err, numRemoved) => {
        if (err) res.status(500).json({ message: `Error encountered on DELETE method /delete - ${err}` })
        res.status(200).json({ message: 'Filter was deleted successfully!' });
    });
});


module.exports = router