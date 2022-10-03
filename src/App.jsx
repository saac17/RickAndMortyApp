import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import CardResident from './components/CardResident'
import ErrorScreen from './components/ErrorScreen'
import FilterList from './components/FilterList'
import Loading from './components/Loading'
import LocationInfo from './components/LocationInfo'
import getRandomNumber from './utils/getRandomNumber'

function App() {
  
  const [location, setLocation] = useState()
  const [searchInput, setSearchInput] = useState('')
  const [suggestedList, setSuggestedList] = useState()
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    let id = getRandomNumber()
    if (searchInput) {
      id = searchInput
    }
    const URL = `https://rickandmortyapi.com/api/location/${id}`

    axios.get(URL)
      .then(res => {
        setHasError(false)
        setLocation(res.data)
      }) 
      .catch(err => setHasError(true))
  }, [searchInput])
  
  const handleSubmit = e => {
    e.preventDefault()
    setSearchInput(e.target.idLocation.value)
  }

  const handleChange = e => {

    if (e.target.value === '') {
      return setSuggestedList()
    }

    const URLl = `https://rickandmortyapi.com/api/location?name=${e.target.value}`

    axios.get(URLl)
      .then(res => setSuggestedList(res.data.results))
      .catch(err => console.log(err))
  }


  return (
    <div className="App">
      {
        location ?
        <div>
          <div className='banner'>
          <h1 className='title'>Rick and Morty</h1>
            <form className='formSearch' onSubmit={handleSubmit}>
              <div className='inputAndButton'>
                <input 
                  className='inputSearch'
                  id='idLocation' 
                  placeholder='Enter another number from 1 to 126 or the name of the location' 
                  type="text" 
                  onChange={handleChange} 
                  autocomplete="off"
                />
                <button >Search</button> 
              </div>
               
            </form>
          </div>
          <div className='body'>
            <FilterList
              suggestedList={suggestedList}
              setSearchInput={setSearchInput} 
            />
            {
              hasError ?
                <ErrorScreen />
                :
                <>
                  <LocationInfo location={location} />
                  <div className='residents'>
                    {
                    location?.residents.map(url => (
                    <CardResident 
                      key={url}
                      url={url}
                    />
                    ))
                    }
                  </div>
                </>
            }
            
          </div>    
        </div>
        :
        <Loading/>
      }
    </div>   
  )
}

export default App
