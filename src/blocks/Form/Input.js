import React from "react";

const Input = React.forwardRef((props, ref) => {
    return <input
        className="form-control appearance-none block w-full bg-gray-100 text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white disabled:hover:cursor-not-allowed"
        {...props}
        ref={ref}
    />;
});

Input.displayName = "Input";

export default Input;