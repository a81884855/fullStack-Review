const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: Number,
  username: String,
  repoName: String,
  url: {type: String, unique: true}
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (githubObj) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  //githubObj need bodyParser
  repoObj = {};
  for(var i =0; i < githubObj.length; i++){
    console.log(githubObj[i].owner.login)
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