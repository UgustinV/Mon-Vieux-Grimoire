const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://augustinviard0:LlqhvMPhXNEiSmYn@cluster0.c5ol8m0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.post('/api/books', (req, res, next) => {
    console.log("Future db call")
    res.status(201).json({
        message : 'Book added successfully'
    })
});

app.get('/api/books', (req, res, next) => {
    const book = {
        id: 1,
        title: 'Example',
        rating: 0
    }
    res.status(200).json(book)
});

module.exports = app;