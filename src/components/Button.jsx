import React from 'react'

const Button = ({
    children,
    type,
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    classname = '',
    ...props
}) => {
  return (
    <button className={`px-6 py-2 duration-200 ${bgColor} ${textColor} ${classname}`} type={type} {...props}>
      {children}
    </button>
  )
}

export default Button