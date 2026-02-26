import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }, []);

  /* LOAD ARTICLES FROM SUPABASE */
  useEffect(() => {
    const load = async () => {
      try {

        const { data, error } = await supabase
          .from("articles")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error loading articles:", error.message);
          return;
        }

        /* remove expired (if field exists) */
        const now = Date.now();
        const filtered = data.filter(
          (a) => !a.expiresAt || new Date(a.expiresAt).getTime() > now
        );

        setArticles(filtered);

      } catch (err) {
        console.error("Error loading articles:", err);
      }
    };

    load();
  }, []);

  /* SPLIT HEADLINES + NORMAL */
  const headlines = articles
    .filter((a) => a.position === "headline")
    .slice(0, 3);

  const normals = articles.filter((a) => a.position !== "headline");

  /* RELOAD ADS WHEN DATA READY */
  useEffect(() => {
    const timer = setTimeout(() => {
      reloadAds();
    }, 900);

    return () => clearTimeout(timer);
  }, [articles, headlines]);

  /* visible articles */
  const visibleArticles = normals.slice(0, visibleCount);

  /* MORE BUTTON */
  const showMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  return (
    <div className="home-container">

      {/* ---------------- HEADLINES ---------------- */}
      <div className="headlines">

        {/* BIG LEFT */}
        {headlines[0] && (
          <div
            className="headline-main"
            onClick={() => navigate(`/article/${headlines[0].id}`)}
          >
            <img src={headlines[0].image} />
            <div className="overlay">
              <h2>{headlines[0].title}</h2>
              <p>{headlines[0].summary}</p>
            </div>
          </div>
        )}

        {/* RIGHT SIDE */}
        <div className="headline-side">

          {headlines[1] && (
            <div
              className="headline-small"
              onClick={() => navigate(`/article/${headlines[1].id}`)}
            >
              <img src={headlines[1].image} />
              <div className="overlay">
                <h3>{headlines[1].title}</h3>
              </div>
            </div>
          )}

          {headlines[2] && (
            <div
              className="headline-small"
              onClick={() => navigate(`/article/${headlines[2].id}`)}
            >
              <img src={headlines[2].image} />
              <div className="overlay">
                <h3>{headlines[2].title}</h3>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* TOP AD */}
      <div className="home-ad">
        <ins
          className="adsbygoogle"
          style={{ display: "block", minHeight: "280px" }}
          data-ad-client="ca-pub-xxxxxxxxxxxxx"
          data-ad-slot="1111111111"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>

      {/* ---------------- ARTICLE GRID ---------------- */}
      <div className="articles-grid">

        {visibleArticles.map((a) => (
          <div
            key={a.id}
            className="article-card"
            onClick={() => navigate(`/article/${a.id}`)}
          >
            <img src={a.image} />
            <div className="text">
              <h3>{a.title}</h3>
              <p>{a.summary}</p>
            </div>
          </div>
        ))}

      </div>

      {/* BOTTOM AD */}
      <div className="home-ad">
        <ins
          className="adsbygoogle"
          style={{ display: "block", minHeight: "280px" }}
          data-ad-client="ca-pub-xxxxxxxxxxxxx"
          data-ad-slot="2222222222"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
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