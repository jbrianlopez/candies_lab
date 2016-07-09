const express = require('express');
const router = express.Router();
const allCandies = [
  {'id': 1, 'name': 'Chewing Gum', 'color': 'Red'},
  {'id': 2, 'name': 'Pez', 'color': 'Green'},
  {'id': 3, 'name': 'Marshmallow', 'color': 'Pink'},
  {'id': 4, 'name': 'Candy Stick', 'color': 'Blue'}
];

var index = 4
// empty object to store CREATEd object temporarily before pushing up to allCandies
var tempCandies = {
  name: '',
  color: ''
};

// from: http://enable-cors.org/server_expressjs.html
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// ROOT
// router.get('/', (req, res) => {
//   res.status(200).json({api_verion: 'v1.0.0', posts: '/candies'});
// });
router.get('/', (req, res) => {
  res.status(200).json(allCandies);
});

// INDEX
router.get('/', (req, res) => {
  res.status(200).json(allCandies);
});

// SHOW
router.get('/:id', (req, res) => {
  res.status(200).json(allCandies[req.params.id - 1]);
});

// new: typically no form

// CREATE
router.post('/', (req, res) => {
  console.log("in post now")
  console.log(req.body.color)
  if (req.body.color === "haha") {
    console.log(allCandies)
    res.status(422).json({'message': 'Wrong color'})
  }
  else {
  index++
  tempCandies.id = index;
  tempCandies.name = req.body.name;
  tempCandies.color = req.body.color;
  allCandies.push({id: index, name: req.body.name, color: req.body.color});
  console.log("Happy path")
  res.status(200).json(allCandies);
}
});

// edit: typically no form

// UPDATE
router.put('/:id', (req, res) => {
  allCandies[req.params.id - 1].name = req.body.name;
  allCandies[req.params.id - 1].color = req.body.color;
  res.status(200).json({'message': 'updated'});
});

// DELETE/DESTROY
router.delete('/:id', (req, res) => {
  allCandies.splice(req.params.id - 1, 1);
  res.status(200).json({'message': 'deleted'});
});

module.exports = router;
