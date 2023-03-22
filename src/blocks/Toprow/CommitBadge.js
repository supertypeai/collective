import Image from 'next/image'

const CommitBadge = ({ count }) => {

    if (count < 100) return null;

    const chooseImage = (count) => {
        if (count > 1000) {
            return "/badges/1000commit.png"
        }
        if (count > 300) {
            return "/badges/300commit.png"
        }
        if (count > 100) {
            return "/badges/100commit.png"
        }
    }

    return (
        <div className="bg-black/30 rounded m-1 p-2 cursor-pointer inline-flex grid-cols-3 grid-rows-2 gap-x-1 drop-shadow border-2 border-rose-500">
            <div className="col-span-1 row-span-2">
                <Image src={chooseImage(count)} width={50} height={50} alt="1000 commits" className='inline' />
            </div>
            <div className="col-span-2 self-center text-center">
                <p className='text-rose-500 font-bold text-md'>{count.toLocaleString()}</p>
                <p className='text-xs'>📦commits</p>
            </div>
        </div>
    )
}

export default CommitBadge