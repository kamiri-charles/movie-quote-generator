const Contributor = ({data, key}) => {
    return (
        <a className="contributor" href={data.url} key={key}>
            <img src={data.avatar_url} alt="contributor-avatar" />
            <span>{data.login}</span>
        </a>
    )
}

export default Contributor;