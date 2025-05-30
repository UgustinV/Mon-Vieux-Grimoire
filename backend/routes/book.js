const express = require('express');
const router = express.Router();

const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');
const bookCtrl = require('../controllers/book');

router.get('/bestrating', bookCtrl.getBestRating);
router.get('/', bookCtrl.getAllBooks);
router.get('/:id', bookCtrl.getBook);
router.post('/', auth, multer, bookCtrl.addBook);
router.put('/:id', auth, multer, bookCtrl.updateBook);
router.delete('/:id', auth, bookCtrl.deleteBook);
router.post('/:id/rating', auth, bookCtrl.userRating);

module.exports = router;