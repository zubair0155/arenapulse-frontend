import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { supabase } from "../supabaseClient";
import { Helmet } from "react-helmet-async";
import "./article.css";

export default function Article() {

  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openShare, setOpenShare] = useState(false);
  const shareRef = useRef(null);

  const url = window.location.href;

  /* -------- LOAD ARTICLE FROM SUPABASE -------- */
  useEffect(() => {
    const fetchArticle = async () => {
      try {

        const { data, error } = await supabase
          .from("articles")
          .select("id,title,summary,content,image,position,created_at")
          .eq("id", id)
          .single();

        if (error) {
          console.error("Error loading article:", error.message);
          setLoading(false);
          return;
        }

        setArticle(data);
        setLoading(false);

      } catch (err) {
        console.error("Error loading article:", err);
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  /* -------- LOAD ADS AFTER PAGE RENDER -------- */
  useEffect(() => {
    if (article) {
      const timer = setTimeout(() => {
        try {
          // sidebar ad
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          // mid article ad
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          // last article ad
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {}
      }, 900);

      return () => clearTimeout(timer);
    }
  }, [article]);

  /* CLOSE SHARE WHEN CLICK OUTSIDE */
  useEffect(() => {
    function handleClickOutside(e) {
      if (shareRef.current && !shareRef.current.contains(e.target)) {
        setOpenShare(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  if (!article) return <h2 style={{ textAlign: "center" }}>Article not found</h2>;

  // ✅ SPLIT CONTENT INTO PARAGRAPHS
  const paragraphs = article.content
    ? article.content.split("\n")
    : [];

  /* -------- SHARE FUNCTIONS -------- */
  const share = (type) => {
    const text = article.title + " " + url;

    if (type === "facebook")
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");

    if (type === "twitter")
      window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");

    if (type === "whatsapp")
      window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");

    if (type === "email")
      window.open(`mailto:?subject=${article.title}&body=${text}`);
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    alert("Link copied!");
  };

  return (
    <>
      {/* -------- ADVANCED SEO -------- */}
      <Helmet>
        <title>{article.title} | ArenaPulse</title>

        <meta
          name="description"
          content={article.summary || "Latest news and technology updates from ArenaPulse"}
        />

        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.summary || article.title} />
        <meta property="og:image" content={article.image} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.summary || article.title} />
        <meta name="twitter:image" content={article.image} />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: article.title,
            image: article.image,
            datePublished: article.created_at,
            description: article.summary,
            mainEntityOfPage: url
          })}
        </script>
      </Helmet>
      <div className="top-affiliate-banner">
         <a href="YOUR_AFFILIATE_LINK" target="_blank" rel="noopener noreferrer">
            <img
               src="YOUR_BANNER_IMAGE_URL"
               alt="Affiliate Banner"
           />
         </a>
      </div>

      <div className="news-article-page">
        <div className="article-layout">

          <div className="article-main">

          <div className="title-section">
             <button
               className="back-btn"
               onClick={() => window.history.back()}
             >
               ← Back
             </button>

           <h1 className="article-title">
             {article.title}
           </h1>
         </div>

            {article.image && (
              <div className="image-wrapper">

                <img
                  src={article.image}
                  className="article-image"
                  alt={article.title}
                  loading="lazy"
                />

                <div className="share-corner" ref={shareRef}>
                  <button
                    className="share-btn"
                    onClick={(e)=>{
                      e.stopPropagation();
                      setOpenShare(prev=>!prev);
                    }}
                  >
                    ↗ Share
                  </button>

                  {openShare && (
                    <div className="share-dropdown">
                      <div onClick={() => share("facebook")}>Facebook</div>
                      <div onClick={() => share("twitter")}>Twitter</div>
                      <div onClick={() => share("whatsapp")}>WhatsApp</div>
                      <div onClick={() => share("email")}>Email</div>
                      <hr />
                      <div onClick={copyLink}>Copy link</div>
                    </div>
                  )}

                </div>

              </div>
            )}

            {/* ✅ UPDATED ARTICLE CONTENT WITH 2 ADS */}
            <div className="article-content">
              {paragraphs.map((para, index) => (
                <div key={index}>
                  <p>{para}</p>

                  {/* Mid Article Ad (after 8th paragraph) */}
                  {index === 7 && (
                    <div className="mid-article-ad">
                      <ins
                        className="adsbygoogle"
                        style={{ display: "block" }}
                        data-ad-client="ca-pub-xxxxxxxxxxxxx"
                        data-ad-slot="7777777777"
                        data-ad-format="auto"
                        data-full-width-responsive="true"
                      ></ins>
                    </div>
                  )}

                  {/* Last Paragraph Ad */}
                  {index === paragraphs.length - 1 && (
                    <div className="mid-article-ad">
                      <ins
                        className="adsbygoogle"
                        style={{ display: "block" }}
                        data-ad-client="ca-pub-xxxxxxxxxxxxx"
                        data-ad-slot="8888888888"
                        data-ad-format="auto"
                        data-full-width-responsive="true"
                      ></ins>
                    </div>
                  )}

                </div>
              ))}
            </div>

          </div>

          <aside className="article-sidebar">
            <div className="ad-300x600">
              <ins className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-xxxxxxxxxxxxx"
                data-ad-slot="3333333333"
                data-ad-format="auto"
                data-full-width-responsive="false">
              </ins>
            </div>
          </aside>

        </div>
      </div>
    </>
  );
}