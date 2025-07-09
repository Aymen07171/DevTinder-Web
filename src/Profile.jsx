    import EditProfile from './EditProfile'
    import { useSelector } from 'react-redux'

    

    const Profile = () => {
    const users = useSelector((store) => store.user)
    const user = Array.isArray(users) && users.length > 0 ? users[0] : null

    // If user is not found, return null or a loading state
   



    return (
        <div className="min-h-screen bg-base-200 p-4">
     
            {user && (
            <div className="bg-base-100 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <EditProfile user={user} />
            </div>
            )}
        </div>
    )
    }

    export default Profile