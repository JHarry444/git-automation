const setupRepos = require('./scripts/repoSetup');

const {apiKey, user, template, usernames} = require("./constants.json");

setupRepos(apiKey, user, template, usernames, true);