const setupRepos = require('./scripts/repoSetup');
const tearDownRepos = require('./scripts/repoTearDown');

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

const { apiKey, owner, template, usernames, private } = require("./constants.json");

if (argv.d || argv.delete) {
    tearDownRepos(apiKey, owner, usernames);
} else {
    setupRepos(apiKey, owner, template, usernames, private);
}