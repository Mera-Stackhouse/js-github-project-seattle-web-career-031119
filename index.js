const SEARCH_API_URL = "https://api.github.com/search/users?q="
const REPOS_API_URL = "https://api.github.com/users/"

const form = document.getElementById('github-form')
const usersUl = document.getElementById('user-list')
const reposUl = document.getElementById('repos-list')

form.addEventListener('submit', handleSearch)

function handleSearch(ev) {
  ev.preventDefault()
  const input = document.getElementById('search')
  fetch(SEARCH_API_URL + input.value)
    .then(resp => resp.json())
    .then(json => displayUsers(json))
}

function displayUsers(json) {
  json.items.forEach( (user) => {
    const li = document.createElement('li')
    usersUl.appendChild(li)

    const img = document.createElement('img')
    img.src = user.avatar_url
    li.appendChild(img)

    const h3 = document.createElement('h3')
    h3.textContent = user.login
    h3.addEventListener('click', () => handleClick(user))
    li.appendChild(h3)

    const a = document.createElement('a')
    a.setAttribute('href', "https://github.com/" + user.login)
    a.textContent = "Profile"
    li.appendChild(a)
  })
}

function handleClick(user) {
  fetch(user.repos_url)
    .then(resp => resp.json())
    .then(json => displayRepos(json))
}

function clearRepos() {
  while (reposUl.firstChild) {
    reposUl.firstChild.remove()
  }
}

function displayRepos(json) {
  clearRepos()
  json.forEach( (repo) => {
    const li = document.createElement('li')
    reposUl.appendChild(li)

    const h4 = document.createElement('h4')
    h4.textContent = repo.name
    li.appendChild(h4)

    const span = document.createElement('span')
    span.textContent = "Created at " + repo.created_at
    li.appendChild(span)

    const p = document.createElement('p')
    p.textContent = repo.description
    li.appendChild(p)

    const a = document.createElement('a')
    a.setAttribute('href', repo.html_url)
    a.textContent = "Repo Link"
    li.appendChild(a)
  })
}
