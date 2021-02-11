const cardDOM = document.querySelector("#cardTemplate");
const deckDOM = document.querySelector(".Cards__lists");
const navList = document.querySelectorAll(".Navigation__list");
const loaderDOM = document.querySelector(".loader");

function RepoDetail(data) {
  const {
    owner,
    name,
    stargazers_count,
    watchers_count,
    forks_count,
    open_issues_count,
    html_url,
  } = data;
  const { login, avatar_url } = owner;

  return {
    login,
    html_url,
    name,
    stargazers_count,
    watchers_count,
    forks_count,
    open_issues_count,
    avatar_url,
  };
}
function getPopulars(lang = "All") {
  return fetchPopularRepos(lang).then((data) => {
    return data.items.map((item) => new RepoDetail(item));
  });
}