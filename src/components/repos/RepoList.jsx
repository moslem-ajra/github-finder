import ReposItem from "./ReposItem";
function RepoList({ repos }) {
  return (
    <>
      {repos.map((repo) => (
        <ReposItem key={repo.id} repo={repo} />
      ))}
    </>
  );
}

export default RepoList;
