import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from './Utils/constants';
import { addConnections } from './Utils/connectionSlice';

const Connections = () => {
const dispatch = useDispatch();

// Access the array from the Redux slice properly
const connections = useSelector((state) => state.connections || []);

const fetchConnections = async () => {
try {
    const res = await axios.get(BASE_URL + '/user/connections', {
    withCredentials: true,
    });
    dispatch(addConnections(res.data));
    console.log('Connections fetched successfully:', res.data);
} catch (error) {
    console.error('Error fetching connections:', error);
}
};

useEffect(() => {
fetchConnections();
}, []);

if(!connections ) return;

if (connections.length === 0) return <h1> No connection Found</h1>

return (
<div>
    <h1 className="text-3xl font-bold text-center my-4">Connections</h1>
    <p className="text-center text-gray-600">
    This is the connections page where you can manage your connections.
    </p>

    <div>
    {connections.map((connection, index) => {
        const { firstName, lastName, photoUrl, age, gender, skills } = connection;

        return (
        <div key={index} className="my-4">
            <img
            src={photoUrl}
            alt={`${firstName} ${lastName}`}
            className="w-32 h-32 object-cover rounded-full mx-auto"
            />
            <h2 className="text-xl text-center mt-2">
            {firstName} {lastName}
            </h2>
            <p className="text-center text-sm text-gray-500">
            Age: {age} | Gender: {gender}
            </p>
            <p className="text-center text-sm text-gray-600">
            Skills: {skills.join(', ')}
            </p>
        </div>
        );
    })}
    </div>
</div>
);
};

export default Connections;
