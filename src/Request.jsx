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

    // Move reviewRequest function outside useEffect and make it async
    const reviewRequest = async (status, _id) => {
        try {
            const res = await axios.post(`${BASE_URL}/request/review/${status}/${_id}`, {}, {
                withCredentials: true,
            });

            console.log(`Request ${status}:`, res.data);
            
            // Refresh requests after accepting/rejecting
            const updatedRes = await axios.get(`${BASE_URL}/user/requests/received`, {
                withCredentials: true,
            });
            dispatch(addRequests(updatedRes.data || []));

        } catch (err) {
            console.error('Error reviewing request:', err);
        }
    };

    if (!requests || requests.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">No Requests</h1>
                    <p className="text-base-content/60">You don't have any pending requests.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-8">Connection Requests</h1>
            
            <div className="max-w-4xl mx-auto space-y-6">
                {requests.map((request) => (
                    <div key={request._id} className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <div className="flex items-center space-x-6">
                                {/* Profile Picture */}
                                <div className="avatar">
                                    <div className="w-20 h-20 rounded-full">
                                        <img 
                                            src={request.fromUserId.photoUrl} 
                                            alt={`${request.fromUserId.firstName} ${request.fromUserId.lastName}`}
                                            className="rounded-full object-cover"
                                        />
                                    </div>
                                </div>
                                
                                {/* User Info */}
                                <div className="flex-1">
                                    <h2 className="card-title text-2xl">
                                        {request.fromUserId.firstName} {request.fromUserId.lastName}
                                    </h2>
                                    
                                    <div className="flex gap-4 mt-2">
                                        <div className="badge badge-outline">
                                            Age: {request.fromUserId.age}
                                        </div>
                                        <div className="badge badge-outline">
                                            {request.fromUserId.gender}
                                        </div>
                                    </div>
                                    
                                    {/* Skills */}
                                    {request.fromUserId.skills && request.fromUserId.skills.length > 0 && (
                                        <div className="mt-4">
                                            <p className="text-sm font-semibold mb-2">Skills:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {request.fromUserId.skills.map((skill, index) => (
                                                    <div key={index} className="badge badge-primary badge-sm">
                                                        {skill}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                
                                {/* Action Buttons */}
                                <div className="flex flex-col gap-3">
                                    <button
                                        onClick={() => reviewRequest("accepted", request._id)}
                                        className="btn btn-success btn-sm"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Accept
                                    </button>

                                    <button
                                        onClick={() => reviewRequest("rejected", request._id)}
                                        className="btn btn-error btn-sm"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        Reject
                                    </button>
                                </div>
                            </div>
                            
                            {/* Request Date and Status */}
                            <div className="divider"></div>
                            <div className="flex justify-between items-center">
                                <div className="text-sm opacity-60">
                                    Request sent: {new Date(request.createdAt).toLocaleDateString()}
                                </div>
                                <div className={`badge ${
                                    request.status === 'accepted' 
                                        ? 'badge-success' 
                                        : request.status === 'rejected'
                                        ? 'badge-error'
                                        : 'badge-warning'
                                }`}>
                                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Requests;