
import { useEffect, useState } from "react";

import Image from 'next/image'


function Toprow({ me, github_data, children }) {
    return (
        <>
            {/* {JSON.stringify(github_data)} */}

            <div className="w-full lg:col-span-1  flex justify-center mt-8">
                <Image src={github_data.avatar_url}
                    alt={`${github_data.name || me.name} supertype`} className="mt-8" width={200} height={200} priority />
                <h3 className="text-4xl font-semibold leading-normal mb-2 -700 mb-2">
                    {github_data.name}
                </h3>
            </div>
            <div className="w-full lg:col-span-3">
                {children}
            </div>
        </>
    );
};

export default Toprow;