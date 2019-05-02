const newrelic = require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('request');
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
app.use(express.static(path.join(__dirname, '/../public/loaderio')));
// app.use('/:stockId', express.static(__dirname, '/../public/dist'));
app.use('/loaderio-881200a39f00d92cb43db8195ee79a0f', express.static(path.join(__dirname, '/../public/loaderio')));


app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});


app.get('/api/:stockId', (req, res) => {
  request(`ec2-3-14-71-109.us-east-2.compute.amazonaws.com:2468/api/${req.params.stockId}`, (error, response, body) => {
    console.log(body);
    if (error) {
      console.log(error);
      res.sendStatus(404);
    } else {
      res.status(200).json(body);
    }
  });
  // console.log(req.params.stockId);
  // console.log(typeof req.params.stockId);
  // axios({
  //   method: 'get',
  //   url: `ec2-3-14-71-109.us-east-2.compute.amazonaws.com/api/${req.params.stockId}`,
  //   port: 2468,
  // })
  //   .then((data) => {
  //     res.status(200).json(data.data);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     res.sendStatus(404);
  //   });
});
