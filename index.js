var request = require('request');
var simpleGit = require('simple-git')();

request.get({
    url: 'https://api.github.com/repos/cglabnccu/3d16hw1/forks',
    headers: {
        'User-Agent': 'request'
    }
}, function (err, res) {
    var response = JSON.parse(res.body);
    var forks = response.map(function(repo) {
        return {
            name: repo.full_name.replace('/', '_'),
            clone_url: repo.clone_url
        };
    });

    // console.log(forks);

    forks.forEach(function(repo) {
        simpleGit.clone(repo.clone_url, repo.name);
    });
});