import { useContext } from 'react';

import Image from 'next/image'

import Pills from '@/blocks/Pills'
import CheckBadge from '@/icons/CheckBadge';
import CollectiveMark from './CollectiveMark';

import { MeContext } from '@/contexts/MeContext';

function Toprow({ children }) {
    const data = useContext(MeContext);

    return (
        <>
            <div className="col-span-12 lg:col-span-4 justify-center justify-self-center mt-8">
                <div className="avatar">
                    <div className="w-52 rounded-lg">

                        <Image src={data.gh.avatar_url || data.avatar_url}
                            alt={`${data.gh.name || data.fullname} supertype`}
                            className="mt-8 object-cover rounded text-center" width={300} height={300} priority />
                    </div>
                </div>
                <CollectiveMark />
                {data.supertype_proof_of_verification &&
                    <div className="bg-white/10 rounded mt-4 p-2 cursor-pointer">
                        <p className='text-sm font-light'>
                            <CheckBadge /> &nbsp;
                            Verified by Fellowship</p>
                    </div>}
            </div>
            <div className="mx-auto lg:col-span-8 justify-center justify-self-center lg:justify-self-start mt-8 adapt-xs max-w-sm sm:max-w-none mx-auto">

                <h3 className="text-xl lg:text-3xl font-semibold leading-normal mb-2 -700 mb-2">
                    {data.gh.name || data.fullname}
                </h3>
                <div className="adapt-xs sm:max-w-lg w-full mx-auto lg:max-w-xl text-sm text-slate-200 ">
                    <p className='mb-4'>{data.short || 'Full Stack Engineer'}</p>
                    <p className='mb-4'>{data.long || ''}</p>
                    {children}
                    <Pills tags={data.tags} />
                </div>
            </div>


        </>
    );
};

export default Toprow;