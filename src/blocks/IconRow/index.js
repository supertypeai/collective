import Image from 'next/image'

const IconRow = ({ tags, dark }) => {
    return (

        <div className="flex mb-4 space-x-16" >
            {tags.map((tag, index) => (
                <div className="tooltip flex" key={index} data-tip={tag}>
                    <Image src={
                        dark ? `/techicons/${tag}.png` : `/techicons/${tag}_inv.png`
                    } width={50} height={50} alt={tag} className="max-w-fit" />
                </div>
            ))}
        </div>
    )
}

export default IconRow