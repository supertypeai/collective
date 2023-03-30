import React from 'react'
import Image from 'next/image'


const BadgeImg = ({ imgSrc, type }) => {
    return (
        <div className="col-span-1 row-span-2 self-center">
            <Image src={imgSrc} width={32} height={32} alt={type} className='inline' />
        </div>
    )
}

export const BadgeFrame = ({ count, type, imgSrc, color }) => {

    const emoji = {
        "commits": "📦",
        "followers": "🚩",
        "stars": "⭐",
    }

    return (
        <div className={`bg-black/30 rounded m-1 p-0.5 align-bottom cursor-pointer inline-flex grid-cols-3 grid-rows-2 gap-x-1 drop-shadow border-2 border-${color} dark:border-info`}>
            <BadgeImg imgSrc={imgSrc} type={type} />
            <div className="col-span-2 text-center leading-none -top-[0.1rem] relative">
                <p className={`text-${color} dark:text-info font-bold text-sm`}>{count.toLocaleString()}</p>
                <p className='text-[0.6rem]'>
                    {emoji[type]} {type}
                </p>
            </div>
        </div>
    )
}

export const MiniBadgeFrame = ({ count, type, imgSrc, color }) => {

    return (
        <div className={`bg-black/30 rounded m-1 p-1 cursor-pointer inline-flex grid-cols-3 grid-rows-2 gap-x-1 drop-shadow border-2 border-${color} dark:border-info`}>
            <div className="col-span-2 text-center leading-none -rotate-90">
                <p className={`text-${color} dark:text-info font-bold text-sm`}>{count}</p>
                <p className='text-[0.4rem]'>{type}</p>
            </div>
            <BadgeImg imgSrc={imgSrc} type={type} />
        </div>
    )

}