const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/news', async (req, res) => {
  try {
    const apiKey = '9988ad3ffb2f4c9693a6abba980b09a2'; 
    const category = req.query.category || ''; // Get the category from the query parameter
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
    
    const response = await axios.get(apiUrl);
    res.json(response.data); // Send the fetched news data to the frontend
  } catch (error) {
    res.status(500).send('Error fetching news');
  }
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
