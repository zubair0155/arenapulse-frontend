import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "../supabaseClient";
import "./technology.css";

export default function Technology() {

  const [articles, setArticles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);

  // ✅ ADDED (date formatter)
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const getArticleUrl = (article) => `/tech/${article.slug || article.id}`;

  const reloadAds = () => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  };

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

        setTimeout(() => reloadAds(), 800);

      } catch (err) {
        console.error("Error loading technology articles:", err);
      }
    };

    load();
  }, []);

  const allHeadlines = articles.filter(a => a.position === "headline");
  const headlines = allHeadlines.slice(0, 3);
  const remainingHeadlines = allHeadlines.slice(3);
  const normals = [
    ...articles.filter(a => a.position !== "headline"),
    ...remainingHeadlines
  ];

  const visibleArticles = normals.slice(0, visibleCount);

  const showMore = () => setVisibleCount(prev => prev + 12);

  if (!articles.length) return <div className="technology-page">Loading Technology Articles...</div>;

  return (
    <main className="technology-page">

      <Helmet>
        <title>Technology News | ArenaPulse</title>
        <meta
          name="description"
          content="Latest technology news, gadgets, AI updates and tech trends on ArenaPulse."
        />

        <meta property="og:title" content="Technology News | ArenaPulse" />
        <meta property="og:description" content="Latest technology news and updates." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://arenapulse.site/technology" />

        <meta name="twitter:card" content="summary_large_image" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Technology News",
            "url": "https://arenapulse.site/technology",
            "publisher": {
              "@type": "Organization",
              "name": "ArenaPulse",
              "logo": {
                "@type": "ImageObject",
                "url": "https://arenapulse.site/logo.png"
              }
            }
          })}
        </script>
      </Helmet>

      {/* ===== NAV BANNER ===== */}
      <div className="tech-nav-banner">
        <div style={{ textAlign: "center", fontSize: "12px", color: "#888", marginBottom: "5px" }}>
            Advertisement
        </div>
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "970px", height: "170px", overflow: "hidden" }}
          data-ad-client="ca-pub-xxxxxxxxxxxxx"
          data-ad-slot="9999999999"
          data-full-width-responsive="true">
        </ins>
      </div>

      {/* ===== HEADLINES ===== */}
      <div className="tech-featured">

        {headlines[0] && (
          <Link to={getArticleUrl(headlines[0])} className="featured-main">
            {headlines[0].image && (
              <img
                src={headlines[0].image}
                alt={headlines[0].title}
                loading="lazy"
                decoding="async"
                fetchpriority="high"
              />
            )}
            <div className="featured-main-text">
              <h2>{headlines[0].title}</h2>
              {headlines[0].summary && <p>{headlines[0].summary}</p>}
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
                  loading="lazy"
                  decoding="async"
                />
              )}
              <div className="featured-side-text">
                <h3>{article.title}</h3>
              </div>
            </Link>
          ))}
        </div>

      </div>

      {/* ===== HORIZONTAL AD ===== */}
      <div className="tech-horizontal-ad-top">
        <div style={{ textAlign: "center", fontSize: "12px", color: "#888", marginBottom: "5px" }}>
           Advertisement
        </div>
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "970px", height: "250px" }}
          data-ad-client="ca-pub-xxxxxxxxxxxxx"
          data-ad-slot="1111111111"
          data-ad-format="rectangle"
          data-full-width-responsive="true">
        </ins>
      </div>

      {/* ===== ARTICLE LIST ===== */}
      <div className="tech-list">
        {visibleArticles.map((article, index) => (
          <React.Fragment key={article.id}>
            <Link to={getArticleUrl(article)} className="tech-row">
              <div className="tech-text">
                <div className="tech-author">
                  By {article.author || "Zubair.K"}
                </div>
                <h3>{article.title}</h3>
                <p>{article.summary}</p>
                <div className="tech-date">
                  {formatDate(article.created_at)}
                </div>
              </div>
              <div className="tech-image">
                <img
                  src={article.image}
                  alt={article.title}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </Link>

            {index === 7 && (
              <div className="tech-horizontal-ad-bottom">
                <div style={{ textAlign: "center", fontSize: "12px", color: "#888", marginBottom: "5px" }}>
                  Advertisement
                </div>
                <ins
                  className="adsbygoogle"
                  style={{ display: "block", width: "970px", height: "250px" }}
                  data-ad-client="ca-pub-xxxxxxxxxxxxx"
                  data-ad-slot="2222222222"
                  data-ad-format="rectangle"
                  data-full-width-responsive="true">
                </ins>
              </div>
            )}

          </React.Fragment>
        ))}
      </div>

      {normals.length > visibleCount && (
        <button className="more-btn" onClick={showMore}>
          More
        </button>
      )}

    </main>
  );
}