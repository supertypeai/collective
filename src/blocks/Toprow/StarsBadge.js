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
        <BadgeFrame count={count} type="stars" imgSrc={chooseImage(count)} key={count} />
    ]


    if (count >= 300) badgesToRender.push(<MiniBadgeFrame count={100} type="stars" imgSrc={chooseImage(100)} key={100} />)
    if (count >= 500) badgesToRender.push(<MiniBadgeFrame count={300} type="stars" imgSrc={chooseImage(300)} key={300} />)
    if (count >= 1000) badgesToRender.push(<MiniBadgeFrame count={500} type="stars" imgSrc={chooseImage(500)} key={500} />)

    return badgesToRender
}

export default StarBadge