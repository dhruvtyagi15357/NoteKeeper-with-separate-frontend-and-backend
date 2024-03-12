const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors')
const path = require("path");



connectToMongo();
const app = express();
port = 5000;
app.use(express.static(path.join(__dirname, "dist"))); // put this line of code in app.js

app.use(express.json())
// Available routes

app.use(cors())


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))



app.listen(port, () => {
  console.log(`NoteKeeper listening on port ${port}`)
})
