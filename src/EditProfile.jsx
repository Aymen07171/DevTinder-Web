    import React, { useState } from 'react'
    import { useDispatch } from 'react-redux'
    import axios from 'axios'
    import { addUser } from './Utils/userSlice'
    import { BASE_URL } from './Utils/constants'

    const EditProfile = ({ user }) => {
    const dispatch = useDispatch()

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

const saveProfile = async (e) => {
e.preventDefault()
try {
    const res = await axios.patch(
    BASE_URL + '/profile/edit',
    {
        userId: user.userId, // <-- Add this line
        firstName,
        lastName,
        emailId,
        age,
        gender,
        photoUrl,
        skills: skills.split(',').map(s => s.trim()).filter(Boolean),
    },
    { withCredentials: true }
    )
    dispatch(addUser(res.data.user || res.data.data || res.data))
    setError('')
    console.log('Profile updated successfully', res.data)
} catch (err) {
    setError(err.response?.data?.message || err.message)
    console.error('Error updating profile', err)
}
}

    return (
        <div>
        <div className="flex items-center justify-center min-h-screen bg-base-200">
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
                    <option value="male">Male</option>
                    <option value="female">Female</option>
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
                    <span className="label-text">Bio</span>
                </label>
                <textarea
                    placeholder="Type your bio"
                    className="textarea textarea-bordered"
                    value={skills}
                    onChange={e => setSkills(e.target.value)}
                    rows={5}
                />
                </div>

                {error && (
                <div className="text-red-500 text-center mb-2">{error}</div>
                )}

                <div className="form-control mt-6">
                <button className="btn btn-primary" type="submit" onClick={saveProfile}>
                    Save Profile
                </button>
                </div>
            </form>
            </div>
        </div>
        </div>

    )
    }

    export default EditProfile