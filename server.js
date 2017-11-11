const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const cors = require('cors')

// Init app
const app = express();

// Enable CORS
app.use(cors())

// Bring in Models
let Article = require('./server/models/article');

// Body parser Middleware
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// Set Public folder
app.use(express.static(path.join(__dirname, 'public')));


// Route Files
const api = require('./server/routes/api');
app.use('/api', api);

const createIndex = require('./server/routes/createIndex');
app.use('/createIndex', createIndex);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});


//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));
