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