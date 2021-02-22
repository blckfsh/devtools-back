const express = require('express');
const router = express.Router();
const Datastore = require('nedb');

db.tools = new Datastore('./database/tools.db');
db.tools.loadDatabase();

router.get('/', (req, res) => {
    db.tools.find({}, (err, tools) => {
        if (err) res.status(500).json({ message: `Error encountered in GET method / - ${err}` });
        res.status(200).json(tools);
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;

    db.tools.findOne({ _id: id }, (err, tool) => {
        if (err) res.status(500).json({ message: `Error encountered in GET method /:id - ${err}` });
        res.status(200).json(tool);
    });
});

router.post('/create', (req, res) => {
    const { desc, value, brand, status } = req.body;
    const docTool = {
        desc: desc,
        value: value,
        brand: brand,
        status: status
    }
    
    db.tools.insert(docTool, (err, newTool) => {
        if (err) res.status(500).json({ message: `Error encountered on POST method /create - ${err}` });
        res.status(200).json({ message: 'Filter was added successfully!' });
    });
});

router.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const { desc, value, brand, status } = req.body;

    db.tools.update({ _id: id }, {desc: desc, value: value, brand: brand, status: status}, {}, (err, numReplaced) => {
        if(err) res.status(500).json({ message: `Error encountered on POST method /edit - ${err}` })
        res.status(200).json({ message: 'Filter was edited successfully!', countReplaced: numReplaced });
    });
});

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;

    db.tools.remove({ _id: id }, {}, (err, numRemoved) => {
        if (err) res.status(500).json({ message: `Error encountered on DELETE method /delete - ${err}` })
        res.status(200).json({ message: 'Filter was deleted successfully!' });
    });
});


module.exports = router