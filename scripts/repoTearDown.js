const { request } = require('@octokit/request');

const getRepoName = require('./getRepoName');

const tearDown = (apiKey, owner, usernames) => {
    usernames.forEach(async username => {
        try {
            await request('DELETE /repos/{owner}/{repo}', {
                owner: owner,
                repo: getRepoName(username),
                headers: {
                    authorization: "token " + apiKey
                }
            });
        } catch (err) {
            console.log(err);
        }
    });
}

module.exports = tearDown;