import { BadgeFrame, MiniBadgeFrame } from './BadgeFrame';

const FollowersBadge = ({ count }) => {

    if (count < 100) return null;

    const chooseImage = (count) => {
        if (count >= 1000) {
            return "/badges/1000follow.png"
        }
        if (count >= 500) {
            return "/badges/500follow.png"
        }
        if (count >= 300) {
            return "/badges/300follow.png"
        }
        if (count >= 100) {
            return "/badges/100follow.png"
        }
    }
    const badgesToRender = [
        <BadgeFrame count={count} type="followers" imgSrc={chooseImage(count)} color="violet-500" />
    ]

    if (count >= 300) badgesToRender.push(<MiniBadgeFrame count={100} type="followers" imgSrc={chooseImage(100)} color="violet-500" />)
    if (count >= 500) badgesToRender.push(<MiniBadgeFrame count={300} type="followers" imgSrc={chooseImage(300)} color="violet-500" />)
    if (count >= 1000) badgesToRender.push(<MiniBadgeFrame count={500} type="followers" imgSrc={chooseImage(500)} color="violet-500" />)

    return badgesToRender
}

export default FollowersBadge