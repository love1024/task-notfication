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
const subscriptions = db.collection('sub');


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
    if (req.body.email == "l@n.com")
      res.send(true);
    else
      res.send(false);
  });
});

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
    console.log(req.body[0].task);
    sendNotification(req.body[0].task);
  })
})

app.post('/db/subscribe', (req, res, next) => {

  subscriptions.insert(req.body, {}, (err, results) => {
    if (err)
      return next(err);
    res.send("saved");
  });

})


const notificationPayload = {
  "notification": {
    "title": "Erste Notification",
    "body": "Task To DO",
    "vibrate": [100, 50, 100],
    "data": {
      "dateOfArrival": Date.now(),
      "primaryKey": 1
    },
  }
};

function sendNotification(task) {
  subscriptions.find({})
    .toArray((err, results) => {
      if (err)
        return next(err);
      for (let i = 0; i < results.length; i++) {
        webpush.sendNotification(
          results[i], JSON.stringify(notificationPayload))
          .then(() => res.status(200).json({ message: 'sent successfully.' }))
          .catch(err => {
            console.error("Error sending notification, reason: ", err);
            res.sendStatus(500);
          });
      }
    }
    );
}

app.listen(process.env.PORT || 8080);
