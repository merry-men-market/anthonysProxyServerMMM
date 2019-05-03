const newrelic = require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const morgan = require('morgan');
const path = require('path');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.locals.newrelic = newrelic;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(morgan('dev'));
// app.use(express.static(path.join(__dirname, 'public')));

// serve up loader
app.use(express.static(path.join(__dirname, '/public/loaderio')));
app.use('/loaderio-03bc510cad53b6b7783650de8f5dc113', express.static(path.join(__dirname, '/public/loaderio')));


app.listen(port, () => {
  console.log(`server running at: http://ec2-18-188-162-152.us-east-2.compute.amazonaws.com:${port}`);
});


app.get('/api/:stockId', (req, res) => {
  axios.get(`http://ec2-13-58-33-5.us-east-2.compute.amazonaws.com/api/${req.params.stockId}`)
    .then((data) => {
      res.status(200).json(data.data);
    })
    .catch((error) => {
      res.sendStatus(404);
    });
});
