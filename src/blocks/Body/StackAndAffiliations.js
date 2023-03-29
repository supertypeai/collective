const StackAndAffiliations = ({ stack, affiliations }) => {
    return (
        <div className="mx-auto sm:max-w-80 lg:col-span-8 justify-center justify-self-center lg:justify-self-start mt-8">
            <div className="md:flex mt-14 text-center md:ml-8">
                <div className="w-full md:mr-12 md:w-1/3">
                    {stack}
                </div>
                <div className="w-full md:ml-8 md:w-2/3">
                    {affiliations}
                </div>
            </div>
        </div>
    )
}

export default StackAndAffiliations