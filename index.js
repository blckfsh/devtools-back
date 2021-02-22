const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.get('/', (req, res) => {
    res.send('Welcome to Foxy Dev Tools!');
});

app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
})

//Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const bookmarks = require('./routes/bookmark');
app.use('/bookmarks', bookmarks);

const filters = require('./routes/filter');
app.use('/filters', filters);

const accounts = require('./routes/account');
app.use('/accounts', accounts)

const tools = require('./routes/tool');
app.use('/tools', tools)

const games = require('./routes/games');
app.use('/games', games);

const previews = require('./routes/preview');
app.use('/previews', previews);

app.listen(port, () => console.log(`Foxy Dev Tools app is listening to port ${port}!`))