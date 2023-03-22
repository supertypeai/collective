import Image from 'next/image'

const StarBadge = ({ count }) => {

    if (count < 100) return null;

    const chooseImage = (count) => {
        if (count > 1000) {
            return "/badges/1000stars.png"
        }
        if (count > 500) {
            return "/badges/500stars.png"
        }
        if (count > 300) {
            return "/badges/300stars.png"
        }
        if (count > 100) {
            return "/badges/100stars.png"
        }
    }

    return (
        <div className="
            bg-black/30 rounded m-1 p-2 cursor-pointer inline-flex grid-cols-3 grid-rows-2 gap-x-1 drop-shadow border-2 border-fuchsia-600">
            <div className="col-span-1 row-span-2">
                <Image src={chooseImage(count)} width={40} height={40} alt="stars" className='inline' />
            </div>
            <div className="col-span-2 self-center text-center leading-none">
                <p className='text-fuchsia-600 font-bold text-md'>{count.toLocaleString()}</p>
                <p className='text-xs'>⭐stars</p>
            </div>
        </div>
    )
}

export default StarBadge