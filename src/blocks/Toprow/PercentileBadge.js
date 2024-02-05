import { useQuery } from "@tanstack/react-query";

import countryEmoji from '@/data/countryEmoji.json'
import countryCity from '@/data/countryCity.json'
import { BadgeFrame } from "./BadgeFrame";

const capitalize = s => s && s[0].toUpperCase() + s.slice(1)


const determineCountryFromCity = (city) => {
    const country = countryCity.find((country) => {
        return country.cities.includes(city.toLowerCase())
    })
    return country ? country.geoName : null
}

const determineLocation = (location) => {
    if (location) {
        // if location is one of object key in countryEmoji.json, return location, 
        // otherwise wrap in determineCountryFromCity
        const capitalizedLocation = capitalize(location)
        return countryEmoji[capitalizedLocation] ? capitalizedLocation : determineCountryFromCity(location)
    }
    return "Worldwide"
}

const PercentileBadge = ({ s_location, s_followers }) => {
    const location = determineLocation(s_location)

    // useQuery to call our githubRanker function in /api
    const { data: rankData, error: rankError, isLoading: rankLoading } = useQuery(
        ["githubRanker", s_location, s_followers],
        () => fetch(
            `/api/githubRanker?country=${location}&threshold=${s_followers}`
        ).then((res) => {
            return res.json()
        }),
        {
            staleTime: 1000 * 60 * 60 * 24, // 24 hours
            enabled: !!s_followers
        }
    );

    if (!rankLoading && !rankError && rankData.percentile > 90) {
        return <BadgeFrame count={rankData.percentile.toFixed(2)} type="percentile" emojiImg={countryEmoji[location]} />
    } else {
        return null
    }
}

export default PercentileBadge