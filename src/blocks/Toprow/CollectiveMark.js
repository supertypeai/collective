import Image from 'next/image'
import Link from 'next/link'

const CollectiveMark = () => {
    return (
        <h5 className='text-xs font-light'>
            <Link
                href="https://collective.supertype.ai"
                className="text-rose-200 hover:text-rose-100"
                target="_blank" rel="noopener noreferrer">
                <Image src="/techicons/badge_inv.png"
                    alt="Supertype Collective"
                    className="max-w-fit inline mr-2" width={20} height={20} priority />
                Supertype Collective
            </Link>
        </h5>

    )
}

export default CollectiveMark