import React from "react";

// Get id prop from a child element
export const getChildId = (children) => {
    const child = React.Children.only(children);

    if ("id" in child?.props) {
        return child.props.id;
    }
};

export const Field = ({ children, label, error, hint }) => {
    const id = getChildId(children);

    return (
        <div className={`col-sm-12 mt-3 ${!hint ? 'mb-3' : ''}`}>
            <label htmlFor={id} className="form-label block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2">
                {label}
            </label>
            {children}
            {hint && <Hint>{hint}</Hint>}
            {error && <p className="text-xs text-error">{error.message}</p>}
        </div>
    );
};

export const Hint = ({ children }) => {
    return <p className="text-gray-400 mt-1 text-xs italic text-muted">{children}</p>;
}