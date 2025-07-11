import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Body from './Body'
import Login from './Login'
import { Provider } from 'react-redux'
import { store } from './Utils/appStore' // Import the Redux store
import Feed from './Feed'
import Profile from './Profile' // Import the Profile component
import Connections from './connections' // Import the Connections component
import Request from '../src/Request' // Import the Request component



function App() {
  return (
    <Provider store={store}>
    {/* Wrap your application with the Redux Provider */}
    {/* This allows you to access the Redux store in your components */}


    <div className="bg-base-100">
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<Body />} >
          <Route path='/feed' element={<Feed />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          {/*  Add connections Route   */}
          <Route path='/connections' element={<Connections />} />
          <Route path='/requests' element={<Request />} />
          {/* Add more routes as needed */}
          
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
    </Provider>
  )
}

export default App