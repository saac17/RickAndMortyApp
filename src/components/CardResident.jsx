import axios from 'axios'
import React, { useEffect, useState } from 'react'

const CardResident = ({url}) => {

    const [resident, setResident] = useState()

    useEffect(() => {
      axios.get(url)
        .then(res => setResident(res.data))
        .catch(err => console.log(err))
    }, [])
    

  return (
    <article className='resident'>
        <header className='imgResident'>
            <img src={resident?.image} alt="" />
            <div className='statusResident'>
                <div className='circle'>
                  <i className='bx bxs-circle'></i>
                </div>
                <span>{resident?.status}</span>
            </div>
        </header>
        <section className='infoExtraResident'>
            <h3 className='nameResident'>{resident?.name}</h3>
            <hr />
            <ul className='residentInfo'>
                <li><span>Specie: </span>{resident?.species}</li>
                <li><span>Origin: </span>{resident?.origin.name}</li>
                <li><span>Episodes where appear: </span>{resident?.episode.length}</li>
            </ul>
        </section>
    </article>
  )
}

export default CardResident