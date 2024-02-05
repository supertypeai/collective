const RecurringModeToggle = ({ addWeeklyMode, setAddWeeklyMode, children }) => {
    return (
        <div className="my-1">
            <div className="label-text mr-2 inline align-middle transition duration-700">
                {addWeeklyMode ? "Weekly Recurring Session" : "One-time Session"}
            </div>
            <input
                type="checkbox"
                className="toggle toggle-primary dark:toggle-info align-middle"
                checked={addWeeklyMode}
                onChange={() => setAddWeeklyMode(prev => !prev)}
            />
            {children}
        </div>
    )
}

export default RecurringModeToggle