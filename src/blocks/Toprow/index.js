import { useContext } from 'react';
import Image from 'next/image'

import scrollToSection from '@/utils/scrollToSection';
import Pills from '@/blocks/Pills'
import CommitBadge from './CommitBadge';
import FollowersBadge from './FollowersBadge';
import StarBadge from './StarsBadge';
import ForkBadge from './ForkBadge';
import { MeContext } from '@/contexts/MeContext';

import PercentileBadge from './PercentileBadge';



function Toprow({ children }) {
    const data = useContext(MeContext);

    return (
        <div className="grid grid-cols-12 items-center grid-flow gap-4 bg-black bg-opacity-30 rounded-lg px-2 sm:px-4 lg:px-8 rounded-b-none auto-rows-max">
            <div className="col-span-12 lg:col-span-4 justify-center justify-self-center mt-8">
                {/* align avatar to center of div */}
                <div className="flex justify-center mb-2">
                    <div className="avatar">
                        <div className="w-52 rounded-lg">
                            <Image src={data.imgUrl}
                                alt={`${data.fullname} supertype`}
                                className="mt-8 object-cover rounded text-center" width={300} height={300} priority />
                        </div>
                    </div>
                </div>

                { 
                    data.superinference.stats && (
                        <>
                            <CommitBadge count={data.superinference.contribution.contribution_count} />
                            <FollowersBadge count={data.superinference.profile.followers} />
                            <StarBadge count={data.superinference.stats.stargazers_count} />
                            <ForkBadge count={data.superinference.stats.forks_count} />
                            <PercentileBadge s_location={data.superinference.profile.location} s_followers={data.superinference.profile.followers} />
                        </>
                    )
                }
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
                            () => scrollToSection("affiliations")
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default Toprow;