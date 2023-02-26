import { useState } from 'react'
import Image from 'next/image'

const TechIcon = ({ key, tag, dark }) => {

    const originalSrc = dark ? `/techicons/${tag}.png` : `/techicons/${tag}_inv.png`
    const [imgSrc, setImgSrc] = useState(originalSrc)

    return (
        <div className="tooltip flex" key={key} data-tip={tag}>
            <Image
                src={imgSrc} width={50} height={50} alt={tag} className="max-w-fit"
                onError={() => {
                    setImgSrc(dark ? `/techicons/badge.png` : `/techicons/badge_inv.png`)
                }}
            />
        </div>
    )
}


const IconRow = ({ tags, dark }) => {
    return (
        <div className="flex mb-4 space-x-16" >
            {
                tags.map((tag, index) => <TechIcon key={index} tag={tag} dark={dark} />)
            }
        </div>
    )
}

export default IconRow