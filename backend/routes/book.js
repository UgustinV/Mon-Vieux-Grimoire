const express = require('express');
const router = express.Router();

const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');
const bookCtrl = require('../controllers/book');

router.get('/', bookCtrl.getAllBooks);
router.get('/:bookid', bookCtrl.getBook);
router.get('/bestrating', bookCtrl.getBestRating);
router.post('/', auth, multer, bookCtrl.addBook);
router.put('/:bookid', auth, multer, bookCtrl.updateBook);
router.delete('/:bookid', auth, bookCtrl.deleteBook);
router.post('/:userid/rating', auth, bookCtrl.userRating);

module.exports = router;