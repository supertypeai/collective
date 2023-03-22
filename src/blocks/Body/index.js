import { useContext } from 'react';
import WpArticles from "../WpArticles"

import { MeContext } from '@/contexts/MeContext';

const Body = ({ stack, affiliations, children }) => {

    const data = useContext(MeContext);

    if (data['wp']) {

        return (
            <>
                <div className="col-span-12 text-white lg:col-span-4 justify-center justify-self-center lg:justify-self-start mt-8">
                    <WpArticles wp_data={data['wp']} />
                </div>
                <div className="mx-auto max-w-80 col-span-12 lg:col-span-8 justify-center justify-self-center lg:justify-self-start mt-8">
                    <div className="md:flex mt-14 text-center md:ml-8">
                        <div className="w-full md:mr-12 md:w-1/3">
                            {stack}
                        </div>
                        <div className="w-full md:ml-8 md:w-2/3">
                            {affiliations}
                        </div>
                    </div>
                </div>
                {/* full width div for children */}
                <div className="col-span-12 text-white mt-8">
                    {children}
                </div>

            </>
        )
    } else {
        return (

            <div className="mx-auto max-w-80 md:max-w-none col-span-12 justify-center justify-self-center lg:justify-self-start mt-8">
                <div className="md:flex mt-14 text-center md:ml-8 gap-8">
                    <div className="w-full md:mr-12 md:w-1/2">
                        {stack}
                    </div>
                    <div className="w-full md:w-1/2">
                        {affiliations}
                    </div>
                </div>
                {/* full width div for children */}
                <div className="col-span-12 text-white mt-8">
                    {children}
                </div>
            </div>

        )
    }

}

export default Body