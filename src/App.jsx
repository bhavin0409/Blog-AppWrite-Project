import { use, useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth.service'
import { login , logout} from './store/authSlice'
import Loading from './components/loader/Loading'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import { Outlet } from 'react-router-dom'


function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({userData}))
        } else {
          dispatch(logout())
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error)
        dispatch(logout())
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap justify-center bg-gray-300'>
      <div className='w-full block '>
        <Header />
        <main>
          {/* <Outlet/> */}
        </main>
        A Blog App with AppWrite.
        <Footer />
      </div>
    </div>
  ) : (
    <div > <Loading /> </div>
  )
}

export default App
