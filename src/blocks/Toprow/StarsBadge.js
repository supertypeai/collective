import { BadgeFrame, MiniBadgeFrame } from './BadgeFrame';

const StarBadge = ({ count }) => {

    if (count < 100) return null;

    const chooseImage = (count) => {
        if (count >= 1000) {
            return "/badges/1000stars.png"
        }
        if (count >= 500) {
            return "/badges/500stars.png"
        }
        if (count >= 300) {
            return "/badges/300stars.png"
        }
        if (count >= 100) {
            return "/badges/100stars.png"
        }
    }
    const badgesToRender = [
        <BadgeFrame count={count} type="stars" imgSrc={chooseImage(count)} color="fuchsia-600" />
    ]


    if (count >= 300) badgesToRender.push(<MiniBadgeFrame count={100} type="stars" imgSrc={chooseImage(100)} color="fuchsia-600" />)
    if (count >= 500) badgesToRender.push(<MiniBadgeFrame count={300} type="stars" imgSrc={chooseImage(300)} color="fuchsia-600" />)
    if (count >= 1000) badgesToRender.push(<MiniBadgeFrame count={500} type="stars" imgSrc={chooseImage(500)} color="fuchsia-600" />)
    if (count >= 5000) badgesToRender.push(<MiniBadgeFrame count={1000} type="stars" imgSrc={chooseImage(1000)} color="fuchsia-600" />)

    return badgesToRender
}

export default StarBadge