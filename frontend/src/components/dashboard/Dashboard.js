import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import UserLoginHeader from "../header/UserLoginHeader";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../slices/CategorySlice';

function Dashboard() {
  const dispatch= useDispatch()
  const categories= useSelector(state=> state.categories.categories)

  useEffect( () => {
    dispatch(fetchCategories())
  },[dispatch])

  return (
    <div>
      <UserLoginHeader></UserLoginHeader>
      <div className="container  mx-auto px-4 py-8">
            <h1 className="text-center text-2xl font-semibold mb-4">Browse By Category</h1>
                <div className="grid grid-cols-3 gap-4">
                    {categories.map( (category) => (
                    <Link key={category.id} to={`/${category.type}`}>  
                    <div key={category.id} className="bg-gray-100 p-4 rounded-lg">
                       <img src={category.imageurl} alt={category.type} className="w-full h-auto mb-2" /> 
                        <p className="font-semibold">{category.type}</p>
                    </div>
                    </Link> 
                    ))}
                </div>
        </div>
    </div>
  )
}

export default Dashboard
