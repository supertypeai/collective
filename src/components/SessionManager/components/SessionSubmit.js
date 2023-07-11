import Link from "next/link";

import Draft from "@/icons/Draft";
import Publish from "@/icons/Publish";

const SessionSubmit = ({ handleSubmit, saveData }) => {
    return (
        <>
            <div className="my-4">
                <button
                    onClick={handleSubmit((data) => saveData({
                        ...data,
                        is_live: true
                    }))}
                    className="btn btn-secondary text-white dark:btn-info"
                >
                    <Publish /> &nbsp;
                    Publish Session
                </button>
                <button
                    className="btn btn-outline ml-2"
                    onClick={handleSubmit((data) => saveData({
                        ...data,
                        is_live: false
                    }))}
                >
                    <Draft /> &nbsp;
                    Save as Draft
                </button>
            </div>

            <section className="text-xs">
                By publishing this session and accepting bookings, you agree to our
                <Link href="/terms-and-conditions" className="text-info"> Terms of Service</Link> and
                to comply with our <a href="/community-guidelines" className="text-info">Community Guidelines</a>.
            </section>
        </>
    )
}

export default SessionSubmit