/* 
Get numbers required to be in the top n percentile of GitHub users in Indonesia

To call this API for indonesia, use the following URL:
- ~/api/githubRanker?country=indonesia
- ~/api/githubRanker?country=indonesia&threshold=5
*/

const fetchTotalGitHubUsersInCountry = async (country) => {

    // total active users (at least one repo)
    if (country === 'Worldwide') {
        const res = await fetch(`https://api.github.com/search/users?q=type:user+repos:%3E0`)
        const data = await res.json();
        return data['total_count']
    } else {
        const res = await fetch(`https://api.github.com/search/users?q=location:${country}+type:user+repos:%3E0`)
        const data = await res.json();
        return data['total_count']
    }

}

const fetchNumOfQualifiedGitHubUsersInCountry = async (country, threshold) => {

    if (country === 'Worldwide') {
        const res = await fetch(`https://api.github.com/search/users?q=type:user+followers:%3E${threshold}+repos:%3E0`)
        const data = await res.json();
        return data['total_count']
    } else {
        const res = await fetch(`https://api.github.com/search/users?q=location:${country}+type:user+followers:%3E${threshold}+repos:%3E0`)
        const data = await res.json();
        return data['total_count']
    }

    // filter by repos
    // const res = await fetch(`https://api.github.com/search/users?q=location:${country}+type:user+repos:%3E${threshold}`)
}


export default async function handler(req, res) {
    const country = req.query.country
    const followersThreshold = req.query.threshold

    const totalUser = await fetchTotalGitHubUsersInCountry(country)

    if (followersThreshold) {
        const qualifiedUser = await fetchNumOfQualifiedGitHubUsersInCountry(country, followersThreshold)
        const percentile = 100 - (qualifiedUser / totalUser) * 100
        res.status(200).json({ totalUser, qualifiedUser, percentile, country })
    }
    else {
        res.status(200).json({ totalUser })
    }
}

