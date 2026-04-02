import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "../supabaseClient";
import "./watches.css";

export default function Watches() {

  const [articles, setArticles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);

  // ✅ ADDED (same as home.jsx)
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const getArticleUrl = (article) => `/watches/${article.slug || article.id}`;

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
          .eq("category", "watches")
          .order("created_at", { ascending: false });

        if (error) return;

        setArticles(data || []);
        setTimeout(() => reloadAds(), 800);

      } catch {}
    };

    load();
  }, []);

  const headlines = articles.filter(a => a.position === "headline").slice(0, 1);

  const normals = articles.filter(a => {
  if (a.position !== "headline") return true;
  return headlines[0] && a.id !== headlines[0].id;
    });
  const visibleArticles = normals.slice(0, visibleCount);
  const showMore = () => setVisibleCount(prev => prev + 12);

  if (!articles.length) return <div className="watches-page">Loading Watches...</div>;

  return (
    <main className="watches-page">

      {/* SEO META */}
      <Helmet>
        <title>Best Watches | ArenaPulse</title>
        <meta name="description" content="Latest watch reviews, smart watches and luxury watches." />

        <meta property="og:title" content="Best Watches | ArenaPulse" />
        <meta property="og:description" content="Latest watch reviews, smart watches and luxury watches." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://arenapulse.site/watches" />

        <meta name="twitter:card" content="summary_large_image" />

        <link rel="canonical" href="https://arenapulse.site/watches" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Best Watches",
            "url": "https://arenapulse.site/watches",
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

      {/* NAV AD */}
      <div className="watch-nav-banner">
        <div style={{ textAlign:"center",fontSize:"12px",color:"#888",marginBottom:"5px"}}>
          Advertisement
        </div>
        <ins
          className="adsbygoogle"
          style={{ display:"block", width:"970px", height:"170px"}}
          data-ad-client="ca-pub-xxxxxxxxxxxxx"
          data-ad-slot="9999999999"
          data-full-width-responsive="true">
        </ins>
      </div>

      {/* SINGLE BIG HEADLINE */}
      {headlines[0] && (
        <Link to={getArticleUrl(headlines[0])} className="watch-featured-main">
          <img
            src={headlines[0].image}
            alt={headlines[0].title}
            loading="lazy"
            decoding="async"
          />
          <div className="watch-featured-main-text">
            <h2>{headlines[0].title}</h2>
            <p>{headlines[0].summary}</p>
          </div>
        </Link>
      )}

      {/* TOP AD */}
      <div className="watch-horizontal-ad-top">
        <div style={{ textAlign:"center",fontSize:"12px",color:"#888",marginBottom:"5px"}}>
          Advertisement
        </div>
        <ins
          className="adsbygoogle"
          style={{ display:"block", width:"970px", height:"250px"}}
          data-ad-client="ca-pub-xxxxxxxxxxxxx"
          data-ad-slot="1111111111"
          data-ad-format="rectangle"
          data-full-width-responsive="true">
        </ins>
      </div>

      {/* ARTICLE LIST */}
      <div className="watch-list">
        {visibleArticles.map((article, index) => (
          <React.Fragment key={article.id}>
            <Link to={getArticleUrl(article)} className="watch-row">

              <div className="watch-text">
                
                {/* ✅ ADDED fallback author */}
                <div className="watch-author">
                  By {article.author || "Zubair.K"}
                </div>

                <h3>{article.title}</h3>
                <p>{article.summary}</p>

                {/* ✅ ADDED formatted date */}
                <div className="watch-date">
                  {formatDate(article.created_at)}
                </div>
              </div>

              <div className="watch-image">
                <img
                  src={article.image}
                  alt={article.title}
                  loading="lazy"
                  decoding="async"
                />
              </div>

            </Link>

            {index === 7 && (
              <div className="watch-horizontal-ad-bottom">
                <div style={{ textAlign:"center",fontSize:"12px",color:"#888",marginBottom:"5px"}}>
                  Advertisement
                </div>
                <ins
                  className="adsbygoogle"
                  style={{ display:"block", width:"970px", height:"250px"}}
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
        <button className="more-btn" onClick={showMore}>More</button>
      )}

    </main>
  );
}