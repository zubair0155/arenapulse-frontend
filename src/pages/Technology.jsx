import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./technology.css";

export default function Technology() {

  const [articles, setArticles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);

  /* NEW CODE — SLUG URL HELPER */
  const getArticleUrl = (article) => {
    return `/tech/${article.slug || article.id}`;
  };

  /* Adsense Reload */
  const reloadAds = () => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  };

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

        setTimeout(() => {
          reloadAds();
        }, 800);

      } catch (err) {
        console.error("Error loading technology articles:", err);
      }
    };

    load();
  }, []);

  /* SPLIT HEADLINES + NORMAL WITH EXTRA HEADLINES GOING DOWN */
  const allHeadlines = articles.filter(a => a.position === "headline");
  const headlines = allHeadlines.slice(0, 3); // top 3 for headline section
  const remainingHeadlines = allHeadlines.slice(3); // extra headlines move to normal
  const normals = [
    ...articles.filter(a => a.position !== "headline"),
    ...remainingHeadlines
  ];

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
          <Link to={getArticleUrl(headlines[0])} className="featured-main">

            {headlines[0].image && (
              <img 
                src={headlines[0].image} 
                alt={headlines[0].title} 
              />
            )}

            <div className="featured-main-text">
              <h2>{headlines[0].title}</h2>
              {headlines[0].summary && (
                <p>{headlines[0].summary}</p>
              )}
            </div>

          </Link>
        )}

        <div className="featured-side">
          {headlines.slice(1, 3).map(article => (
            <Link key={article.id} to={getArticleUrl(article)}>

              {article.image && (
                <img 
                  src={article.image} 
                  alt={article.title} 
                />
              )}

              <div className="featured-side-text">
                <h3>{article.title}</h3>
              </div>

            </Link>
          ))}
        </div>

      </div>

      {/* ===== HORIZONTAL AD BELOW HEADLINES ===== */}
      <div className="tech-horizontal-ad-top">
        <ins
          className="adsbygoogle"
          style={{
            display: "block",
            width: "970px",
            height: "90px",
            overflow: "hidden"
          }}
          data-ad-client="ca-pub-xxxxxxxxxxxxx"
          data-ad-slot="1111111111"
          data-ad-format="horizontal"
          data-full-width-responsive="true">
        </ins>
      </div>

      {/* ===== ARTICLE LIST ===== */}
      <div className="tech-list">

        {visibleArticles.map((article, index) => (
          <React.Fragment key={article.id}>

            <Link
              to={getArticleUrl(article)}
              className="tech-row"
            >
              <div className="tech-text">

                {/* AUTHOR */}
                {article.author && (
                  <div className="tech-author">
                    By {article.author}
                  </div>
                )}

                {/* TITLE */}
                <h3>{article.title}</h3>

                {/* SUMMARY */}
                <p>{article.summary}</p>

                {/* DATE */}
                <div className="tech-date">
                  {new Date(article.created_at).toLocaleDateString()}
                </div>

              </div>

              <div className="tech-image">
                <img src={article.image} alt="" />
              </div>
            </Link>

            {/* AD AFTER 10th NORMAL ARTICLE */}
            {index === 9 && (
              <div className="tech-horizontal-ad-bottom">
                <ins
                  className="adsbygoogle"
                  style={{
                    display: "block",
                    width: "970px",
                    height: "90px",
                    overflow: "hidden"
                  }}
                  data-ad-client="ca-pub-xxxxxxxxxxxxx"
                  data-ad-slot="2222222222"
                  data-ad-format="horizontal"
                  data-full-width-responsive="true">
                </ins>
              </div>
            )}
          </React.Fragment>
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