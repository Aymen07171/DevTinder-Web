import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const NavBar = () => {
  const users = useSelector(state => state.user)
  // Since your user state is an array, get the first user if exists
  const user = users && users.length > 0 ? users[0] : null

  // Choose avatar and welcome name based on email
  let avatarUrl = "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
  if (user) {
    if (user.emailId === "admin@example.com") {
      avatarUrl = "https://api.dicebear.com/7.x/identicon/svg?seed=admin"
    } else if (user.emailId === "ayman@gmail.com") {
      avatarUrl = "https://api.dicebear.com/7.x/identicon/svg?seed=ayman"
    } else if (user.avatarUrl) {
      avatarUrl = user.avatarUrl
    }
  }

  return (
    <div>
      <div className="navbar bg-base-200 shadow-sm">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">DevTinder 👨‍💻</Link>
        </div>
        <div className="flex gap-2">
          {user ? (
            <div className="dropdown dropdown-end flex items-center">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mx-2">
                <div className="w-10 rounded-full">
                  <img
                    alt="User Avatar"
                    src={avatarUrl}
                  />
                </div>
              </div>
              <span className="font-semibold">Welcome, {user.firstName}</span>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-[10rem] w-52 p-5 shadow">
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
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