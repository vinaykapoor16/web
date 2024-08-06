// frontend/src/components/TwitterFeed.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TwitterFeed = () => {
  const [tweets, setTweets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/twitter/tweets`);
        setTweets(res.data);
      } catch (err) {
        console.error("Error fetching tweets:", err);
        setError("Failed to fetch tweets. Please try again later.");
      }
    };
    fetchTweets();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Twitter Feed</h2>
      {tweets.length === 0 ? (
        <p>Loading tweets...</p>
      ) : (
        tweets.map((tweet) => (
          <div key={tweet.id}>
            <p>{tweet.text}</p>
            <p>By {tweet.user.name} on {new Date(tweet.created_at).toLocaleDateString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default TwitterFeed;