const setupRepos = require('./scripts/repoSetup');

const {apiKey, user, template, usernames} = require("./constants.json");

// const createRepos = require('jharry-git-automation');

setupRepos(apiKey, user, template, usernames, true);