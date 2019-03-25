const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API
  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  console.log('database', username)
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  // console.log('searching', options.url);
  request.get(options, (err, res) => {
    if(err){
      console.log("2", err);
    }else{
      // console.log(JSON.parse(res.body));
      callback(JSON.parse(res.body));
    }
  })

}

module.exports.getReposByUsername = getReposByUsername;