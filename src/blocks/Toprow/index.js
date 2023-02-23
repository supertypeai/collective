import Image from 'next/image'
import Pills from '@/blocks/Pills'
import CheckBadge from '@/icons/CheckBadge';

function Toprow({ data, children }) {
    return (
        <>
            <div className="col-span-12 lg:col-span-4 justify-center justify-self-center mt-8">
                <div className="avatar">
                    <div className="w-52 rounded-lg">
                        <Image src={data.gh.avatar_url}
                            alt={`${data.gh.name || data.fullname} supertype`}
                            className="mt-8 object-cover rounded text-center" width={300} height={300} priority />
                    </div>
                </div>
                {data.supertype_proof_of_verification &&
                    <div className="bg-white/10 rounded mt-4 p-2 cursor-pointer">
                        <p className='text-sm'>
                            <CheckBadge /> &nbsp;
                            Verified by Fellowship</p>
                    </div>}
            </div>
            <div className="mx-auto max-w-80 lg:col-span-8 justify-center justify-self-center lg:justify-self-start mt-8">

                <h3 className="text-xl lg:text-3xl font-semibold leading-normal mb-2 -700 mb-2">
                    {data.gh.name || data.fullname}
                </h3>
                <div className="max-w-[400px] sm:max-w-lg lg:max-w-xl prose text-sm text-slate-200 ">
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