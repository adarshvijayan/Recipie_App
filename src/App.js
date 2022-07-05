import './App.css';
import React,{useEffect,useState} from 'react';
import Recipe from './Recipe';

function App() {
  const [recepie,setRecepie]=useState([])
  const [search,setSearch]=useState('')
  const [query,setQuery]=useState('chiken')

  const APP_ID='39ddfd70';
  const APP_KEY='dd9673b8e1fedda263ea80fa85379551'


 useEffect(()=>{
  // console.log("effect...")
  recepies()
 },[query])

 const recepies  = async ()=>{
     const res= await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
     const data =await res.json()
    console.log("dataa..",data.hits)
     setRecepie(data.hits)

 }
  
const updateSearch =(e)=>{
  setSearch(e.target.value)
  console.log(search)

}

const getSearch =(e)=>{
  e.preventDefault()
  setQuery(search)
  setSearch('')

}



  return (
    <div className="App">
      <form className='search-form' onSubmit={getSearch}>
        <input className='serach-bar' type="text" value={search} onChange={updateSearch}/>
        <button className='serach-button' type='submit'>search</button>
        
      </form>
      <div className='recipie'>
      {recepie.map(recipe =>(
             <Recipe 
                      key={recipe.recipe.label}
                      title={recipe.recipe.label}
                      calories={recipe.recipe.calories}
                      image={recipe.recipe.image}
                      ingredients={recipe.recipe.ingredients}
             />

      ))}
      </div>
    </div>
  );
}

export default App;
