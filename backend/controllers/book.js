const Book = require('../models/Book');


exports.getAllBooks = (req, res, next) => {
    Book.find()
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }));
};

exports.getBook = (req, res, next) => {
    Book.findOne({ _id: req.params.bookid })
        .then(book => {
            if (!book) {
                return res.status(404).json({ error: 'Livre non trouvé' });
            }
            res.status(200).json(book);
        })
        .catch(error => res.status(400).json({ error }));
};

exports.getBestRating = (req, res, next) => {};

exports.addBook = (req, res, next) => {
    const bookJson = JSON.parse(req.body.book);
    delete bookJson._id;
    delete bookJson._userId;
    const book = new Book({
        ...bookJson,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    });
    book.save()
    .then(() => res.status(201).json({
        message: 'Livre enregistré'
    }))
    .catch(error => res.status(400).json({error}));
};

exports.updateBook = (req, res, next) => {};

exports.deleteBook = (req, res, next) => {};

exports.userRating = (req, res, next) => {};
