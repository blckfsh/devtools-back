const express = require('express');
const router = express.Router();
const Datastore = require('nedb');

db.accounts = new Datastore('./database/accounts.db');
db.accounts.loadDatabase();

router.get('/', (req, res) => {
    db.accounts.find({}, (err, accounts) => {
        if (err) res.status(500).json({ message: `Error encountered in GET method / - ${err}` });
        res.status(200).json(accounts);
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;

    db.accounts.findOne({ _id: id }, (err, account) => {
        if (err) res.status(500).json({ message: `Error encountered in GET method /:id - ${err}` });
        res.status(200).json(account);
    });
});

router.post('/create', (req, res) => {
    const { username, password, segment, brand, status } = req.body;
    const docAccount = {
        username: username,
        password: password,
        segment: segment,
        brand: brand,
        status: status
    }
    
    db.accounts.insert(docAccount, (err, newAccount) => {
        if (err) res.status(500).json({ message: `Error encountered on POST method /create - ${err}` });
        res.status(200).json({ message: 'Filter was added successfully!' });
    });
});

router.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const { username, password, segment, brand, status } = req.body;

    db.accounts.update({ _id: id }, {username: username, password: password, segment: segment, brand: brand, status: status}, {}, (err, numReplaced) => {
        if(err) res.status(500).json({ message: `Error encountered on POST method /edit - ${err}` })
        res.status(200).json({ message: 'Filter was edited successfully!', countReplaced: numReplaced });
    });
});

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;

    db.accounts.remove({ _id: id }, {}, (err, numRemoved) => {
        if (err) res.status(500).json({ message: `Error encountered on DELETE method /delete - ${err}` })
        res.status(200).json({ message: 'Filter was deleted successfully!' });
    });
});


module.exports = router