import React, { useEffect, useState } from 'react'
import { RingLoader } from 'react-spinners'

const Loading = () => {
    const [charging, setCharging] = useState(false)
    useEffect(() => {
      setCharging(true)
      setTimeout(() => {
        setCharging(false)
      }, 8000);
    }, [])
    
  return (
    <div className='loading'>
        <h2>Loading...</h2>
        <RingLoader
            color="#17FF00"
            size={100}
        />
    </div>
  )
}

export default Loading