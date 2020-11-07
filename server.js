// Entry point ot our backend
// NodeJs uses ES2015 modules unlike Front End Common JS
const express = require('express');
const connectDB = require('./config/db');
const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();
// Initialize middleware
app.use(express.json({ extended: false }));
// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

app.listen(PORT, () => console.log(`Viola, Server started on port ${PORT}`));
