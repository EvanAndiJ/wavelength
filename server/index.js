require('dotenv').config({
  debug: false 
})
const path = require('path')
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
//
const corsOptions = {
  origin: ["http://localhost:3001", 'https://evanandij.github.io', 'https://wavelength-ej23-2dd5b345718d.herokuapp.com']
};
app.use(cors(corsOptions))
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/build')))

app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
require('./controllers/ably.controller')(app);
require('./routes/room.routes')(app);
require('./routes/game.routes')(app);
require('./routes/admin.routes')(app);

app.get('*', (req, res) => {
  process.env.NODE_ENV === 'production'
    ? res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
    : res.sendFile(path.resolve(__dirname, '../client/public', 'index.html'))
}); 
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));