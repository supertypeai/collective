import Image from 'next/image'

const FollowersBadge = ({ count }) => {

    if (count < 100) return null;

    const chooseImage = (count) => {
        if (count > 1000) {
            return "/badges/1000follow.png"
        }
        if (count > 500) {
            return "/badges/500follow.png"
        }
        if (count > 300) {
            return "/badges/300follow.png"
        }
        if (count > 100) {
            return "/badges/100follow.png"
        }
    }

    return (
        <div className="
            bg-black/30 rounded m-1 p-2 cursor-pointer inline-flex grid-cols-3 grid-rows-2 gap-x-1 drop-shadow border-2 border-violet-500">
            <div className="col-span-1 row-span-2">
                <Image src={chooseImage(count)} width={40} height={40} alt="followers" className='inline' />
            </div>
            <div className="col-span-2 self-center text-center leading-none">
                <p className='text-violet-500 font-bold text-md'>{count.toLocaleString()}</p>
                <p className='text-xs'>🚩followers</p>
            </div>
        </div>
    )
}

export default FollowersBadge