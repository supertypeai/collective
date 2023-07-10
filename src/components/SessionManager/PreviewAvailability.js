import Image from "next/image"
import SessionCard from "@/blocks/Body/SessionCard"

const PreviewAvailability = ({ user }) => {

    let available_slots = []

    if (available_slots.length === 0) {
        return (
            <div className="m-4 grid justify-items-center relative">
                {/* <Image src="empty.svg" alt="No Sessions Available Yet" width={200} height={200} /> */}
                <div className="z-20 absolute inset-0 flex flex-col items-center justify-center bottom-10">
                    <h5 className="tracking-tight font-medium">💡 You don&apos;t offer any sessions yet. It takes 90 seconds to create your first.</h5>
                </div>
                <div>
                    <div className="z-10 absolute inset-0 backdrop-blur-sm h-80 w-420"></div>
                    <SessionCard data={{ fullname: user.name }} />
                    <div className="h-8"></div>
                </div>
            </div>
        )
    }

    return (
        <div>PreviewAvailability</div>
    )
}

export default PreviewAvailability