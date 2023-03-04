import Pills from '@/blocks/Pills'

export const PillsFromStack = ({ id, stackExamples, setStackExamples }) => {
    return <Pills
        tags={
            stackExamples[id].child.filter(
                item => !stackExamples[id].selected.includes(item)
            )
        }
        onClick={e => {
            console.log(e)
            // max 9 choices
            if (stackExamples[id].selected.length >= 9) return

            setStackExamples(
                prev => ({
                    ...prev,
                    [id]: {
                        ...prev[id],
                        "selected": [
                            ...prev[id]?.selected,
                            e
                        ]
                    }
                })
            )
        }}
        maxWidth="40"
    />
}

export const PillsFromSelected = ({ id, stackExamples, setStackExamples }) => {
    return <Pills
        tags={stackExamples[id].selected}
        onClick={e => {
            console.log("stackExamples[id]", stackExamples[id])
            console.log(e)
            // remove this from stack[id]
            setStackExamples(
                prev => ({
                    ...prev,
                    [id]: {
                        ...prev[id],
                        "selected": prev[id]?.selected.filter(item => item !== e)
                    }
                })
            )
        }}
    />
}