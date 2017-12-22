// apiRoutes/users.js
const router = require('express').Router();

// matches GET requests to /api/users/
router.get('/', function (req, res, next) { /* etc */});
// matches POST requests to /api/users/
router.post('/', function (req, res, next) { /* etc */});
// matches PUT requests to /api/users/:puppyId
router.put('/:puppyId', function (req, res, next) { /* etc */});
// matches DELTE requests to /api/users/:puppyId
router.delete('/:puppyId', function (req, res, next) { /* etc */});

module.exports = router;
