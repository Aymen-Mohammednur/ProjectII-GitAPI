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