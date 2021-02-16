require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require("node-fetch");
const rateLimit = require("express-rate-limit");
const helmet = require('helmet');
const firebase = require('firebase/app');
require('firebase/firestore');

const app = express();

const limiter = rateLimit({
  windowMs: 1000, // 1 second
  max: 3, // limit each IP to 1 requests per windowMs
});

const corsOptions = {
  origin: 'https://almirleandro.github.io',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREABSE_KEY,
  authDomain: process.env.REACT_APP_FIREABSE_DOMAIN,
  projectId: process.env.REACT_APP_FIREABSE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREABSE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREABSE_SENDER_ID,
  appId: process.env.REACT_APP_FIREABSE_MESSAGING_APP_ID
};

firebase.initializeApp(firebaseConfig);

app.use(helmet());
app.use(express.json());
app.use(cors(corsOptions));
app.use(limiter);



app.get('/', (req, res) => {
  res.send('Server is running');
})

app.post("/tmdb/search", async (req, res) => {
  try {
    const pesquisa = req.body.pesquisa;
    const page = req.body.page;
  
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=pt-BR&query=${pesquisa}&page=${page}&include_adult=false`);
    const data  = await response.json();
    res.json(data);
  } catch (err) {
    return res.status(500).json("Couldn't fetch search data");
  }
})

app.post("/tmdb/movie", async (req, res) => {
  try {
    const filmeID = req.body.filmeID;
  
    const response = await fetch(`https://api.themoviedb.org/3/movie/${filmeID}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=pt-BR`);
    const data  = await response.json();
    res.json(data);
  } catch (err) {
    return res.status(500).json("Couldn't fetch movie data");
  }
})

app.post("/tmdb/credits", async (req, res) => {
  try {
    const filmeID = req.body.filmeID;
  
    const response = await fetch(`https://api.themoviedb.org/3/movie/${filmeID}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`);
    const data  = await response.json();
    res.json(data);
  } catch (err) {
    return res.status(500).json("Couldn't fetch movie credits");
  }
})

app.post("/tmdb/providers", async (req, res) => {
  try {
    const filmeID = req.body.filmeID;
  
    const response = await fetch(`https://api.themoviedb.org/3/movie/${filmeID}/watch/providers?api_key=${process.env.REACT_APP_TMDB_KEY}`);
    const data  = await response.json();
    res.json(data);
  } catch (err) {
    return res.status(500).json("Couldn't fetch movie providers");
  }
})

app.listen(process.env.PORT || 3002, () => {
  console.log(`Server is running on port ${process.env.PORT} or 3002`);
})