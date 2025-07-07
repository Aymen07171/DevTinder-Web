// components/UserCard.jsx

const UserCard = ({ user }) => {
  if (!user) return null;

  return (
    <div className="flex justify-center items-center min-h-screen shadow-lg p-4">
      <div className="max-w-sm w-full bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        {/* Figure */}
        <figure className="w-full h-64 overflow-hidden">
          <img
            src={user.photoUrl}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-full h-full object-cover"
          />
        </figure>

        {/* Card Body */}
        <div className="p-4 flex flex-col items-center text-center">
          {/* Title */}
          <h2 className="text-2xl font-semibold text-gray-800">
            {user.firstName} {user.lastName}
          </h2>

          {/* Description */}
          <p className="text-gray-600 mt-2 text-sm">
            {user.skills && user.skills.length > 0 ? user.skills.join(' - ') : 'No skills listed'}
          </p>
          {/* Actions */}
          <div className="mt-4 flex gap-4">
            <button className="px-4 py-2 bg-primary text-white">
              Pass
            </button>
            <button className="px-4 py-2 bg-secondary text-white">
              Intrested 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;