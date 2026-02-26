import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import "./technology.css";

export default function TechnologyArticle() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  /* LOAD ARTICLE FROM SUPABASE */
  useEffect(() => {

    const loadArticle = async () => {

      try {

        const { data, error } = await supabase
          .from("articles")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.error("Error loading technology article:", error.message);
          setLoading(false);
          return;
        }

        setArticle(data);
        setLoading(false);

      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    loadArticle();

  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!article) return <div>Article not found</div>;

  return (
    <div className="tech-article-page">

      <div className="tech-article-main">

        {/* Title with Back Button */}
        <div className="title-row">
          <button className="small-back" onClick={() => navigate(-1)}>
            ←
          </button>

          <h1>{article.title}</h1>
        </div>

        {article.image && (
          <img src={article.image} alt="" className="article-image" />
        )}

        {/* Share Button */}
        <div className="share-row">
          <button className="share-btn">
            Share
          </button>
        </div>

        {article.content.split("\n").map((line, index) => (
  <div key={index}>
    
    <p style={{ lineHeight: "1.8", fontSize: "18px" }}>
      {line}
    </p>

    {index === 4 && (
      <div
        style={{
          margin: "40px 0",
          padding: "20px",
          textAlign: "center",
          background: "#f1f1f1",
          border: "1px solid #ddd",
          fontWeight: "bold"
        }}
      >
        Horizontal Advertisement Banner (728x90)
      </div>
    )}

  </div>
))}
      </div>

      {/* RIGHT SIDE ADS */}
      <aside className="tech-ads">
        <div className="square-ad">Google Ad 300x250</div>
        <div className="square-ad">Google Ad 300x250</div>
      </aside>

    </div>
  );
}