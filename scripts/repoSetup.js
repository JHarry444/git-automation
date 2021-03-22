const axios = require('axios');

const setup = (apiKey, user, template, details, private = false) => {
    details.forEach(async username => {
        try {
            await createRepo(apiKey, user, template, username, private);
            await addCollaborator(apiKey, user, username);
            if (!private) await setRules(apiKey, user, username);
        } catch (err) {
            console.log(err);
        }
    });
}

const createRepo = (apiKey, user, template, username, private) => {
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
            "private": private
        })
    };
    return axios(settings);
}

const getRepoFromUser = (user) => {
    return `${user}_assessment`;
}

const addCollaborator = (apiKey, user, username) => {
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

const setRules = (apiKey, user, username) => {
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

module.exports = setup