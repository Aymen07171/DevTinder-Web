import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from './Utils/constants'
import { removeUser } from './Utils/userSlice'

// NavBar.jsx
const NavBar = () => {


const users = useSelector(state => state.user)
const user = Array.isArray(users) && users.length > 0 ? users[0] : null




  const dispatch = useDispatch()
  const navigate = useNavigate()




  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true })
      dispatch(removeUser())
      navigate("/login")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <div>
      <div className="navbar bg-base-200 shadow-sm">
        <div className="flex-1">
          <Link to="/feed" className="btn btn-ghost text-xl">DevTinder 👨‍💻</Link>
        </div>

        <div className="flex gap-2">
          {user ? (
            <div className="dropdown dropdown-end flex items-center">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mx-2">
                <div className="w-10 rounded-full">
                  <img
                    alt="User Avatar"
                    src={user.photoUrl}
                  />
                </div>
              </div>
              <span className="font-semibold">Welcome, {user.firstName}</span>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-200 rounded-box z-10 mt-[10rem] w-52 p-5 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/connections">Connections</Link>
                </li>
                  <li>
                  <Link to="/requests">Connection Request</Link>
                </li>
                <li><a onClick={handleLogout}>Logout</a></li>
              </ul>
            </div>
          ) : (
            <a className="btn btn-primary" href="/login">Login</a>
          )}
        </div>
      </div>
    </div>
  )
}

export default NavBar
