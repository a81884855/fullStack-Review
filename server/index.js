const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const helpers = require('../helpers/github.js');
const db = require('../database/index.js')

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  console.log(req.body.username);
  
  helpers.getReposByUsername(req.body.username, (result)=>{
    db.save(result, (err, success)=>{
      // if(err) console.log(err)
      // console.log(success)
    });
    res.status(200).send(result);
  })
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});



app.get('/repos', function (req, res) {
  db.get((data) => {
    res.status(200).json(data);
  })
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

