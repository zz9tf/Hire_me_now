var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ message: 'Hello from the server!' });
  // res.render('index', { title: 'Express' });
});

module.exports = router;
