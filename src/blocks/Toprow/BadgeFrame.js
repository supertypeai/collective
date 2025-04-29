import React from 'react'
import Image from 'next/image'


const BadgeImg = ({ imgSrc, type }) => {
    return (
        <div className="col-span-1 row-span-2 self-center">
            <Image src={imgSrc} width={32} height={32} alt={type} className='inline' />
        </div>
    )
}

const colorBorder = {
    "commits": "border-rose-500",
    "followers": "border-violet-500",
    "stars": "border-fuchsia-600",
    "fork": "border-pink-500",
    "percentile": "border-red-600",
}

const colorText = {
    "commits": "text-rose-500",
    "followers": "text-violet-500",
    "stars": "text-fuchsia-600",
    "fork": "text-pink-500",
    "percentile": "text-red-600",
}

export const BadgeFrame = ({ count, type, imgSrc, emojiImg }) => {

    let emoji = {
        "commits": "📦",
        "followers": "🚩",
        "stars": "⭐",
    }

    return (
        <div className={`bg-black/30 rounded m-1 p-0.5 align-bottom cursor-pointer inline-flex grid-cols-3 grid-rows-2 gap-x-1 drop-shadow border-2 ${colorBorder[type]} dark:border-info`}>
            {imgSrc && <BadgeImg imgSrc={imgSrc} type={type} />}
            {emojiImg &&
                <div className="col-span-1 row-span-2 self-center">
                    <p className={`${colorText[type]} dark:text-info font-bold text-sm`}>{emojiImg}</p>
                </div>
            }
            <div className="col-span-2 text-center leading-none -top-[0.1rem] relative">
                <p className={`${colorText[type]} dark:text-info font-bold text-sm`}>{count.toLocaleString("en-US")}</p>
                <p className='text-[0.6rem]'>
                    {emoji[type]} {type}
                </p>
            </div>
        </div>
    )
}

export const MiniBadgeFrame = ({ count, type, imgSrc }) => {

    return (
        <div className={`bg-black/30 rounded m-1 p-1 cursor-pointer inline-flex grid-cols-3 grid-rows-2 gap-x-1 drop-shadow border-2 ${colorBorder[type]} dark:border-info`}>
            <div className="col-span-2 text-center leading-none -rotate-90">
                <p className={`${colorText[type]} dark:text-info font-bold text-sm`}>{count}</p>
                <p className='text-[0.4rem]'>{type}</p>
            </div>
            <BadgeImg imgSrc={imgSrc} type={type} />
        </div>
    )

}