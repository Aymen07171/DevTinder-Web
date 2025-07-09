import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { addUser } from './Utils/userSlice'
import { BASE_URL } from './Utils/constants'
import UserCard from './UserCard'

const EditProfile = ({ user }) => {
const [firstName, setFirstName] = useState(user.firstName || '')
const [lastName, setLastName] = useState(user.lastName || '')
const [emailId, setEmailId] = useState(user.emailId || '')
const [age, setAge] = useState(user.age || '')
const [gender, setGender] = useState(user.gender || '')
const [photoUrl, setPhotoUrl] = useState(user.photoUrl || '')
const [skills, setSkills] = useState(
Array.isArray(user.skills) ? user.skills.join(', ') : user.skills || ''
)
const [error, setError] = useState('')
const [showToast, setShowToast] = useState(false)
const [toastMessage, setToastMessage] = useState('')
const [toastType, setToastType] = useState('success') // 'success' or 'error'
const dispatch = useDispatch()

const showToastNotification = (message, type = 'success') => {
setToastMessage(message)
setToastType(type)
setShowToast(true)

// Auto-hide toast after 3 seconds
setTimeout(() => {
    setShowToast(false)
}, 3000)
}

const saveProfile = async (e) => {
e.preventDefault()
// Build updateData with only provided fields
const updateData = { userId: user.userId || user._id || user.id }
if (emailId !== '') updateData.emailId = emailId
if (firstName !== '') updateData.firstName = firstName
if (lastName !== '') updateData.lastName = lastName
if (age !== '') updateData.age = age
if (photoUrl !== '') updateData.photoUrl = photoUrl
if (skills !== '') updateData.skills = skills.split(',').map(s => s.trim()).filter(Boolean)
if (gender !== '') updateData.gender = gender

try {
    const res = await axios.patch(
    BASE_URL + '/profile/edit',
    updateData,
    { withCredentials: true }
    )
    dispatch(addUser(res.data.user))
    setError('')
    console.log('Profile updated successfully', res.data)
    showToastNotification('Profile updated successfully!')
} catch (err) {
    const errorMessage = err.response?.data?.message || err.message
    setError(errorMessage)
    console.error('Error updating profile', err)
    showToastNotification(errorMessage, 'error')
}
}



return (
<div className='flex justify-center items-center h-screen bg-base-100'>
    {/* Toast Notification */}
    {showToast && (
    <div className="toast toast-top toast-end">
        <div className={`alert ${toastType === 'success' ? 'alert-success' : 'alert-error'}`}>
        <span>{toastMessage}</span>
        </div>
    </div>
    )}

    <div className="flex items-center justify-center bg-base-200">
    <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={saveProfile}>
        <h2 className="text-2xl font-bold text-center mb-4">Edit Profile</h2>

        <div className="form-control">
            <label className="label">
            <span className="label-text">FirstName</span>
            </label>
            <input
            type="text"
            placeholder="Type your FirstName"
            className="input input-bordered"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
            />
        </div>

        <div className="form-control">
            <label className="label">
            <span className="label-text">LastName</span>
            </label>
            <input
            type="text"
            placeholder="Type your LastName"
            className="input input-bordered"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
            />
        </div>

        <div className="form-control">
            <label className="label">
            <span className="label-text">Email</span>
            </label>
            <input
            type="text"
            placeholder="Type your emailId"
            className="input input-bordered"
            value={emailId}
            onChange={e => setEmailId(e.target.value)}
            required
            />
        </div>

        <div className="form-control">
            <label className="label">
            <span className="label-text">Age</span>
            </label>
            <input
            type="number"
            placeholder="Type your Age"
            className="input input-bordered"
            value={age}
            onChange={e => setAge(e.target.value)}
            required
            />
        </div>

        <div className="form-control">
            <label className="label">
            <span className="label-text">Gender</span>
            </label>
            <select
            className="select select-bordered"
            value={gender}
            onChange={e => setGender(e.target.value)}
            required
            >
            <option value="">Select gender</option>
            <option value="male">male</option>
            <option value="female">female</option>
            </select>
        </div>

        <div className="form-control">
            <label className="label">
            <span className="label-text">Photo</span>
            </label>
            <input
            type="text"
            placeholder="Insert a photo URL"
            className="input input-bordered"
            value={photoUrl}
            onChange={e => setPhotoUrl(e.target.value)}
            required
            />
        </div>

        <div className="form-control">
            <label className="label">
            <span className="label-text">Skills (comma separated)</span>
            </label>
            <input
            type="text"
            placeholder="e.g. JavaScript, React, Node.js"
            className="input input-bordered"
            value={skills}
            onChange={e => setSkills(e.target.value)}
            />
        </div>

        {error && (
            <div className="text-red-500 text-center mb-2">{error}</div>
        )}

        <div className="form-control mt-6">
            <button className="btn btn-primary" type="submit">
            Save Profile
            </button>
        </div>
        </form>
    </div>
    </div>
    <UserCard user={{
    userId: user.userId || user._id || user.id,
    firstName,
    lastName,
    emailId,
    age,
    gender,
    photoUrl,
    skills: skills.split(',').map(s => s.trim()).filter(Boolean)
    }} />
</div>
)
}

export default EditProfile