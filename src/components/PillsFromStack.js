import Pills from '@/blocks/Pills'

export const PillsFromStack = ({ stackExamples, setStackExamples }) => {
    return <Pills
        tags={
            stackExamples?.stack1_child.filter(
                item => !stackExamples?.stack1_selected.includes(item)
            )
        }
        onClick={e => {
            console.log(e)
            // add this to stack1_selected if stackExamples.stack1_selected.length < 10
            if (stackExamples.stack1_selected.length >= 9) return
            setStackExamples(
                {
                    ...stackExamples,
                    "stack1_selected": [
                        ...stackExamples?.stack1_selected,
                        e
                    ]
                }
            )
        }}
        maxWidth="40"
    />
}

export const PillsFromSelected = ({ stackExamples, setStackExamples }) => {
    return <Pills
        tags={stackExamples.stack1_selected}
        onClick={e => {
            console.log(e)
            // remove this from stack1_selected
            setStackExamples(
                {
                    ...stackExamples,
                    "stack1_selected": stackExamples?.stack1_selected.filter(item => item !== e)
                }
            )
        }}
    />
}