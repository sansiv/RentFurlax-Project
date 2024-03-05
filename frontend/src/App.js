import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register'
import Dashboard from './components/dashboard/Dashboard';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Products from './components/product/Products';
import { Details } from './components/details/Details';
import { Checkout } from './components/checkout/Checkout';
import { Orders } from './components/orders/Orders';

function App() {

  const isUserLoggedIn= useSelector(state => state.auth.user)
  const navigate= useNavigate()
  //console.log(isUserLoggedIn)

  useEffect(() => {
    if(isUserLoggedIn){
      navigate('/dashboard')
    }
    else{
      navigate('/')
    }
  },[isUserLoggedIn])

  return (
      <Routes>
        <Route  path='/' element={<Home/>} />
        <Route  path='/:categoryName' element={<Products/>} />
        <Route  path='/details/:catName/:id' element={<Details/>} />
        <Route  path='/login' element={<Login/>} />
        <Route  path='/register' element={<Register/>} />
        <Route  path='/dashboard' element={<Dashboard/>} />
        <Route  path='/checkout' element={<Checkout/>} />
        <Route  path='/orders' element={<Orders/>} />
      </Routes>
  );
}

export default App;
