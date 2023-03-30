import { BadgeFrame, MiniBadgeFrame } from './BadgeFrame';

const ForkBadge = ({ count }) => {

    if (count < 100) return null;

    const chooseImage = (count) => {
        if (count >= 1000) {
            return "/badges/1000fork.png"
        }
        if (count >= 500) {
            return "/badges/500fork.png"
        }
        if (count >= 300) {
            return "/badges/300fork.png"
        }
        if (count >= 100) {
            return "/badges/100fork.png"
        }
    }

    const badgesToRender = [
        <BadgeFrame count={count} type="fork" imgSrc={chooseImage(count)} color="pink-500" />
    ]

    if (count >= 300) badgesToRender.push(<MiniBadgeFrame count={100} type="fork" imgSrc={chooseImage(100)} color="pink-500" />)
    if (count >= 500) badgesToRender.push(<MiniBadgeFrame count={300} type="fork" imgSrc={chooseImage(300)} color="pink-500" />)
    if (count >= 1000) badgesToRender.push(<MiniBadgeFrame count={500} type="fork" imgSrc={chooseImage(500)} color="pink-500" />)
    if (count >= 5000) badgesToRender.push(<MiniBadgeFrame count={1000} type="fork" imgSrc={chooseImage(1000)} color="pink-500" />)

    return badgesToRender
}

export default ForkBadge