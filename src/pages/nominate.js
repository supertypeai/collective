import Select from "react-select";

import Pageframe from '@/blocks/Mainframe/Pageframe';


const NominationForm = () => {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            first: e.target.first.value,
            last: e.target.last.value,
        }
        const JSONdata = JSON.stringify(data)
        console.log(JSONdata)

        // API endpoint where we send form data
        const endpoint = '/api/nominate'

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSONdata
        })

        const result = await response.json()
        console.log("result", result)
    }

    const labelCls = "block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2"

    return (
        <div className="col-span-12 text-white mt-4">

            <p className="text-sm">The following details will be used to create a Developer Profile on Supertype Collective if your nomination is successful.</p>
            <form className="w-full max-w-2xl mt-4" onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className={labelCls} htmlFor="first"> First Name
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-100 text-gray-400 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="first" name="first" type="text" placeholder="Pam" required minLength="5" maxLength="20" />
                        <p className="text-gray-400 text-xs italic">This will be used as your as your username, if available</p>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className={labelCls} htmlFor="last">
                            Last Name
                        </label>
                        <input className="appearance-none block w-full bg-gray-100 text-gray-400 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="last" name="last" type="text" placeholder="Beesly" />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className={labelCls} htmlFor="grid-password">
                            E-mail
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="email" placeholder="pambeesly@dundermifflin.com" required />
                        <p className="text-gray-400 text-xs italic">We&apos;ll inform you of your application status by email.</p>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className={labelCls} htmlFor="github_handle">
                            GitHub Username
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="github_handle" type="text" placeholder="pambeesly" required />
                        <p className="text-gray-400 text-xs italic">Collective populates data from your GitHub profile.</p>
                    </div>
                </div>


                <button type="submit" className="btn btn-primary text-white">Submit</button>

            </form>
        </div>
    )
}


const Page = () => {
    return (
        <Pageframe title="Nomination Form | Supertype Collective">
            <h1 className="text-4xl font-bold">Application</h1>
            <NominationForm />
        </Pageframe>
    );
}

export default Page