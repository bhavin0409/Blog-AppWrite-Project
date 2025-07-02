import { use, useEffect, useState } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import authService from './appwrite/auth.service'
import { login , logout} from './store/authSlice'
import Loading from './components/loader/Loading'
import Header from './components/header/Header'
import { Outlet } from 'react-router-dom'
import Footer from './components/footer/Footer'


function App() {
  const [loading, setLoading] = useState(true)
  const status = useSelector((state) => state.auth.status);
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
  }, [dispatch , status])
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap justify-center bg-gray-300'>
      <div className='w-full block '>
        <Header />
        <main>
          <Outlet/>
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <div > <Loading /> </div>
  )
}

export default App
