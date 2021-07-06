import React from 'react'

const Input = ({ placeholder, value, onChange, label, ...props }) => <div>
  {label}
  <input placeholder={placeholder} value={value} onChange={onChange} {...props} />
</div>

export default Input
