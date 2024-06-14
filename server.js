const express = require('express');
const path = require('path');
const app = express();

app.get('', (_req, res) => {
    setTimeout(() => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    }, 3000)
});

app.use(express.static(path.join(__dirname, 'public')));

const port = 3363
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});