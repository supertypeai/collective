export default function FormBlock({ children, currentStep, prevFormStep }) {
    return (
        <div className="mt-4">
            {currentStep < 4 && (
                <div className="mb-4">
                    {currentStep > 0 && (
                        <button
                            onClick={prevFormStep}
                            type="button"
                            className="btn btn-secondary btn-outline btn-sm mr-4"
                        >
                            {'< back'}
                        </button>
                    )}
                    {
                        // if currentStep is 4, we're on the last step
                        currentStep === 3 ? <span className="italic">Almost done!</span> : <span>Step {currentStep + 1} of 3</span>
                    }
                    {/* <span>Step {currentStep + 1} of 3</span> */}
                </div>
            )}
            {children}
        </div>
    );
}
