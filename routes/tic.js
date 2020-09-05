var express = require('express');
var router = express.Router();

var gridArray = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]

/* GET users listing. */
router.get('/:i/:j', function(req, res, next) {
    res.render('index', { grid: gridArray });
});

module.exports = router;
