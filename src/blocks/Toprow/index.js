import Image from 'next/image'

function Toprow({ data, children }) {
    return (
        <>
            <div className="col-span-12 lg:col-span-4 justify-center justify-self-center lg:justify-self-start mt-8">
                <div className="avatar">
                    <div className="w-52 rounded-lg">
                        <Image src={data.gh.avatar_url}
                            alt={`${data.gh.name || data.fullname} supertype`}
                            className="mt-8 object-cover rounded text-center" width={300} height={300} priority />
                    </div>
                </div>
            </div>
            <div className="col-span-12 lg:col-span-8 justify-center justify-self-center lg:justify-self-start mt-8">

                <h3 className="text-xl lg:text-3xl font-semibold leading-normal mb-2 -700 mb-2">
                    {data.gh.name || data.fullname}
                </h3>
                <p className='prose text-sm'>{data.short || 'Full Stack Engineer'}</p>
            </div>

            <div className="w-full lg:col-span-3">
                {children}
            </div>
        </>
    );
};

export default Toprow;