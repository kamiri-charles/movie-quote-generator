const Contributor = ({ data }) => {
  return (
    <a className="contributor" href={data.html_url}>
      <img src={data.avatar_url} alt="contributor-avatar" />
      <span>{data.login}</span>
    </a>
  );
};

export default Contributor;
