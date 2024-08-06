import { useState, useEffect } from 'react';
import axios from 'axios';
import './NewsPage.css';

const NewsPage = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/news');
        setNews(response.data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="news-container">
      <h1>Top News</h1>
      {news.map((article, index) => (
        <div key={index} className="news-article">
          {article.urlToImage && (
            <img src={article.urlToImage} alt={article.title} className="news-image" />
          )}
          <h2 className="news-title">{article.title}</h2>
          <p className="news-description">{article.description}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="news-link">
            Read more
          </a>
        </div>
      ))}
    </div>
  );
};

export default NewsPage;
