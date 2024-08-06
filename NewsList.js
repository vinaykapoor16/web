import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsList = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/news`);
      setNews(res.data);
    };
    fetchNews();
  }, []);

  return (
    <div>
      <h2>Latest News</h2>
      {news.map((item) => (
        <div key={item._id}>
          <h3>{item.title}</h3>
          <p>{item.content}</p>
          <p>By {item.author} on {new Date(item.date).toLocaleDateString()}</p>
          {item.imageUrl && <img src={item.imageUrl} alt={item.title} />}
          {item.pdfUrl && <a href={item.pdfUrl} target="_blank" rel="noopener noreferrer">View PDF</a>}
        </div>
      ))}
    </div>
  );
};

export default NewsList;