const axios = require('axios');

function setup(apiKey, user, template, details) {
    details.forEach(dets => {
        createRepo(apiKey, user, template, dets);
    });
}

function createRepo(apiKey, user, template, details) {
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
            "name": `${getRepoFromEmail(details.email)}`,
            "description": "Assessment Repository",
            "private": false
        })
    }

    axios(settings).then(res => addCollaborator(apiKey, user, details)).catch(err => console.error(err));
}
function getRepoFromEmail(email) {
    return `${email.substring(0, email.indexOf('.'))}_${email.substring(email.indexOf('.') + 1, email.indexOf('@'))}_assessment`;
}
function addCollaborator(apiKey, user, { email, username }) {
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://api.github.com/repos/${user}/${getRepoFromEmail(email)}/collaborators/${username}?permission=push`,
        "method": "PUT",
        "headers": {
            "Accept": "application/vnd.github.hellcat-preview+json",
            "Authorization": "token " + apiKey
        }
    }

    axios(settings).then(res => setRules(apiKey, user, email)).catch(err => console.error(err));
}

function setRules(apiKey, user, email) {
    const settings = {
        async: true,
        crossDomain: true,
        url: `https://api.github.com/repos/${user}/${getRepoFromEmail(email)}/branches/master/protection`,
        method: "PUT",
        headers: {
            "Accept": "application/vnd.github.luke-cage-preview+json",
            "Authorization": `token ${apiKey}`,
            "Content-Type": "application/json"
        },
        processData: false,
        data: JSON.stringify({ required_status_checks: null, enforce_admins: true, required_pull_request_reviews: { dismiss_stale_reviews: true, require_code_owner_reviews: true, required_approving_review_count: 1 }, restrictions: null })
    }

    axios(settings).catch(err => console.error(err));
}

module.exports = setup;