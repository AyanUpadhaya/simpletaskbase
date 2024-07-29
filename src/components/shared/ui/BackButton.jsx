import React from 'react'
import { useNavigate } from 'react-router-dom'

const BackButton = ({route}) => {
    const navigate = useNavigate()
  return (
    <div>
        <button onClick={()=>navigate(route)} className='btn btn-dark'>Back</button>
    </div>
  )
}

export default BackButton