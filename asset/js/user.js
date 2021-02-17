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