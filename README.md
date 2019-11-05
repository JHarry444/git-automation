# Repo Automation

## Purpose
This module allows for the creation of repositories from a template with pre-set restrictions for pushing to the master branch.

## Documentation Used
https://developer.github.com/v3/

https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line

https://help.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-template-repository

https://developer.github.com/v3/repos/#create-repository-using-a-repository-template

https://developer.github.com/v3/repos/collaborators/#add-user-as-a-collaborator

https://developer.github.com/v3/repos/branches/#update-branch-protection
## Example
```javascript
const apiKey = 'MY_KEY';

const user = 'my_user';
const template = 'my_template_name';

const details = [{
    email: 'firstname.lastname@qa.com',
    username: 'username'
}];

const createRepos = require('./repos');

createRepos(apiKey, user, template, details);