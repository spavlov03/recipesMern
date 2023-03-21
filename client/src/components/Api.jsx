import axios from 'axios'
import { useState,useEffect } from 'react'
// import { Link } from 'react-router-dom'
import CoverFlowApi from './CoverFlowApi'




const Api = () => {
  const [recipes,setRecipes] = useState([]); 
  const options = {
    method: 'GET',
    url: 'https://tasty.p.rapidapi.com/recipes/list',
    params: {from: '0', size: '20', tags: 'under_30_minutes'},
    headers: {
      'X-RapidAPI-Key': 'e3d9cc7f6cmshf9a3771f789b43dp106b9ajsne22f3873bb9c',
      'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
    }
  };
  useEffect(()=> {
  axios.request(options).then(function (response) {
    console.log(response.data.results)
    setRecipes(response.data.results);
  }).catch(function (error) {
    console.error(error);
  });
  },[])
  // useEffect(()=>{ 
  //   const requestOne = axios.get('https://tasty.p.rapidapi.com/tips/list',{withCredentials:true})
  //   axios.all([requestOne])
  //   .then(axios.spread((...res)=>{
  //     const responseOne = res[0]
  //     setRecipes(responseOne.data);
  //   }))
  //   .catch(err=>console.log('there is error in useEffect',err))
  // },[])

  return (
    <div className='me-5 ms-5'>
      <CoverFlowApi recipes={recipes}/>
    </div>
  )
}

export default Api