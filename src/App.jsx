import React, {useState, useEffect} from 'react'
import { useDispatch} from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import {login, logout} from './store/authSlice'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import { Outlet } from 'react-router-dom'


function App() {
  //console.log(process.env.REACT_APP_APPWRITE_URL)
  //console.log(import.meta.env.VITE_APPWRITE_URL)
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if ( userData){
        // this is previous version

        // dispatch(login({userData}))


        
        // this is updated code 
        dispatch(login(userData)) //  already correct
        
      } else {
        dispatch(logout())
      }
    })
    .finally(()=>setLoading(false))
  },[])




  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-200'>
      <div className='w-full block'>
        <Header/>
        <main className=''>
          <Outlet />
        </main>
        <Footer/>
      </div>
    </div>
  ) : (null)
}

export default App
