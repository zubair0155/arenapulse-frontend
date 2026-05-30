import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { supabase } from "../supabaseClient";
import { Helmet } from "react-helmet-async";
import "./technology-article.css";

export default function TechnologyArticle() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openShare, setOpenShare] = useState(false);
  const shareRef = useRef(null);
  const url = window.location.href;

  useEffect(() => {
    const loadArticle = async () => {
      try {
        let { data, error } = await supabase
          .from("articles")
          .select("*")
          .eq("slug", slug)
          .single();

        if (!data) {
          const fallback = await supabase
            .from("articles")
            .select("*")
            .eq("id", slug)
            .single();
          data = fallback.data;
          error = fallback.error;
        }

        if (error) throw error;
        setArticle(data);
        setLoading(false);

      } catch (err) {
        console.error("Article Load Error:", err);
        setLoading(false);
      }
    };
    loadArticle();
  }, [slug]);

 // ✅ FIXED ADSTERRA (WORKING FOR ALL ADS)
  useEffect(() => {
    if (!article) return;

    const loadAd = (id, key, width, height, delay) => {
      setTimeout(() => {
        const container = document.getElementById(id);
        if (!container) return;

        container.innerHTML = "";

        window.atOptions = {
          key: key,
          format: "iframe",
          height: height,
          width: width,
          params: {},
        };

        const script = document.createElement("script");
        script.src = `https://www.highperformanceformat.com/${key}/invoke.js`;
        script.async = true;

        container.appendChild(script);
      }, delay);
    };

    // 🔥 In-article ads
    loadAd("adsterra-1", "9fa451a1db5818716decec8034cb2a5d", 300, 250, 800);
    loadAd("adsterra-2", "9fa451a1db5818716decec8034cb2a5d", 300, 250, 1800);

    // 🔥 Sidebar ad
    loadAd("adsterra-side", "3068b0afa2c3fa20225a0b311dab47de", 160, 600, 2500);
  }, [article]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (shareRef.current && !shareRef.current.contains(e.target)) {
        setOpenShare(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  if (!article) return <h2 style={{ textAlign: "center" }}>Article not found</h2>;

  const paragraphs = article.content ? article.content.split("</p>") : [];

  const share = (type) => {
    const text = article.title + " " + url;
    if (type === "facebook") window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
    if (type === "twitter") window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
    if (type === "whatsapp") window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
    if (type === "email") window.open(`mailto:?subject=${article.title}&body=${text}`);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert("Link copied!");
    } catch {
      prompt("Copy this link:", url);
    }
  };

  // ✅ ADDED DATE FORMATTER
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  return (
    <>
      <Helmet>
        <title>{article.title} | ArenaPulse</title>
        <meta name="description" content={article.summary || article.title} />
        <meta property="og:title" content={article.title}/>
        <meta property="og:description" content={article.summary}/>
        <meta property="og:image" content={article.image}/>
        <meta property="og:url" content={url}/>
        <meta property="og:type" content="article"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content={article.title}/>
        <meta name="twitter:description" content={article.summary}/>
        <meta name="twitter:image" content={article.image}/>
        <link rel="canonical" href={url}/>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "mainEntityOfPage": { "@type": "WebPage", "@id": url },
            "headline": article.title,
            "image": [article.image],
            "datePublished": article.created_at,
            "dateModified": article.created_at,
            "author": { "@type": "Organization", "name": "ArenaPulse" },
            "publisher": {
              "@type": "Organization",
              "name": "ArenaPulse",
              "logo": { "@type": "ImageObject", "url": "https://arenapulse.site/logo.png" }
            },
            "description": article.summary || article.title
          })}
        </script>
      </Helmet>

           {/* TOP AFFILIATE */}
      <div className="top-affiliate-banner">
        <a href="https://www.digistore24.com/redir/680231/zubair0155/" target="_blank" rel="noopener noreferrer">
          <img src="https://hitegkdaplzdbjgbggsz.supabase.co/storage/v1/object/public/Ads-image/7-AI.jpg" alt="Affiliate Banner" />
        </a>
      </div>

      <div className="technology-article-page">
        <div className="article-layout">
          <div className="article-main">
            <div className="title-section">
              <button className="back-btn" onClick={() => window.history.back()}>← Back</button>
              <h1 className="article-title">{article.title}</h1>

              {/* ✅ ADDED AUTHOR + DATE */}
              <div className="tech-meta">
                <span>By {article.author || "Zubair.K"}</span>
                <span className="tech-dot"> - </span>
                <span>{formatDate(article.created_at)}</span>
              </div>

            </div>

            {article.image && (
              <div className="image-wrapper">

                <img
                  src={article.image}
                  className="article-image"
                  alt={article.title}
                  loading="lazy"
                  decoding="async"
                  fetchpriority="high"
                />
                <div className="share-corner" ref={shareRef}>
                  <button
                    className="share-btn"
                    onClick={(e) => { e.stopPropagation(); setOpenShare(prev => !prev); }}
                  >↗ Share</button>

                  {openShare && (
                    <div className="share-dropdown">
                      <div onClick={() => share("facebook")}>Facebook</div>
                      <div onClick={() => share("twitter")}>Twitter</div>
                      <div onClick={() => share("whatsapp")}>WhatsApp</div>
                      <div onClick={() => share("email")}>Email</div>
                      <hr/>
                      <div onClick={copyLink}>Copy link</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="article-content">
              {paragraphs.map((para, index) => (
                <div key={index}>
                  <div dangerouslySetInnerHTML={{ __html: para }} />

         {index === Math.floor(paragraphs.length / 70) && 
          <div className="technology-article-mid-affiliate-banner">
               <a href="https://www.digistore24.com/redir/670693/zubair0155/" target="_blank" rel="noopener noreferrer">
                  <img src="https://hitegkdaplzdbjgbggsz.supabase.co/storage/v1/object/public/Ads-image/Trading-Chart.jpg" alt="Affiliate Banner" /></a>
          </div>
             }

         {index === paragraphs.length - 8 && (
           <div className="technology-article-mid-affiliate-banner">
               <a href="https://www.checkout-ds24.com/redir/615550/zubair0155/" target="_blank" rel="noopener noreferrer">
                 <img src="https://hitegkdaplzdbjgbggsz.supabase.co/storage/v1/object/public/Ads-image/Backlink.jpg" alt="Affiliate Banner" /></a>
           </div>
              )}
                </div>
              ))}
            </div>
          </div>
           {/* ✅ SIDEBAR FIXED */}
          <aside className="article-sidebar">
            <div className="ad-300x600">
              <div id="adsterra-side"></div>
            </div>
          </aside>
      </div>
    </div>
    </>
  );
}