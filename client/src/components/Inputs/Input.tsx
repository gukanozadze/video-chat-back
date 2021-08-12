import React from "react"

interface Props {
  label: string
  placeholder: string
  value: string
  setValue: (arg: string) => void
}
const Input = ({ label, placeholder, value, setValue }: Props) => {
  return (
    <div className="max-w-xs">
      <label htmlFor="email" className="block text-sm font-medium text-gray-500">
        {label}
      </label>
      <div className="mt-1">
        <input
          type="text"
          name={label}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  )
}

export default Input
