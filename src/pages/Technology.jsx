import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./technology.css";

export default function Technology() {

  const [articles, setArticles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);

  /* LOAD TECHNOLOGY ARTICLES */
  useEffect(() => {
    const load = async () => {
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

        setArticles(data || []);

      } catch (err) {
        console.error("Error loading technology articles:", err);
      }
    };

    load();
  }, []);

  /* SPLIT HEADLINES + NORMAL */
  const headlines = articles
    .filter(a => a.position === "headline")
    .slice(0, 3);

  const normals = articles.filter(a => a.position !== "headline");

  const visibleArticles = normals.slice(0, visibleCount);

  const showMore = () => {
    setVisibleCount(prev => prev + 12);
  };

  if (!articles.length) {
    return <div className="technology-page">Loading Technology Articles...</div>;
  }

  return (
    <div className="technology-page">

      {/* ===== HEADLINES ===== */}
      <div className="tech-featured">

        {headlines[0] && (
          <Link to={`/tech/${headlines[0].id}`} className="featured-main">
            <img src={headlines[0].image} alt="" />
            <h2>{headlines[0].title}</h2>
          </Link>
        )}

        <div className="featured-side">
          {headlines.slice(1, 3).map(article => (
            <Link key={article.id} to={`/tech/${article.id}`}>
              <img src={article.image} alt="" />
              <h3>{article.title}</h3>
            </Link>
          ))}
        </div>

      </div>

      {/* ===== ARTICLE LIST ===== */}
      <div className="tech-list">

        {visibleArticles.map(article => (
          <Link
            key={article.id}
            to={`/tech/${article.id}`}
            className="tech-row"
          >
            <div className="tech-text">
              <h3>{article.title}</h3>
              <p>{article.summary}</p>
            </div>

            <div className="tech-image">
              <img src={article.image} alt="" />
            </div>

          </Link>
        ))}

      </div>

      {/* MORE BUTTON */}
      {normals.length > visibleCount && (
        <button className="more-btn" onClick={showMore}>
          More
        </button>
      )}

    </div>
  );
}