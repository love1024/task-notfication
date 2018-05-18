// server.js
const express = require('express');
const compression = require('compression');
const mongoskin = require('mongoskin');
const bodyParser = require('body-parser');
const logger = require('morgan');
const http = require('http');
const webpush = require('web-push');

const app = express();

app.use(bodyParser.json());
app.use(logger());
app.use(compression());

const vapidKeys = {
  "publicKey": "BL9LgfHTIjkFSpDeCBL_bItVydd3cowIihsQKR5XWtey0jHiK-nHyMzgTdur-SXKwCJ46By0vaMeoTcTKhcmYE0",
  "privateKey": "fCJJVgLuWY2Nl0ElFjwz81dfJosj8NZ6Npe9lEe9FAg"
};

webpush.setVapidDetails(
  'mailto:lsk18mto@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);


const db = mongoskin.db('mongodb://lovepreet:project@ds227570.mlab.com:27570/project');

const userCollection = db.collection('users');
const taskCollection = db.collection('tasks');


// Run the app by serving the static files
// in the dist directory


app.use(express.static(__dirname + '/dist'));
// Start the app by listening on the default
// Heroku port

//MONGO DB SERVER REQUESTS

app.get('/', (req, res, next) => {
  collection.find({}, { limit: 10, sort: [['_id', -1]] })
    .toArray((err, results) => {
      if (err)
        return next(err);
      res.send(results);
    }
    );
});

app.get('/db/users', (req, res, next) => {
  userCollection.find({})
    .toArray((err, results) => {
      if (err)
        return next(err);
      res.send(results);
    }
    );
});

app.post('/db/users', (req, res, next) => {
  userCollection.insert(req.body, {}, (err, results) => {
    if (err)
      return next(err);
    res.send(results.ops);
  })
})

app.get('/db/tasks', (req, res, next) => {
  taskCollection.find({})
    .toArray((err, results) => {
      if (err)
        return next(err);
      res.send(results);
    }
    );
});

app.post('/db/tasks', (req, res, next) => {
  taskCollection.insert(req.body, {}, (err, results) => {
    if (err)
      return next(err);
    res.send(results.ops);
  })
})

app.post('/db/subscribe', (req, res, next) => {
  console.log(req.body);

  const notificationPayload = {
    "notification": {
      "title": "Angular News",
      "body": "Newsletter Available!",
      "icon": "assets/main-page-logo-small-hat.png",
      "vibrate": [100, 50, 100],
      "data": {
        "dateOfArrival": Date.now(),
        "primaryKey": 1
      },
      "actions": [{
        "action": "explore",
        "title": "Go to the site"
      }]
    }
  };

  webpush.sendNotification(
    req.body, JSON.stringify(notificationPayload))
    .then(() => res.status(200).json({ message: 'sent successfully.' }))
    .catch(err => {
      console.error("Error sending notification, reason: ", err);
      res.sendStatus(500);
    });
})



app.listen(process.env.PORT || 8080);
