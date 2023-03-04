export default function FormBlock({ children, currentStep, prevFormStep }) {
    return (
        <div className="mt-4">
            {currentStep < 3 && (
                <>
                    {currentStep > 0 && (
                        <button
                            onClick={prevFormStep}
                            type="button"
                        >
                            back
                        </button>
                    )}

                    <span>Step {currentStep + 1} of 3</span>
                </>
            )}
            {children}
        </div>
    );
}
