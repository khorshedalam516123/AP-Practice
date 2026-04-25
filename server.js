const express = require('express');
const Unblocker = require('unblocker');
const path = require('path');
const app = express();

const unblocker = new Unblocker({ prefix: '/proxy/' });

// Use the proxy engine
app.use(unblocker);

// When you go to the main URL, show the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port).on('upgrade', unblocker.onUpgrade);

console.log("Server is running on port " + port);