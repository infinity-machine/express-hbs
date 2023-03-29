require('dotenv').config();
const express = require('express');
const PORT = process.env.port || 6969;
const path = require('path');
const db = require('./db/connect');
const { engine } = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const view_router = require('./routes/view_router');

const app = express();

app.use(express.static(path.join('static')));

app.engine('hbs', engine({ extname: '.hbs'}));
app.set('view engine', 'hbs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    store: new SequelizeStore({ db }),
    saveUninitialized: false,
    resave: false,
    cookie: {
        httpOnly: true
    }
}));

app.use('/', view_router)

app.listen(PORT, () => console.log(`SERVER SERVING @ PORT ${PORT}`));