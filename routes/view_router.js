const view_router = require('express').Router();

view_router.get('/', (req, res) => {
    res.render('home');
});

module.exports = view_router;