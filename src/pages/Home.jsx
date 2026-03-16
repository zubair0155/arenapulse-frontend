import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async"; // ✅ SEO IMPROVEMENT ADDED
import { supabase } from "../supabaseClient";
import "./home.css";

const reloadAds = () => {
  try {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  } catch (e) {}
};

export default function Home() {

  const [articles, setArticles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const navigate = useNavigate();

  /* FIRST AD LOAD */
  useEffect(() => {
    reloadAds();
  }, []);

  /* LOAD ARTICLES FROM SUPABASE */
  useEffect(() => {
    const load = async () => {
      try {
        const { data, error } = await supabase
          .from("articles")
          .select("*")
          .eq("category", "news")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error loading articles:", error.message);
          return;
        }

        const now = Date.now();
        const filtered = (data || []).filter(
          (a) => !a.expiresAt || new Date(a.expiresAt).getTime() > now
        );

        setArticles(filtered);

      } catch (err) {
        console.error("Error loading articles:", err);
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

  /* RELOAD ADS WHEN DATA READY */
  useEffect(() => {
    const timer = setTimeout(() => {
      reloadAds();
    }, 900);

    return () => clearTimeout(timer);
  }, [articles]);

  const visibleArticles = normals.slice(0, visibleCount);

  const showMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  return (
    <div className="home-container">

      {/* ✅ SEO META ADDED */}
      <Helmet>
        <title>ArenaPulse – Latest Breaking News & Sports</title>
        <meta
          name="description"
          content="ArenaPulse delivers the latest breaking news, trending stories, and live sports updates."
        />

        {/* Open Graph */}
        <meta property="og:title" content="ArenaPulse – Breaking News" />
        <meta property="og:description" content="Latest breaking news and sports updates." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://arenapulse.com/" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsMediaOrganization",
            name: "ArenaPulse",
            url: "https://arenapulse.com",
            logo: "https://arenapulse.com/logo.png"
          })}
        </script>
      </Helmet>

      {/* ===== NAV BAR AD (NEW) ===== */}
      <div className="nav-horizontal-ad">
        <div style={{ textAlign: "center", fontSize: "12px", color: "#888", marginBottom: "5px" }}>
            Advertisement
        </div>
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "970px", height: "150px", overflow: "hidden" }}
          data-ad-client="ca-pub-xxxxxxxxxxxxx"
          data-ad-slot="9999999999"
          data-full-width-responsive="true"
        ></ins>
      </div>

      {/* ---------------- HEADLINES ---------------- */}
      <div className="headlines">

        {headlines[0] && (
          <div
            className="headline-main"
            onClick={() => navigate(`/article/${headlines[0].slug}`)}
          >
            <img
              src={headlines[0].image || ""}
              alt={headlines[0].title}
              loading="lazy"        // ✅ PERFORMANCE IMPROVEMENT
              decoding="async"      // ✅ PERFORMANCE IMPROVEMENT
            />
            <div className="overlay">
              <h2>{headlines[0].title}</h2>
              <p>{headlines[0].summary}</p>
            </div>
          </div>
        )}

        <div className="headline-side">

          {headlines[1] && (
            <div
              className="headline-small"
              onClick={() => navigate(`/article/${headlines[1].slug}`)}
            >
              <img
                src={headlines[1].image || ""}
                alt={headlines[1].title}
                loading="lazy"
                decoding="async"
              />
              <div className="overlay">
                <h3>{headlines[1].title}</h3>
              </div>
            </div>
          )}

          {headlines[2] && (
            <div
              className="headline-small"
              onClick={() => navigate(`/article/${headlines[2].slug}`)}
            >
              <img
                src={headlines[2].image || ""}
                alt={headlines[2].title}
                loading="lazy"
                decoding="async"
              />
              <div className="overlay">
                <h3>{headlines[2].title}</h3>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* TOP AD */}
      <div className="home-ad">
        <div style={{ textAlign: "center", fontSize: "12px", color: "#888", marginBottom: "5px" }}>
            Advertisement
        </div>
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "970px", height: "250px" }}
          data-ad-client="ca-pub-xxxxxxxxxxxxx"
          data-ad-slot="1111111111"
          data-ad-format="rectangle"
          data-full-width-responsive="true"
        ></ins>
      </div>

      {/* ---------------- ARTICLE GRID ---------------- */}
      <div className="articles-grid">

        {visibleArticles.map((a) => (
          <div
            key={a.id}
            className="article-card"
            onClick={() => navigate(`/article/${a.slug}`)}
          >
            <img
              src={a.image || ""}
              alt={a.title}
              loading="lazy"   // ✅ PERFORMANCE IMPROVEMENT
              decoding="async"
            />
            <div className="text">
              <h3>{a.title}</h3>
              <p>{a.summary}</p>
            </div>
          </div>
        ))}

      </div>
      
      {/* BOTTOM AD */}
      <div className="home-ad">
        <div style={{ textAlign: "center", fontSize: "12px", color: "#888", marginBottom: "5px" }}>
            Advertisement
        </div>
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "970px", height: "250px" }}
          data-ad-client="ca-pub-xxxxxxxxxxxxx"
          data-ad-slot="2222222222"
          data-ad-format="rectangle"
          data-full-width-responsive="true"
        ></ins>
      </div>
      
      {normals.length > visibleCount && (
        <button className="more-btn" onClick={showMore}>
          More
        </button>
      )}

    </div>
  );
}