import Link from "next/link";
import { Mainframe } from "@/blocks/Mainframe";

const Page = () => {
    return (
        <Mainframe title="Supertype Collective | Privacy Policy">
            <main className='w-full prose lg:prose-xl my-4 max-w-6xl'>
                <h3 className="text-2xl">We are what we repeatedly do.</h3>
                <p className="text-sm text-gray-300">Expectations for being a member of the Supertype Collective. <br />
                    Last updated: 2023-07-11</p>

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
                                <div className=" md:col-span-5">
                                    <h3 className="font-semibold">The Supertype Philosophy</h3>
                                    <p className="font-light">
                                        Directly adapted from <Link href="https://www.supertype.ai/about-us" target="_blank">
                                            Supertype</Link>
                                    </p>
                                </div>
                                <dl className="md:pl-0 md:col-span-7">
                                    <dt className="font-bold mb-1">
                                        Take Ownership
                                    </dt>
                                    <dd className="mb-3">
                                        Own your success and your failures. Take great pride in the work you do. Treat your mentee&apos;s projects as your own.
                                    </dd>
                                    <dt className="font-bold mb-1">
                                        Take the Lead
                                    </dt>
                                    <dd className="mb-3">
                                        Start the conversation and take initiatives whether at work or your personal development goals. Don&apos;t be passive. Volunteer for opportunities. Initiate conversation on improving the organization.
                                    </dd>
                                    <dt className="font-bold mb-1">
                                        Take the Long-Term View
                                    </dt>
                                    <dd className="mb-3">
                                        Never sacrifice long-term goals for short-term advantages. Treat relationships with mentees and other members with a long term view. Nurture exceptional talents by investing in their education, and coach them with great patience and consistency.
                                    </dd>
                                    <dt className="font-bold mb-1">
                                        Bring Trust
                                    </dt>
                                    <dd className="mb-3">
                                        Give autonomy and don&apos;t set arbitrary deadlines. Trust that your mentees and fellow members are capable of making the right decisions
                                        for themselves, and for the community.
                                    </dd>
                                    <dt className="font-bold mb-1">
                                        Bring Mastery
                                    </dt>
                                    <dd className="mb-3">
                                        We don&apos;t believe in arbitrary career levels, only mastery level. You are never done learning. You can always refactor. You build your reputation on pillars of deep mastery and proficiency, not on degrees or prestigious titles. Set extremely high bars for yourself, every time.
                                    </dd>
                                    <dt className="font-bold mb-1">
                                        Bring Integrity
                                    </dt>
                                    <dd className="mb-3">
                                        Don&apos;t do the safe thing; Do the right thing. Insist on a high moral standard. Never compromise.
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

        </Mainframe >
    )
}

export default Page;