// src/Request.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addRequests } from './Utils/requestSlice';
import { BASE_URL } from './Utils/constants';

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.requests);

    useEffect(() => {
        const fetchRequest = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/user/requests/received`, {
                    withCredentials: true,
                });

                dispatch(addRequests(res.data || []));
                console.log('Fetched Requests :', res.data);

            } catch (err) {
                console.error('Error fetching requests:', err);
                dispatch(addRequests([]));
            }
        };

        fetchRequest();
    }, [dispatch]);

    if (!requests || requests.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center my-4">No Requests</h1>
                <p className="text-center text-gray-500">You don't have any pending requests.</p>
            </div>
        );
    }

    const handleAccept = async (requestId) => {
        try {
            await axios.post(`${BASE_URL}/user/requests/accept/${requestId}`, {}, {
                withCredentials: true,
            });
            // Refresh requests after accepting
            const res = await axios.get(`${BASE_URL}/user/requests/received`, {
                withCredentials: true,
            });
            dispatch(addRequests(res.data || []));
        } catch (err) {
            console.error('Error accepting request:', err);
        }
    };

    const handleReject = async (requestId) => {
        try {
            await axios.post(`${BASE_URL}/user/requests/reject/${requestId}`, {}, {
                withCredentials: true,
            });
            // Refresh requests after rejecting
            const res = await axios.get(`${BASE_URL}/user/requests/received`, {
                withCredentials: true,
            });
            dispatch(addRequests(res.data || []));
        } catch (err) {
            console.error('Error rejecting request:', err);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center my-4">Connection Requests</h1>
            
            <div className="max-w-2xl mx-auto space-y-4">
                {requests.map((request) => (
                    <div key={request._id} className="bg-base-300 rounded-lg shadow-md p-6 border">
                        <div className="flex items-center space-x-4">
                            {/* Profile Picture */}
                            <img 
                                src={request.fromUserId.photoUrl} 
                                alt={`${request.fromUserId.firstName} ${request.fromUserId.lastName}`}
                                className="w-16 h-16 rounded-full object-cover"
                            />
                            
                            {/* User Info */}
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold">
                                    {request.fromUserId.firstName} {request.fromUserId.lastName}
                                </h3>
                                <p className="text-gray-600">Age: {request.fromUserId.age}</p>
                                <p className="text-gray-600">Gender: {request.fromUserId.gender}</p>
                                
                                {/* Skills */}
                                {request.fromUserId.skills && request.fromUserId.skills.length > 0 && (
                                    <div className="mt-2">
                                        <p className="text-sm font-medium text-gray-700">Skills:</p>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                            {request.fromUserId.skills.map((skill, index) => (
                                                <span 
                                                    key={index}
                                                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                
                                {/* Request Status */}
                                <div className="mt-2">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        request.status === 'accepted' 
                                            ? 'bg-green-100 text-green-800' 
                                            : request.status === 'rejected'
                                            ? 'bg-red-100 text-red-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                    </span>
                                </div>
                            </div>
                            
                            {/* Action Buttons - Only show if status is pending */}
                            {request.status === 'pending' && (
                                <div className="flex flex-col space-y-2">
                                    <button
                                        onClick={() => handleAccept(request._id)}
                                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleReject(request._id)}
                                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                                    >
                                        Reject
                                    </button>
                                </div>
                            )}
                        </div>
                        
                        {/* Request Date */}
                        <div className="mt-4 text-sm text-gray-500">
                            Request sent: {new Date(request.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Requests;