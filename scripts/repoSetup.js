const { request } = require('@octokit/request');

const setup = (apiKey, owner, template, details, private = false) => {
    details.forEach(async username => {
        try {
            await createRepo(apiKey, owner, template, username, private);
            await addCollaborator(apiKey, owner, username);
            if (!private) await setRules(apiKey, owner, username);
        } catch (err) {
            console.log(err);
        }
    });
}

const createRepo = (apiKey, owner, template, username, private) => {
    return request('POST /repos/{template_owner}/{template_repo}/generate', {
        name: getRepoFromUser(username),
        owner: owner,
        template_owner: owner,
        template_repo: template,
        private: private,
        mediaType: {
            previews: [
                'baptiste'
            ]
        },
        headers: {
            authorization: `token ${apiKey}`
        }
    });
}

const addCollaborator = (apiKey, owner, username) => {
    return request('PUT /repos/{owner}/{repo}/collaborators/{username}', {
        owner: owner,
        repo: getRepoFromUser(username),
        username: username,
        permission: 'push',
        headers: {
            authorization: "token " + apiKey
        }
    });
}

const setRules = (apiKey, owner, username) => {
    return request('PUT /repos/{owner}/{repo}/branches/{branch}/protection', {
        owner: owner,
        repo: getRepoFromUser(username),
        branch: 'master',
        headers: {
            authorization: "token " + apiKey,
            accept: "application/vnd.github.v3+json"
        }
    });
}

module.exports = setup