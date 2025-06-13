const express = require('express');
const router = express.Router();

const multer = require('../middleware/multer-config');
const resizeImage = require('../middleware/resizeImage');
const auth = require('../middleware/auth');
const bookCtrl = require('../controllers/book');

router.get('/bestrating', bookCtrl.getBestRating);
router.get('/', bookCtrl.getAllBooks);
router.get('/:id', bookCtrl.getBook);
router.post('/', auth, multer, resizeImage, bookCtrl.addBook);
router.put('/:id', auth, multer, resizeImage, bookCtrl.updateBook);
router.delete('/:id', auth, bookCtrl.deleteBook);
router.post('/:id/rating', auth, bookCtrl.userRating);

module.exports = router;