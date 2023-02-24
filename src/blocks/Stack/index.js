export const Stack = ({ children }) => {
    return (
        <>
            <h3 className="text-2xl font-semibold leading-normal mb-2 -700 mb-2">My Stack</h3>
            <div className="relative mt-5 text-left">
                {children}
            </div>
        </>
    )
}

export const StackSection = ({ sectionName, children }) => {
    return (
        <div className="flex items-center relative pb-5 justify-start">
            <div className="border-r-2 border-black absolute h-full top-2 z-10">
                <i className="-top-1 -ml-1 absolute text-black">●</i>
                <div className="absolute stack -ml-8 font-bold text-gray-400 text-sm w-max">
                    {sectionName}
                </div>
            </div>

            <div className="ml-6 pt-5">
                {children}
            </div>
        </div>
    )
}
