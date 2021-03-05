const cardDOM = document.querySelector("#cardTemplate");
const deckDOM = document.querySelector(".Cards__lists");
const navList = document.querySelectorAll(".Navigation__list");
const loaderDOM = document.querySelector(".loader");
const search = document.querySelector(".Search__input--input");

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

function renderCard(index, repoDetail) {
  const cloneCardDOM = cardDOM.cloneNode(true);
  cloneCardDOM.querySelector(".Cards__index").textContent = index;
  cloneCardDOM.querySelector(".Cards__title").textContent = repoDetail.name;
  cloneCardDOM.querySelector(".Cards__url").href = repoDetail.html_url;
  cloneCardDOM.querySelector(".Cards__name").textContent = repoDetail.login;
  cloneCardDOM.querySelector(".Cards__star").textContent =
    repoDetail.stargazers_count;
  cloneCardDOM.querySelector(".Cards__fork").textContent =
    repoDetail.forks_count;
  cloneCardDOM.querySelector(".Cards__issues").textContent =
    repoDetail.open_issues_count;
  cloneCardDOM.querySelector(".Cards__avatar").src = repoDetail.avatar_url;
  cloneCardDOM.querySelector(".Cards__avatar").alt = repoDetail.name;

  show(cloneCardDOM);
  deckDOM.appendChild(cloneCardDOM);
}

function renderCards(repoDetails) {
  hide(loaderDOM);
  repoDetails.map((repo, index) => {
    renderCard(index + 1, repo);
  });
}

function onClickEventToNavitgator() {
  navList.forEach((e) => {
    e.addEventListener("click", navigate);
  });
}

function selectNav(element) {
  document.querySelector(".Languages__box .active").classList.remove("active");
  element.classList.add("active");
}

function navigate(e) {
  element = e.target;
  selectNav(element);
  clearCards();
  show(loaderDOM);
  getPopulars(element.textContent).then((data) => {
    renderCards(data);
  });
}

function filter(e) {
  query = e.target.value;
  Array.from(document.querySelectorAll(".Cards__list")).forEach((card) => {
    project_title = card.querySelector(".Cards__title").textContent;
    if (!project_title.includes(query)) {
      card.style = "display:none";
    } else {
      card.style = "display:block";
    }
  });
}

(function initialization() {
  show(loaderDOM);
  search.addEventListener("keyup", filter);
  onClickEventToNavitgator();
  getPopulars().then((data) => {
    renderCards(data);
  });
})();
