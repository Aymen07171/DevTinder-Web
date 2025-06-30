import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'   
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { BASE_URL } from './Utils/constants'
import { addUser } from './Utils/userSlice'
import { useNavigate } from 'react-router-dom'

// Body.jsx

    const Body = () => {

        const dispatch = useDispatch();
        const navigate = useNavigate();
        const userData = useSelector((store) => store.user);

        const fetchUser = async () => {
            if(userData) return; // If user data is already present, no need to fetch again
            try {
                const res = await axios.get(BASE_URL + '/profile/view', {
                    withCredentials: true,
                }); 
                dispatch(addUser(res.data))
            }catch (err) {    
                if(err.status === 401) {
                // If the user is not authenticated, redirect to login
                    navigate('/login');
                }
            }
        }


        useEffect(() => {

            fetchUser();
  

        // eslint-disable-next-line react-hooks/exhaustive-deps
        } , []);


    return (
        <div>
        <NavBar />
        <Outlet />
        <Footer />
        </div>
    )
    }

    export default Body