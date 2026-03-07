import React from 'react'

const Dropdown = ({title, option, func}) => {
  return (
    <div className='select'>
        <select onChange={func}  name="format" id="format" defaultValue="0" >
            <option value="0" disabled>
                {title}
            </option>
            {option.map((p, i) => (
                <option key={i} value={p} className=' text-black'>
                    {p.toUpperCase()}
                </option>
            ))}
        </select>
    </div>
  )
}

export default Dropdown