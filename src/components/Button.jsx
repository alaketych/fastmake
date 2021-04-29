import React from "react"
import classNames from "classnames"
import "../sass/components/Button.sass"

function Button({ onClick, className, outline, label }) {
    return (
        <button
            onClick={onClick}
            className={classNames('button', className, {
                'button--outline': outline,
            })}>
            { label }
        </button>
    )
}

export default Button