const languageDOM = document.querySelector(".Language__box");
const deckDOM = document.querySelector(".Cards__lists");
const inputDOM = document.querySelector(".Battlers__input--input");
const searchBtnDOM = document
  .querySelector(".Battlers__add")
  .querySelector("button");
const loaderDOM = document.querySelector(".loader");

let username = "aben-bel";


function getRepoWithLanguage(username = "aben-bel") {
  return fetchUserRepoWithLang(username).then((data) => {
    // return data;
    //  console.log(data);
    let repositories = data.repositoryOwner.repositories.edges;
    let repos = repositories.map((ele) => {
      const { totalSize } = ele.node.languages;
      return {
        repository: ele.node.name, // name
        url: ele.node.url, // link to repository
        languages: ele.node.languages.edges.map((lang) => {
          return {
            language: lang.node.name,
            percent: (lang.size / totalSize) * 100,
          };
        }),
      };
    });
    console.log(repos);
    return repos;
  });
}


function PriorityQueue() {
  this.elements = [];
  this.push = (item) => {
    if (this.elements.length === 0) {
      this.elements.push(item);
      return;
    }
    let left = 0, right = this.elements.length;
    while(left < right) {
        let mid = Math.floor(left + (right - left) / 2);
        if(this.elements[mid].percent < item.percent) {
            right = mid;
        } else {
            left = mid + 1
        }
    }
    this.elements.splice(left, 0, item);
  };
};

getListOfLanguages = (repositories) => {
  const languages = {};
  repositories.forEach((repo) => {
    const name = repo.repository;
    const url = repo.url;
    repo.languages.forEach((lang) => {
      const { percent, language } = lang;
      if (!languages[language]) {
        languages[language] = new PriorityQueue();
      }
      languages[language].push({ name, percent, url });
    });
  });
  console.log(languages);
  return languages;
};

getSortedLanguageKeys = (languages) => {
  return Object.keys(languages).sort(
    (a, b) => languages[b].elements.length - languages[a].elements.length
  );
};


renderLanguage = (language, repositories, index) => {
  // clearCards();
  const cloneLanguageDOM = languageDOM.cloneNode(true);
  cloneLanguageDOM.querySelector(
    ".Language__name"
  ).innerHTML = `<span style="color: #00000075"> #${index} </span> ${language}`;
  const ul = renderListOfRepositories(repositories, username);
  cloneLanguageDOM.querySelector(".Language__repository").appendChild(ul);
  hide(loaderDOM);
  show(cloneLanguageDOM);
  deckDOM.appendChild(cloneLanguageDOM);
};

renderListOfRepositories = (repositories, username) => {
  const ul = document.createElement("ul");
  ul.className = "Language__repository--lists";
  repositories.forEach(({ name, percent, url }) => {
    const li = document.createElement("li");
    li.className = "Language__repository--list";
    const a = document.createElement("a");
    a.className = " Language__repository--a";
    a.href = url;
    a.target = "_blank";
    a.textContent = `${name} | ${percent.toFixed()}%`;
    li.appendChild(a);
    ul.appendChild(li);
  });
  return ul;
};

renderAllLanguages = (sortedKeys, lang) => {
  sortedKeys.forEach((key, index) => {
    renderLanguage(key, lang[key].elements, index + 1);
  });
};

function search() {
  if (inputDOM.value === "") return;
  clearCards();
  show(loaderDOM);
  username = inputDOM.value;
  const reposToLang = getRepoWithLanguage(username).then((repos) => {
    const lang = getListOfLanguages(repos);
    const sortedKeys = getSortedLanguageKeys(lang);
    renderAllLanguages(sortedKeys, lang);
  });
}
