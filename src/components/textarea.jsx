import React from 'react'

const Textarea = ({ placeholder, value, onChange, label, ...props }) => <div>
  {label}
  <textarea placeholder={placeholder} value={value} onChange={onChange} {...props} />
</div>

export default Textarea
