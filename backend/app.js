const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const userRoutes = require('./routes/user');
const bookRoutes = require('./routes/book');
const dbPassword = process.env.DB_PASSWORD;
const app = express();
mongoose.connect('mongodb+srv://augustinviard0:' + dbPassword + '@cluster0.c5ol8m0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
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

app.use('/api/auth', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/images', express.static('images'));

module.exports = app;
