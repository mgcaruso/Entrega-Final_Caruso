import React from 'react'

const PrimaryBtn = ({ children, onClickFn, disabled, type }) => {
    return (
        <>
            {
                type === "submit"
                    ?
                    <button
                        type={type}
                        className='mx-2 py-2 rounded-md bg-key-color hover:bg-key-color-hover text-primary font-body ease-out duration-100'
                    >
                        {children}
                    </button>
                    :
                    <button
                        type='button'
                        onClick={onClickFn}
                        disabled={disabled}
                        className='mx-2 py-2 rounded-md bg-key-color hover:bg-key-color-hover text-primary font-body ease-out duration-100'
                    >
                        {children}
                    </button>}
        </>
    )
}

export default PrimaryBtn