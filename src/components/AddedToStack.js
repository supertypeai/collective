import { Hint } from "@/blocks/Form"
import { PillsFromSelected } from "@/components/PillsFromStack"

const AddedToStack = ({ stackExamples, setStackExamples, isEditting=true }) => {
    return (
        <div className="w-full col-span-12 lg:col-span-2 lg:ml-8 order-first lg:order-last">
            <div className="m-2 rounded border p-2">
                <div className="mb-4">
                    <Hint>Maximum of 9 in each Stack. Click to drop from Stack</Hint>
                </div>
                {
                    stackExamples["1"]?.selected.length > 0 &&
                    (<>
                        <h3 className="mb-4">🚀 Top Stack: <span className="font-medium">{stackExamples["1"]["label"]}</span></h3>
                        <PillsFromSelected id="1" stackExamples={stackExamples} setStackExamples={setStackExamples} isEditting={isEditting}/>
                    </>)
                }
                {
                    stackExamples["2"]?.selected.length > 0 &&
                    (<>
                        <h3 className="mb-4">🌉 Middle Stack: <span className="font-medium">{stackExamples["2"]["label"]}</span></h3>
                        <PillsFromSelected id="2" stackExamples={stackExamples} setStackExamples={setStackExamples} isEditting={isEditting}/>
                    </>)
                }
                {
                    stackExamples["3"]?.selected.length > 0 &&
                    (<>
                        <h3 className="mb-4">🛤️ Bottom Stack: <span className="font-medium">{stackExamples["3"]["label"]}</span></h3>
                        <PillsFromSelected id="3" stackExamples={stackExamples} setStackExamples={setStackExamples} isEditting={isEditting}/>
                    </>)
                }
            </div>
        </div>
    )
}

export default AddedToStack