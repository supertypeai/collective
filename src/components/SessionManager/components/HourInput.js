const HourInput = ({ keys, name, register, ...props }) => {
    return (
        <input
            {...register("hourly_usd", {
                required:
                    "Please provide your hourly rate",
            })}
            type="number" name={name} keys={keys} autoFocus={true}
            placeholder="40"
            className="join-item input input-bordered rounded-none text-black"
        />
    )
}

export default HourInput