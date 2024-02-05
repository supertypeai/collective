import Link from "next/link";
import { Mainframe } from "@/blocks/Mainframe";

const Page = () => {
    return (
        <Mainframe title="Supertype Collective | Privacy Policy">
            <main className='w-full prose lg:prose-xl my-4 max-w-6xl'>
                <h3 className="text-2xl">We are what we repeatedly do.</h3>
                <p className="text-sm text-gray-300">Expectations for being a member of the Supertype Collective. <br />
                    Last updated: 2023-07-12</p>

                <div className="divider"></div>

                <section className="dark:bg-gray-800 dark:text-gray-100">
                    <div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
                        <h2 className="mb-12 text-4xl font-bold leadi text-center sm:text-5xl">Community Guidelines</h2>
                        <div className="divide-y divide-gray-700">
                            <div className="py-6 space-y-2 md:grid md:grid-cols-12 md:gap-8 md:space-y-0">
                                <h3 className="font-semibold md:col-span-5">Do more for others</h3>
                                <p className="md:pl-0 md:col-span-7">
                                    Members in the Supertype Collective are expected to help one another. Whether participating in a discussion on our Discord channel, mentoring something new, or offering advice, we expect members to be constructive and supportive.
                                    We want a community that look out for each other.
                                    <br />
                                    <br />
                                    If your participation is highly self-serving (e.g engaging in excessive self-promotion, or asking for help without offering anything in return), you may be asked to leave the community.
                                </p>
                            </div>
                            <div className="py-6 space-y-2 md:grid md:grid-cols-12 md:gap-8 md:space-y-0">
                                <h3 className="font-semibold md:col-span-5">Do more for mastery</h3>
                                <p className="md:pl-0 md:col-span-7">
                                    Members in the Supertype Collective are expected to be committed to their craft. We want to be a community of people who are passionate about what they do, and are always looking to improve
                                    themselves and the people around them. You are encouraged to share your work, and propose ideas that elevate this community and its members.
                                    <br />
                                    <br />
                                    If you fall out of love with your craft, or are no longer interested in this pursuit of continual improvement, there are better places for you to be.
                                </p>
                            </div>
                            <div className="py-6 space-y-2 md:grid md:grid-cols-12 md:gap-8 md:space-y-0">
                                <div className="md:col-span-5">
                                    <h3 className="font-semibold">The Supertype Philosophy</h3>
                                    <p className="font-light">
                                        Directly adapted from <Link href="https://www.supertype.ai/about-us" target="_blank">
                                            Supertype</Link>
                                    </p>
                                </div>
                                <dl className="md:pl-0 md:col-span-7">
                                    <dt className="font-bold mb-1 text-info">
                                        Take Ownership
                                    </dt>
                                    <dd className="mb-3">
                                        Own your success and your failures. Take great pride in the work you do. Treat your mentee&apos;s projects as your own.
                                    </dd>
                                    <dt className="font-bold mb-1 text-info">
                                        Take the Lead
                                    </dt>
                                    <dd className="mb-3">
                                        Start the conversation and take initiatives whether at work or your personal development goals. Don&apos;t be passive. Volunteer for opportunities. Initiate conversation on improving the organization.
                                    </dd>
                                    <dt className="font-bold mb-1 text-info">
                                        Take the Long-Term View
                                    </dt>
                                    <dd className="mb-3">
                                        Never sacrifice long-term goals for short-term advantages. Treat relationships with mentees and other members with a long term view. Nurture exceptional talents by investing in their education, and coach them with great patience and consistency.
                                    </dd>
                                    <dt className="font-bold mb-1 text-info">
                                        Bring Trust
                                    </dt>
                                    <dd className="mb-3">
                                        Give autonomy and don&apos;t set arbitrary deadlines. Trust that your mentees and fellow members are capable of making the right decisions
                                        for themselves, and for the community.
                                    </dd>
                                    <dt className="font-bold mb-1 text-info">
                                        Bring Mastery
                                    </dt>
                                    <dd className="mb-3">
                                        We don&apos;t believe in arbitrary career levels, only mastery level. You are never done learning. You can always refactor. You build your reputation on pillars of deep mastery and proficiency, not on degrees or prestigious titles. Set extremely high bars for yourself, every time.
                                    </dd>
                                    <dt className="font-bold mb-1 text-info">
                                        Bring Integrity
                                    </dt>
                                    <dd className="mb-3">
                                        Don&apos;t do the safe thing; Do the right thing. Insist on a high moral standard. Never compromise.
                                    </dd>
                                </dl>
                            </div>
                            <div className="py-6 space-y-2 md:grid md:grid-cols-12 md:gap-8 md:space-y-0">
                                <div tabIndex={0} className="collapse collapse-plus  md:col-span-12">
                                    <div className="collapse-title text-xl font-medium">
                                        🎓 Mentor, Mentee and Sessions Guidelines
                                    </div>
                                    <div className="collapse-content">
                                        <ul className="list-disc list-inside">
                                            <li>
                                                <span className="font-semibold text-info">Availability and Attendance</span><br />
                                                As mentors, your Sessions availability must be kept up to date, so you can be booked by Mentees. You must attend all Sessions you are matched with, unless under extenuating circumstances and are able to provide
                                                a notice of at least 24 hours. Collected fees will be refunded and you will be marked as a no-show. Repeated no-shows will result in your mentorship privileges being revoked.<br />
                                                <br />
                                                As mentees, you must attend Sessions you have booked with your mentor unless a valid reason is provided and a notice of at least 24 hours is given. In most cases, Supertype will negotiate a reschedule with
                                                your mentor if you are unable to attend for a valid reason. No-shows without a valid reason and/or notice will result in the Session being marked as abandoned, and no refund will be provided.
                                            </li>
                                            <li>
                                                <span className="font-semibold text-info">Empathy and Respect</span><br />
                                                As mentors, you want to be empathetic, proactive and kind in all your interactions with your mentees. Be the mentor you wish you had when you were starting out. <br />
                                                <br />
                                                As mentees, you want to be respectful of your mentor&apos;s time and effort. This can be reflected by being prepared for your Sessions, showing up on time, and being appreciative of the work your mentor has put in to help you.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

        </Mainframe >
    )
}

export default Page;