const express = require('express');
const Unblocker = require('unblocker');
const app = express();

const unblocker = new Unblocker({ prefix: '/proxy/' });

app.use(unblocker);

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>iPad Cloud Browser</title>
            <style>
                body { background: #121212; color: white; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
                input { width: 80%; padding: 15px; border-radius: 10px; border: none; font-size: 18px; outline: none; }
                button { margin-top: 15px; padding: 12px 30px; border-radius: 10px; border: none; background: #007aff; color: white; font-weight: bold; cursor: pointer; }
                h1 { margin-bottom: 20px; }
            </style>
        </head>
        <body>
            <h1>Cloud Browser</h1>
            <input type="text" id="url" placeholder="Enter URL (e.g., youtube.com)">
            <button onclick="go()">Browse</button>
            <script>
                function go() {
                    let url = document.getElementById('url').value;
                    if (!url.startsWith('http')) url = 'https://' + url;
                    window.location.href = '/proxy/' + url;
                }
            </script>
        </body>
        </html>
    `);
});

const port = process.env.PORT || 8080;
app.listen(port).on('upgrade', unblocker.onUpgrade);
console.log("Server running on port " + port);