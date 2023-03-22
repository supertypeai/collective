import { useContext } from 'react';

import Image from 'next/image'

import Pills from '@/blocks/Pills'

import { MeContext } from '@/contexts/MeContext';
import CommitBadge from './CommitBadge';

export const scrollToSection = (sectionName) => {
    const section = document.querySelector(`#${sectionName}`);
    section.scrollIntoView({ behavior: "smooth", block: "start" });
};


function Toprow({ children }) {
    const data = useContext(MeContext);

    return (
        <>
            <div className="col-span-12 lg:col-span-4 justify-center justify-self-center mt-8">
                {/* align avatar to center of div */}
                <div className="flex justify-center mb-2">
                    <div className="avatar">
                        <div className="w-52 rounded-lg">
                            <Image src={data.superinference.profile.avatar_url}
                                alt={`${data.fullname} supertype`}
                                className="mt-8 object-cover rounded text-center" width={300} height={300} priority />
                        </div>
                    </div>
                </div>
                {/* 
                <Badge emoji={data.isExecutive ? "👔" : "⛑"} show={true}>
                    {data.isExecutive ? "executive" : "maker"}
                </Badge>
                <Badge count={data.superinference.stats.stargazers_count} emoji="⭐">stars</Badge>
                <Badge count={data.superinference.profile.followers} emoji="🚩">followers</Badge>
                <Badge count={data.superinference.stats.forks_count} emoji="🍴">forks</Badge> */}

                <CommitBadge count={data.superinference.activity.commit_count} />

            </div>
            <div className="mx-auto grid col-span-12 lg:col-span-8 justify-center justify-self-center lg:justify-self-start mt-8 adapt-xs max-w-sm sm:max-w-none">
                <div className="mx-auto sm:max-w-screen w-full lg:max-w-xl text-sm text-slate-200 ">
                    <h3 className="text-xl lg:text-3xl font-semibold leading-normal mb-2">
                        {data.fullname}
                    </h3>
                    <p className='mb-4'>{data.short || 'Full Stack Engineer'}</p>
                    <p className='mb-4'>{data.long || ''}</p>
                    {children}
                </div>
                <div className="mt-4">
                    <Pills tags={data.tags} maxWidth="800px"
                        onClick={
                            // () => scrollToSection(`aff-0`)
                            () => scrollToSection("affiliations")
                        }
                    />
                </div>
            </div>
        </>
    );
};

export default Toprow;