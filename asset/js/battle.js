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