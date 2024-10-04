const express = require('express');
const mongoose = require('mongoose');
const booksRoutes = require('./routes/books');
const userRoutes = require('./routes/user');
const path = require('path');
const password = require('./utils/password')


//  Connexion à la base de données
//  mongoose.connect(`mongodb+srv://Zineb:Po1aXeQqZhWwKcUt@cluster0-pme76.mongodb.net/test?retryWrites=true&w=majority`,
//    { useNewUrlParser: true,
//      useUnifiedTopology: true })
//    .then(() => console.log('Connexion à MongoDB réussie !'))
//    .catch(() => console.log('Connexion à MongoDB échouée !'));

  
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Zineb:Po1aXeQqZhWwKcUt@cluster0.6r5l7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// Création de l'application
const app = express();
// Middleware permettant à Express d'extraire le corps JSON des requêtes POST
app.use(express.json());

// Middleware gérant les erreurs de CORS
app.use((req, res, next) => {
    // Accès à notre API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Autorisation d'ajouter les headers mentionnés aux requêtes envoyées vers notre API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // Autorisation d'envoyer des requêtes avec les méthodes mentionnées
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Gestion de la ressource images de manière statique
app.use('../Frontend/src/images', express.static(path.join(__dirname, 'images')));

// Enregistrement des routeurs
app.use('/api/auth', userRoutes);
app.use('/api/books', booksRoutes);

module.exports = app;