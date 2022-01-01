/**
 * --------------------- BASIC CONFIG ----------------------
 */
const express = require('express');
const { createServer } = require('http');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');

/**
* --------------------- ENV ----------------------
*/
require('dotenv').config();

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));


/**
*  ----------------------- CORS CONFIG -----------------------------
*/
app.use(cors());

const route = require('./routes');

/**
*  ----------------------- DB CONFIG -----------------------------
*/
const db = require('./config/db');
const { Mongoose } = require('mongoose');
db.connect();

/**
* ------------------ VIEW ENGINE & PUBLIC URL -------------------
*/
app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.set('view engine', 'pug');

/**
* ------------------ HTTP SERVER -------------------
*/
const httpServer = createServer(app);

/**
* ------------------ PORT LISTEN -------------------
*/
httpServer.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

/**
* ------------------ ROUTES -------------------
*/
route(app);
