import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./technology.css";

export default function Technology() {
  const [techArticles, setTechArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 10;

  useEffect(() => {
    async function fetchArticles() {
      try {

        const { data, error } = await supabase
          .from("articles")
          .select("*")
          .eq("category", "technology")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error loading technology articles:", error.message);
          return;
        }

        const formatted = data.map(article => ({
          id: article.id,
          title: article.title,
          image: article.image || "",
          summary: article.summary,
          excerpt: article.summary,
          content: article.content,
          category: "Technology",
          author: "Admin",
          views: 0,
          date: article.created_at
            ? new Date(article.created_at).toLocaleDateString()
            : ""
        }));

        setTechArticles(formatted);

      } catch (error) {
        console.error("Error loading technology articles:", error);
      }
    }

    fetchArticles();
  }, []);

  const sortedArticles = [...techArticles];

  const indexOfLast = currentPage * articlesPerPage;
  const indexOfFirst = indexOfLast - articlesPerPage;
  const currentArticles = sortedArticles.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(sortedArticles.length / articlesPerPage);

  const featured = sortedArticles.slice(0, 3);

  if (techArticles.length === 0) {
    return <div className="technology-page">Loading Technology Articles...</div>;
  }

  return (
    <div className="technology-page">

      {/* TOP 3 FEATURED */}
      <div className="tech-featured">
        {featured[0] && (
          <Link to={`/tech/${featured[0].id}`} className="featured-main">
            <img src={featured[0].image} alt="" />
            <h2>{featured[0].title}</h2>
          </Link>
        )}

        <div className="featured-side">
          {featured.slice(1, 3).map((article) => (
            <Link key={article.id} to={`/tech/${article.id}`}>
              <img src={article.image} alt="" />
              <h3>{article.title}</h3>
            </Link>
          ))}
        </div>
      </div>

      {/* Horizontal Google Ad */}
      <div className="ad-horizontal">
        Google Ad 728x90
      </div>

      {/* 10 Articles */}
      <div className="tech-list">
        {currentArticles.map((article) => (
          <Link
            key={article.id}
            to={`/tech/${article.id}`}
            className="tech-row"
          >
            <div className="tech-text">
              <div className="meta">
                <span>{article.views} Views</span>
                <span className="category">{article.category}</span>
              </div>

              <h3>{article.title}</h3>
              <p>{article.excerpt}</p>

              <div className="author">
                by {article.author} • {article.date}
              </div>
            </div>

            <div className="tech-image">
              <img src={article.image} alt="" />
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>

    </div>
  );
}