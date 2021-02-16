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