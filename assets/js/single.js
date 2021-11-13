var issueContainerEl = document.querySelector('#issues-container')

var getRepoIssues = function (repo) {
  var apiUrl = 'https://api.github.com/repos/' + repo + '/issues?direction=asc'

  fetch(apiUrl).then(function (response) {
    // request was successful
    if (response.ok) {
      response.json().then(function (data) {
        // pass response to DOM function
        console.log(data)
        displayIssues(data)
      })
    } else {
      alert('There was a problem with your request.')
    }
  })
}

var displayIssues = function (issues) {
  if (issues.length === 0) {
    issueContainerEl.textContent = 'This repo has no open issues!'
    return
  }
  for (var i = 0; i < issues.length; i++) {
    var issueEl = document.createElement('a')
    issueEl.classList = 'list-item flex-row justify-space-between align-center'
    issueEl.setAttribute('href', issues[i].html_url)
    issueEl.setAttribute('target', '_blank')

    // create a span element to hold title
    var titleEl = document.createElement('span')
    titleEl.textContent = issues[i].title
    // append to issue container el
    issueEl.appendChild(titleEl)
    // create a span element for type
    var typeEl = document.createElement('span')
    // check if actual issue or pull request
    if (issues[i].pull_request) {
      typeEl.textContent = '(Pull request)'
    } else {
      typeEl.textContent = '(Issue)'
    }
    // append type el to issue el
    issueEl.appendChild(typeEl)
    // append issueEl to issue container element
    issueContainerEl.appendChild(issueEl)
  }
}

getRepoIssues('LSabin23/git-it-done')
