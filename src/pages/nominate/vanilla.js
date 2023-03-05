import { useState } from "react";

import Select from "react-select";

import Pageframe from '@/blocks/Mainframe/Pageframe';
import profileTagsChoices from '@/data/profileTagsChoices.json';

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

    const [selectedOptions, setSelectedOptions] = useState([])

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
                        <label className={labelCls} htmlFor="email">
                            E-mail
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email" name="email" type="email" placeholder="pambeesly@dundermifflin.com" required />
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
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className={labelCls} htmlFor="tags">
                            Key Qualifications
                        </label>
                        <Select
                            isMulti
                            name="tags"
                            options={profileTagsChoices}
                            classNamePrefix="select"
                            className="text-black"
                            value={selectedOptions}
                            onChange={o => setSelectedOptions(o)}
                            // allow maximum of 10 options to be selected
                            isOptionDisabled={() => selectedOptions.length >= 10}
                            theme={theme => ({
                                ...theme,
                                borderRadius: 0,
                                colors: {
                                    ...theme.colors,
                                    primary25: '#fcaa8c',
                                    primary: '#f46d75',
                                },
                            })}
                            styles={{
                                // change background color of tags
                                multiValue: (styles, { data }) => {
                                    return {
                                        ...styles,
                                        // same primary-focus color from tailwind config
                                        backgroundColor: '#c4002f',
                                    };
                                },
                                // change color of text in tags
                                multiValueLabel: (styles, { data }) => ({
                                    ...styles,
                                    color: 'white',
                                }),
                            }}
                        />
                        <p className="text-gray-400 text-xs italic mt-2">A maximum of 10 is allowed</p>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className={labelCls} htmlFor="short">
                            Short Bio
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="short" id="short" type="text" placeholder="Full Stack Data Scientist @SupertypeAI" required />
                        <p className="text-gray-400 text-xs italic">A short bio of yourself. This will be used to populate your profile.</p>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className={labelCls} htmlFor="long">
                            Longer Introduction
                        </label>
                        <textarea rows="4" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="short" name="short" type="text" placeholder="I am a data scientist with 3 years of experience in the industry and a Fellow at Supertype Fellowship. I am passionate about open source and have contributed to several projects under this program." required minLength="40" maxLength="250" />
                        <p className="text-gray-400 text-xs italic">
                            A longer introduction of yourself. This will be used to appear prominently on your profile.
                        </p>
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