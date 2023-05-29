import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [article, setArticle] = useState(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://newsapi.org/v2/top-headlines?country=se&apiKey=9dab28e3f33c4b0fbaf76508b12cda71"
      );
      setArticle(result.data.articles[index]);
    };

    fetchData();
  }, [index]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex === 9 ? 0 : prevIndex + 1));
    }, 100 * 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="news">
      <h3>Top Headline in Sweden</h3>
      {article && (
        <div className="article">
          <div className="article-img">
            <img src={article.urlToImage} alt={article.title} />
          </div>
          <div className="article-content">
            <h4>{article.title}</h4>
            <p className="article-description">{article.description}</p>
            <p className="article-date">{article.publishedAt}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
