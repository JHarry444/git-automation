const axios = require('axios');

function setup(apiKey, user, template, details) {
    details.forEach(username => {
        createRepo(apiKey, user, template, username)
            .then(() => addCollaborator(apiKey, user, username))
            .then(() => setRules(apiKey, user, username))
            .catch(err => console.warn('Warning -', err));
    });
}

function createRepo(apiKey, user, template, username) {
    const settings = {
        "async": true,
        "crossDomain": true,
        "method": "POST",
        "url": `https://api.github.com/repos/${user}/${template}/generate`,
        "headers": {
            "Accept": "application/vnd.github.baptiste-preview+json",
            "Authorization": "token " + apiKey,
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "owner": user,
            "name": `${getRepoFromUser(username)}`,
            "description": "Assessment Repository",
            "private": false
        })
    };
    return axios(settings);
}

function getRepoFromUser(user) {
    return `${user}_assessment`;
}

function addCollaborator(apiKey, user, username) {
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://api.github.com/repos/${user}/${getRepoFromUser(username)}/collaborators/${username}?permission=push`,
        "method": "PUT",
        "headers": {
            "Accept": "application/vnd.github.hellcat-preview+json",
            "Authorization": "token " + apiKey
        }
    }

    return axios(settings);
}

function setRules(apiKey, user, username) {
    const settings = {
        async: true,
        crossDomain: true,
        url: `https://api.github.com/repos/${user}/${getRepoFromUser(username)}/branches/master/protection`,
        method: "PUT",
        headers: {
            "Accept": "application/vnd.github.luke-cage-preview+json",
            "Authorization": `token ${apiKey}`,
            "Content-Type": "application/json"
        },
        processData: false,
        data: JSON.stringify({ required_status_checks: null, enforce_admins: true, required_pull_request_reviews: { dismiss_stale_reviews: true, require_code_owner_reviews: true, required_approving_review_count: 1 }, restrictions: null })
    };
    return axios(settings);
}