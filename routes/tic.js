'use strict'

var express = require('express');
const { NotImplemented } = require('http-errors');
var router = express.Router();

var gridArray = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]

/* First User buat 0. Second user buat X */
var isFirstUSer = true

var firstMarker = '0'
var altMarker = 'X'

var isWin = false

/* GET users listing. */
/* Ni untuk display */
router.get('/', function(req, res, next) {
    var winning = ''
    if(isWin){
        winning = (isFirstUSer ? firstMarker : altMarker) + ' have won'
    }
    res.render('index', { 
        grid: gridArray, 
        isWin: isWin,
        winner: isWin ? (isFirstUSer ? firstMarker : altMarker): '',
        winningText: winning });
});

/* Ni untuk update location then redirect ke page tic */
/* Everytime dia masuk new location kena check sama ada dia dah menang/belum */
router.get('/:x/:y', function(req, res, next) {

    if(isWin) {
        return
    }

    if(isFirstUSer){
        gridArray[req.params.x][req.params.y] = firstMarker
    }
    else{        
        gridArray[req.params.x][req.params.y] = altMarker
    }

    /* Winning condition */
    /* Check row winning */
    for(var x = 0; x < gridArray.length;  x++){
        
        let marker = ''
        if(isFirstUSer){
            marker = firstMarker
        }
        else {
            marker = altMarker
        }

        const row = gridArray[x].filter(element => element === marker)

        if(row.length == gridArray[x].length){
            isWin = true
            break
        }
    }

    if(!isWin) {
        isFirstUSer = !isFirstUSer
    }

    /* First value akan jadi true, so bila sampai kat line ni, dia akan simpan value false pula */
    /* Reverse boolean so second user dapat jalan */
    //isFirstUSer = !isFirstUSer;
    res.redirect('/tic');
});

/* Ni untuk reset the game bila tekan button new game */
router.get('/new', function(req, res, next) {

    gridArray = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]

    /* Bila click new game, first user akan sentiasa jadi true */
    isFirstUSer = true;
    isWin = false;
    res.redirect('/tic');
});

module.exports = router;
