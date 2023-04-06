import Link from 'next/link';
import Image from 'next/image';

const ContactCard = ({ data }) => {

    return (
        <div className="col-span-10 lg:col-span-4 text-white my-8 mx-1 self-start">
            <h3 className="text-lg uppercase font-semibold leading-normal mb-2 my-4">Personal Details</h3>
            <div className="border-white border rounded-lg shadow-lg p-4">
                <div className="flex items-start flex-row flex-wrap">
                    <div className="basis-1/6">
                        <div className="avatar mr-2">
                            <div className="w-12 rounded-full">
                                <Image src={data['superinference']['profile']['avatar_url']}
                                    alt={data['fullname']}
                                    width={50}
                                    height={50}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="basis-4/6 2xl:basis-3/5 leading-none">
                        <span className='leading-none font-semibold'>{data['fullname']}</span>
                        {/* social links */}
                        <div className="flex flex-row gap-x-2 mt-1">
                            {
                                data['website'] &&
                                <Link href={data['website']} target="_blank" rel="noopener noreferrer" className='text-sm link-info hover:opacity-70'>
                                    Website
                                </Link>
                            }
                            {
                                data['linkedin'] &&
                                <Link href={data['linkedin']} target="_blank" rel="noopener noreferrer" className='text-sm link-info hover:opacity-70'>
                                    LinkedIn
                                </Link>
                            }
                            {
                                data['github_handle'] &&
                                <Link href={`https:github.com/${data['github_handle']}`} target="_blank" rel="noopener noreferrer" className='text-sm link-info hover:opacity-70'>
                                    GitHub
                                </Link>
                            }
                        </div>
                    </div>
                    { 
                        data['availability'] !== "Unavailable"  && 
                        <div className="basis-full 2xl:basis-1/5 2xl:text-right">
                            <label htmlFor="enquire-modal"
                                className="btn btn-outline btn-xs rounded hover:bg-rose-700">Enquire</label>
                        </div>
                    }
                </div>
                {
                    data['availability'] !== "Unavailable"  &&
                    <ul className="text-xs text-gray-400 mt-2">
                        <li>Availability: {data['availability']}</li>
                        { 
                            data['location'] &&
                            <li>Location: {data['location']}</li>
                        }  
                        {/* <li>Location: Jakarta, Indonesia</li> */}
                        {/* <li>Valued Perks: Remote Working, Flexible Hours, Health Insurance, Growth Opportunities</li>
                                <li>Hiring Arrangements: Freelance / Fully Managed by Supertype</li> */}
                    </ul> 
                }
            </div>

        </div>
    )
}

export default ContactCard
