const Book = require('../models/Book');
const fs = require('fs');


exports.getAllBooks = (req, res, next) => {
    Book.find()
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }));
};

exports.getBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then(book => {
            if (!book) {
                return res.status(404).json({ error: 'Livre non trouvé' });
            }
            res.status(200).json(book);
        })
        .catch(error => res.status(400).json({ error }));
};

exports.getBestRating = (req, res, next) => {
    Book.find()
        .sort({ averageRating: -1})
        .limit(3)
        .then(books => {
            res.status(200).json(books);
        })
        .catch(error => res.status(400).json({ error }));
};

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

exports.updateBook = (req, res, next) => {
    const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Book.findOne({ _id: req.params.id })
        .then(book => {
            if (req.file) {
                const filename = book.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {});
            }
        })
    Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Livre modifié' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then(book => {
            const filename = book.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Book.deleteOne({ _id: req.params.id })
                    .then(() => res.status(201).json({ message: 'Livre supprimé' }))
                    .catch(error => res.status(401).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

exports.userRating = (req, res, next) => {
    const bookObject = {...req.body};
    
    Book.findOne({ _id: req.params.id })
        .then(book => {
            const newRating = {
                userId: req.auth.userId,
                grade: bookObject.rating
            };

            const ratings = [...book.ratings, newRating];
            const sum = ratings.reduce((total, rating) => total + rating.grade, 0);
            const averageRating = Math.floor(sum / ratings.length);
            book.ratings.push(newRating);
            book.averageRating = averageRating;

            Book.updateOne(
                { _id: req.params.id },
                {
                    $push: { ratings: newRating },
                    $set: { averageRating: averageRating }
                }
            )
            .then(() => {
                res.status(201).json(book);
            })
            .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(400).json({ error }));
};
