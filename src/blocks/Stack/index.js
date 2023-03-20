import IconRow from '@/blocks/IconRow'
import CollectiveMark from "../Toprow/CollectiveMark"

export const Stack = ({ children }) => {

    return (
        <>
            <h3 className="text-2xl font-semibold leading-normal mb-2">My Stack</h3>
            <div className="relative mt-5 text-left">
                {children}
            </div>
            <div className="text-xs my-4 text-left ml-2 hidden lg:block">
                Developer Profile by <CollectiveMark />
            </div>
        </>
    )
}

export const StackSection = ({ sectionName, children }) => {
    return (
        <div className="flex items-center relative pb-5 justify-start">
            <div className="border-r-2 border-white opacity-30 absolute h-full top-2 z-10">
                <span className="-top-1 absolute -left-[0.2rem] text-xs">●</span>
            </div>
            <div className="absolute stack -ml-8 font-bold text-gray-400 text-sm w-max">
                {sectionName}
            </div>

            <div className="ml-6 pt-5">
                {children}
            </div>
        </div>
    )
}

export const generateStack = (stack) => {
    const sections = []

    if(!Object.keys(stack).includes("1")) { 
        for (const [key, value] of Object.entries(stack)) {
            let section = []
    
            // iterate through value, to form rows of 3
            for (let i = 0; i < value.length; i += 3) {
                let icons = []
                value.map((icon, index) => {
                    if (index >= i && index < i + 3) {
                        icons.push(icon)
                    }
                })
                section.push(
                    <IconRow tags={icons} key={`${key}-${i}`}/>
                )
            }
    
            sections.push(
                <StackSection sectionName={key} key={key}>
                    {section}
                </StackSection>
            )
        }
    } else {
        Object.keys(stack).map(key => {
            const s = stack[key];
            for (const [key, value] of Object.entries(s)) {
                let section = []
        
                // iterate through value, to form rows of 3
                for (let i = 0; i < value.length; i += 3) {
                    let icons = []
                    value.map((icon, index) => {
                        if (index >= i && index < i + 3) {
                            icons.push(icon)
                        }
                    })
                    section.push(
                        <IconRow tags={icons} key={`${key}-${i}`}/>
                    )
                }
        
                sections.push(
                    <StackSection sectionName={key} key={key}>
                        {section}
                    </StackSection>
                )
            }
        })
    }
    
    return (
        <Stack>
            {sections}
        </Stack>
    )
}