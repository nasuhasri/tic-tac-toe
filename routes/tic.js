'use strict';

var express = require('express');
const { NotImplemented } = require('http-errors');
var router = express.Router();

var gridArray = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

/* First User buat 0. Second user buat X */
var isFirstUSer = true;

var firstMarker = '0';
var altMarker = 'X';

var isWin = false;

/* GET users listing. */
/* Ni untuk display */
router.get('/', function (req, res, next) {
  var winning = '';
  if (isWin) {
    winning = (isFirstUSer ? firstMarker : altMarker) + ' have won';
  }
  res.render('index', {
    grid: gridArray,
    isWin: isWin,
    winner: isWin ? (isFirstUSer ? firstMarker : altMarker) : '',
    winningText: winning,
  });
});

/* Ni untuk update location then redirect ke page tic */
/* Everytime dia masuk new location kena check sama ada dia dah menang/belum */
router.get('/:x/:y', function (req, res, next) {
  if (isWin) {
    return;
  }

  if (isFirstUSer) {
    // assign first marker: 0 to first user
    gridArray[req.params.x][req.params.y] = firstMarker;
  } else {
    // assign second marker: X to second user
    gridArray[req.params.x][req.params.y] = altMarker;
  }

  let marker = '';

  if (isFirstUSer) {
    marker = firstMarker; // 0
  } else {
    marker = altMarker; // X
  }

  /* Winning condition */
  /* Check row winning */
  for (var x = 0; x < gridArray.length; x++) {
    // return element that same as marker
    // filter for row
    const row = gridArray[x].filter((element) => element === marker);

    // if number of element is same as the gridArray length, then user wins
    // eg row 0 has 3, the num same as gridArray length in any row so it wins
    // row condition
    if (row.length == gridArray[x].length) {
      isWin = true;
      console.log('row condition fired');
      break;
    }

    // column condition
    if (
      gridArray[0][x] == gridArray[1][x] &&
      gridArray[1][x] == gridArray[2][x] &&
      gridArray[2][x] != ''
    ) {
      isWin = true;
      console.log('column condition fired');
      break;
    }

    // diagonal condition right-left
    if (
      gridArray[0][0] == gridArray[1][1] &&
      gridArray[1][1] == gridArray[2][2] &&
      gridArray[2][2] != ''
    ) {
      isWin = true;
      console.log('diagonal condition right-left fired');
      break;
    }

    // diagonal condition left-right
    if (
      gridArray[2][0] == gridArray[1][1] &&
      gridArray[1][1] == gridArray[0][2] &&
      gridArray[0][2] != ''
    ) {
      isWin = true;
      console.log('diagonal condition left-right fired');
      break;
    }
  }

  if (!isWin) {
    isFirstUSer = !isFirstUSer;
  }

  /* First value akan jadi true, so bila sampai kat line ni, dia akan simpan value false pula */
  /* Reverse boolean so second user dapat jalan */
  //isFirstUSer = !isFirstUSer;
  res.redirect('/tic');
});

/* Ni untuk reset the game bila tekan button new game */
router.get('/new', function (req, res, next) {
  gridArray = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  /* Bila click new game, first user akan sentiasa jadi true */
  isFirstUSer = true;
  isWin = false;
  res.redirect('/tic');
});

module.exports = router;
