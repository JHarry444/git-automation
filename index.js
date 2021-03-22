const setupRepos = require('./scripts/repoSetup');

const {apiKey, owner, template, usernames, private} = require("./constants.json");

setupRepos(apiKey, owner, template, usernames, private);