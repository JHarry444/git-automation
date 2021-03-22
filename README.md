# Repo Automation

## Purpose
This module allows for the creation of repositories from a template with pre-set restrictions for pushing to the master branch.

## Setup

First, make sure you have Node and NPM installed on your machine. (You can download the latest version [from here.](https://nodejs.org/en/))

Then clone down this repo and install the dependencies with `npm install`.

Once that's done you should now see a **node_modules** folder inside the project.

In order to configure the program you'll need to create a `constants.json` file with this structure:

```javascript
{
    "apiKey": "YOUR API KEY",
    "user": "YOUR USERNAME",
    "template": "NAME OF TEMPLATE REPO",
    "usernames": [
        "TRAINEE GITHUB USERNAMES"
    ]
}
```

Lastly, run the app using `npm start`.

## Documentation Used

https://developer.github.com/v3/

https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line

https://help.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-template-repository

https://developer.github.com/v3/repos/#create-repository-using-a-repository-template

https://developer.github.com/v3/repos/collaborators/#add-user-as-a-collaborator

https://developer.github.com/v3/repos/branches/#update-branch-protection