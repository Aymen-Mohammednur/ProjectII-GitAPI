const baseURL = "https://api.github.com"

function fetchFromUrl(url) {
    url = url.replace(baseURL, "");
    return fetch(baseURL + url)
    .then((response)=>{
        if(response.ok) return response.json();
        throw  `Status ${response.status} with url ${response.url}`
    })
    .then((data)=>{
        return data;
    })
    .catch((err)=>{
        console.error("error:: ", err);
    });
}
function fetchPopularRepos(lang='all') {
    return fetchFromUrl(
      `/search/repositories?q=stars:%3E1+language:${lang}&sort=stars&order=desc&type=Repositories`
    );
}

function fetchUser(username) {
    return fetchFromUrl(`/users/${username}`);
}
function fetchUserRepoWithLang(username) {
    return fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "token b98c4245964820250563ab6342f92b5e53328cf6",
      },
      body: JSON.stringify({
                    query :` { 
            repositoryOwner(login:"${username}") { 
                repositories(first:100) {
                edges {
                node {
                    name
                    url
                    languages(first: 100, orderBy: {field: SIZE, direction: DESC}) {
                    totalCount
                    totalSize
                    edges {
                        size
                        node {
                            name
                        }
                    }
                    
                    }
                }
                }
                }
            }
            }
        `
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
       
        return data.data;
      })
      .catch((error)=>{console.log("Couldn't complete fetch: ", error)});
}