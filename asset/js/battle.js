const userDOM = document.querySelector(".Battlers__user");
const usersListDOM = document.querySelector(".Battlers__users");
const addUserButton = document
  .querySelector(".Battlers__add")
  .querySelector("button");
const inputUserDOM = document.querySelector(".Battlers__input--input");
const battleButton = document
  .querySelector(".Battlers__submit")
  .querySelector("button");
const loaderDOM = document.querySelector(".loader");
const cardDOM = document.querySelector("#cardDOM");
const deckDOM = document.querySelector(".Cards__lists");

function UserDetail(data) {
    const {
      login,
      avatar_url,
      html_url,
      followers,
      location,
      name,
      public_repos,
      repos_url,
    } = data;
  
    let forks = 0,
      open_issues = 0,
      stargazers_count = 0,
      watchers = 0,
      score = 0;
  
    return {
      login,
      avatar_url,
      html_url,
      followers,
      location,
      name,
      public_repos,
      repos_url,
      forks,
      open_issues,
      stargazers_count,
      watchers,
      score,
    };
}

function renderUser(data) {
    const cloneUserDOM = userDOM.cloneNode(true);
    cloneUserDOM.querySelector(".Battlers__user--img").src = data.avatar_url;
    cloneUserDOM.querySelector(".Battlers__user--username").textContent =
      data.name || data.login;
    cloneUserDOM
      .querySelector(".Battlers__user--close")
      .addEventListener("click", () => {
        removeUser(cloneUserDOM);
      });
    cloneUserDOM.setAttribute("data", JSON.stringify(data));
    show(cloneUserDOM, "flex");
    usersListDOM.appendChild(cloneUserDOM);
}

function removeUser(element) {
    element.remove();
}

function addUser() {
    const username = inputUserDOM.value;
    fetchUser(username)
        .then((data) => {
        renderUser(UserDetail(data));
        battleButton.removeAttribute("disabled");
        })
        .catch(() => {});
    inputUserDOM.value = "";
    addUserButton.setAttribute("disabled", true);
}

function getList() {
    const result = Array.from(
      document
        .querySelector(".Battlers__users")
        .querySelectorAll(".Battlers__user")
    ).map((element) => {
      data = JSON.parse(element.getAttribute("data"));
      return new UserDetail(data);
    });
    return result;
}

function calculateScore(user) {

    let score = 0
  
    score =  (user.forks * 1.5) +
      (user.open_issues * 1.0) +
      (user.stargazers_count * 1.4) +
      (user.watchers * 1.3) +
      (user.followers * 1.2) +
      (user.public_repos);
    return score;
}

function calculateSum(accumulator, repo) {
    accumulator.forks += repo.forks;
    accumulator.open_issues += repo.open_issues;
    accumulator.stargazers_count += repo.stargazers_count;
    accumulator.watchers += repo.watchers;
    return accumulator;
}

function renderCard(index, userDetail) {
    const cloneCardDOM = cardDOM.cloneNode(true);
    cloneCardDOM.querySelector(".Cards__index").textContent = index;
    cloneCardDOM.querySelector(".Cards__score").textContent = userDetail.score;
    cloneCardDOM.querySelector(".Cards__username").textContent = userDetail.login;
    cloneCardDOM.querySelector(".Cards__url").href = userDetail.html_url;
    cloneCardDOM.querySelector(".Cards__name").textContent =
      userDetail.name || userDetail.login;
    cloneCardDOM.querySelector(".Cards__star").textContent =
      userDetail.stargazers_count;
    cloneCardDOM.querySelector(".Cards__fork").textContent = userDetail.forks;
    cloneCardDOM.querySelector(".Cards__issues").textContent =
      userDetail.open_issues;
    cloneCardDOM.querySelector(".Cards__avatar").src = userDetail.avatar_url;
    cloneCardDOM.querySelector(".Cards__avatar").alt = userDetail.name;
    cloneCardDOM.querySelector(".Cards__repos").textContent = userDetail.public_repos;
    cloneCardDOM.querySelector(".Card__location").textContent = userDetail.location;
    show(cloneCardDOM);
    deckDOM.appendChild(cloneCardDOM);
}

function renderCards(usersList) {
    hide(loaderDOM);
    clearCards();
    usersList.map((user, index) => {
      renderCard(index + 1, user);
    });
}

function battleUsers() {
    const users = getList();
    show(loaderDOM);
    Promise.all(
      users.map((data) =>
        fetchFromUrl(data.repos_url + "?per_page=" + data.public_repos)
      )
    ).then((allUsersRepos) => {
      for (let index = 0; index < allUsersRepos.length; index++) {
        const userRepos = allUsersRepos[index];
        users[index] = userRepos.reduce(calculateSum, users[index]);
      }
      users.forEach((user) => (user.score = calculateScore(user)));
      users.sort((a, b) => b.score - a.score);
      renderCards(users);
    });
}