import React, { use, useId } from 'react'

const Select = React.forwardRef(({
    options = [],
    label,
    classname = '',
    ...props
} , ref) => {
    
    const id = useId();
  return (
    <div className='w-full'>
        {label && (
            <label className='inline-block mb-1 pl-1' htmlFor={id }>
                {label}
            </label>
        )}

        <select
        {...props} 
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${classname}`}
        ref={ref}
        id={id}>
            {options?.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
})

export default Select