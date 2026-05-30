import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
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

  // ✅ ADDED: date formatter
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  useEffect(() => {
    reloadAds();
  }, []);

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
    <main className="home-container">

      <Helmet>
        <title>ArenaPulse – Latest AI News & Tech</title>

        <meta
          name="description"
          content="ArenaPulse delivers the latest ai news, trending updates."
        />

        <link rel="canonical" href="https://arenapulse.site/" />

        <meta property="og:title" content="ArenaPulse – Breaking News" />
        <meta property="og:description" content="Latest breaking news and sports updates." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://arenapulse.site/" />

        <meta name="twitter:card" content="summary_large_image" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsMediaOrganization",
            name: "ArenaPulse",
            url: "https://arenapulse.site",
            logo: "https://arenapulse.site/logo.png"
          })}
        </script>
      </Helmet>

        {/* TOP AFFILIATE */}
      <div className="home-top-affiliate-banner">
        <a href="https://www.checkout-ds24.com/redir/673156/zubair0155/" target="_blank" rel="noopener noreferrer">
          <img src="https://hitegkdaplzdbjgbggsz.supabase.co/storage/v1/object/public/Ads-image/dropshiping.jpg" alt="Affiliate Banner" />
        </a>
      </div> 
     
      <div className="headlines">

        {headlines[0] && (
          <div
            className="headline-main"
            role="button"
            tabIndex="0"
            onClick={() => navigate(`/article/${headlines[0].slug}`)}
          >
            <img
              src={headlines[0].image || ""}
              alt={headlines[0].title}
              loading="lazy"
              decoding="async"
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
              role="button"
              tabIndex="0"
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
              role="button"
              tabIndex="0"
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

          {/* Mid AFFILIATE */}
        <div className="home-mid-affiliate-banner">
            <a href="https://www.digistore24.com/redir/588740/zubair0155/" target="_blank" rel="noopener noreferrer">
             <img src="https://hitegkdaplzdbjgbggsz.supabase.co/storage/v1/object/public/Ads-image/Hosterlo.jpg" alt="Affiliate Banner" />
            </a>
        </div> 

      <div className="articles-grid">

        {visibleArticles.map((a) => (
          <div
            key={a.id}
            className="article-card"
            role="button"
            tabIndex="0"
            onClick={() => navigate(`/article/${a.slug}`)}
          >
            <img
              src={a.image || ""}
              alt={a.title}
              loading="lazy"
              decoding="async"
            />
            <div className="text">
              <h3>{a.title}</h3>

              {/* ✅ ADDED author + date */}
              <div className="meta">
                <span>By {a.author || "Zubair.K"}</span>
                <span> - </span>
                <span>{formatDate(a.created_at)}</span>
              </div>

              <p>{a.summary}</p>
            </div>
          </div>
        ))}
      </div>

         {/* Mid AFFILIATE */}
      <div className="home-mid-affiliate-banner">
        <a href="http://www.goslimplan.fit#aff=zubair0155" target="_blank" rel="noopener noreferrer">
          <img src="https://hitegkdaplzdbjgbggsz.supabase.co/storage/v1/object/public/Ads-image/30-days.jpg" alt="Affiliate Banner" />
        </a>
      </div> 

      {normals.length > visibleCount && (
        <button className="more-btn" onClick={showMore}>
          More
        </button>
      )}

    </main>
  );
}