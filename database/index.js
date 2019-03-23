const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
var uniqueValidator = require('mongoose-unique-validator');

let repoSchema = new mongoose.Schema({
  // TODO: your schema here!
  id: Number,
  username: String,
  repoName: String,
  url: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (githubObj) => {
  repoObj = {};
  for(var i =0; i < githubObj.length; i++){
    repoObj.id = githubObj[i].id;
    repoObj.username = githubObj[i].owner.login;
    repoObj.repoName = githubObj[i].name;
    repoObj.url = githubObj[i].url;
    
    var repo = new Repo(repoObj);
    
    repo.save((err) => {console.log(err)})
  }
  
}

let get = function (callback){
  Repo.find((err, data)=>{
    if(err){
      console.log(err);
    } else {
      callback(data);
    }
  });
}


// console.log(test);

module.exports.save = save;
module.exports.get = get;