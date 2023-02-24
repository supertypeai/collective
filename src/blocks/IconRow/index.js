import Image from 'next/image'

const IconRow = ({ tags, dark }) => {
    return (
        <div className="flex mb-4 space-x-16">
            {tags.map((tag, index) => <Image key={index} src={
                dark ? `/techicons/${tag}.png` : `/techicons/${tag}_inv.png`
            } width={50} height={50} alt={tag} />)}
        </div>
    )
}

export default IconRow