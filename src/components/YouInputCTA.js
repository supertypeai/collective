
import { useState } from "react";

const YouInputCTA = () => {
    const [youInput, setYouInput] = useState('<you>')
    return (
        <div className="relative mb-3 xl:w-96 mt-4">
            <input
                className="peer m-0 h-[58px] w-full focus:text-info rounded bg-info focus:bg-secondary bg-opacity-25 bg-clip-padding py-4 px-3 font-normal leading-tight ease-in-out placeholder:text-transparent focus:border-primary focus:bg-black focus:bg-opacity-10 focus:pt-[1.625rem] focus:pb-[0.625rem] focus:text-grey-100 focus:shadow-te-primary focus:outline-none [&:not(:placeholder-shown)]:pt-[1.625rem] [&:not(:placeholder-shown)]:pb-[0.625rem]"
                id="youInput"
                placeholder="your_username"
                onChange={(e) => setYouInput(e.target.value)}
            />
            <div class="absolute top-[0.6rem] right-2">
                <button className="inline btn btn-xs btn-info">Join</button>
            </div>
            <label
                for="youInput"
                className="pointer-events-none text-sm font-medium absolute top-0 left-0 origin-[0_0] border border-solid border-transparent pt-[0.8rem] px-3 transition-[opacity,_transform] duration-100 ease-in-out peer-focus:translate-x-[0.15rem] peer-focus:-translate-y-2 peer-focus:scale-[0.85] peer-focus:opacity-[0.65] peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:scale-[0.85] peer-[:not(:placeholder-shown)]:opacity-[0.65] motion-reduce:transition-none"
            >{`collective.supertype.ai/p/${youInput}`}</label>
        </div>
    )
}

export default YouInputCTA