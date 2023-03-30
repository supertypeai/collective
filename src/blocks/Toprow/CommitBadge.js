import { BadgeFrame, MiniBadgeFrame } from './BadgeFrame';

const CommitBadge = ({ count }) => {

    if (count < 100) return null;

    const chooseImage = (count) => {
        if (count >= 5000) {
            return "/badges/5000commit.png"
        }
        if (count >= 1000) {
            return "/badges/1000commit.png"
        }
        if (count >= 300) {
            return "/badges/300commit.png"
        }
        if (count >= 100) {
            return "/badges/100commit.png"
        }
    }

    const badgesToRender = [
        <BadgeFrame count={count} type="commits" imgSrc={chooseImage(count)} color="rose-500" />
    ]

    if (count >= 300) badgesToRender.push(<MiniBadgeFrame count={100} type="commits" imgSrc={chooseImage(100)} color="rose-500" />)
    if (count >= 1000) badgesToRender.push(<MiniBadgeFrame count={300} type="commits" imgSrc={chooseImage(300)} color="rose-500" />)
    if (count >= 5000) badgesToRender.push(<MiniBadgeFrame count={1000} type="commits" imgSrc={chooseImage(1000)} color="rose-500" />)

    return badgesToRender

}

export default CommitBadge