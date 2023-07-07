import Image from "next/image"
const CurrentSessions = () => {
    return (
        <div className="m-4 grid justify-items-center relative">
            <Image src="empty.svg" alt="Create your first Session." width={200} height={200} />
            <h3 className="font-display text-lg font-semibold text-gray-300">Offer your first Session to get started.</h3>
        </div>
    )
}

export default CurrentSessions