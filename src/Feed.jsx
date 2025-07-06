import axios from "axios"
import { BASE_URL } from "./Utils/constants"
import { useEffect } from "react";
import { addFeed } from "./Utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    try {
      if (feed && Array.isArray(feed) && feed.length > 0) return; // Only fetch if feed is empty
      const res = await axios.get(BASE_URL + '/user/feed?page=1&limit=5', {
        withCredentials: true
      });
      dispatch(addFeed(res.data.feed || res.data.data || res.data));
    } catch (err) {
      console.error("Error fetching feed data", err);
    }
  }

  useEffect(() => {
    getFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Only render UserCard if feed is an array and has at least one user
  return (
    <div>
      {Array.isArray(feed) && feed.length > 0 ? (
        <UserCard user={feed[0]} />
      ) : (
        <div>No users found.</div>
      )}
    </div>
  )
}

export default Feed