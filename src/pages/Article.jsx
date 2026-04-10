import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { supabase } from "../supabaseClient";
import { Helmet } from "react-helmet-async";
import "./article.css";

export default function Article() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openShare, setOpenShare] = useState(false);
  const shareRef = useRef(null);

  const url = window.location.href;

  useEffect(() => {
    const fetchArticle = async () => {
      const { data, error } = await supabase
        .from("articles")
        .select(
          "id,title,summary,content,image,position,created_at,slug,author"
        )
        .eq("slug", slug)
        .single();

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      setArticle(data);
      setLoading(false);
    };

    fetchArticle();
  }, [slug]);

  // ✅ Adsterra Social Bar
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://pl29090120.profitablecpmratenetwork.com/3d/21/15/3d2115ae1266f8ee58e11784779cbff0.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
// Adsterra code finished

  useEffect(() => {
    if (!article) return;

    const timer = setTimeout(() => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {}
    }, 800);

    return () => clearTimeout(timer);
  }, [article]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (shareRef.current && !shareRef.current.contains(e.target)) {
        setOpenShare(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  if (!article) return <h2 style={{ textAlign: "center" }}>Article not found</h2>;

  const paragraphs = article.content ? article.content.split("</p>") : [];

  const share = (type) => {
    const text = article.title + " " + url;

    if (type === "facebook")
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);

    if (type === "twitter")
      window.open(`https://twitter.com/intent/tweet?text=${text}`);

    if (type === "whatsapp")
      window.open(`https://api.whatsapp.com/send?text=${text}`);

    if (type === "email")
      window.open(`mailto:?subject=${article.title}&body=${text}`);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert("Link copied!");
    } catch {
      prompt("Copy this link:", url);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div>
      <Helmet>
        <title>{article.title} | ArenaPulse</title>

        <meta
          name="description"
          content={article.summary || "Latest news from ArenaPulse"}
        />

        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.summary} />
        <meta property="og:image" content={article.image} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />

        <meta property="article:published_time" content={article.created_at} />
        <meta property="article:author" content="ArenaPulse" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.summary} />
        <meta name="twitter:image" content={article.image} />

        <link rel="canonical" href={url} />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": url,
            },
            headline: article.title,
            image: [article.image],
            datePublished: article.created_at,
            dateModified: article.created_at,
            author: {
              "@type": "Organization",
              name: "ArenaPulse",
            },
            publisher: {
              "@type": "Organization",
              name: "ArenaPulse",
              logo: {
                "@type": "ImageObject",
                url: "https://arenapulse.site/logo.png",
              },
            },
            description: article.summary,
          })}
        </script>
      </Helmet>

      <article className="news-article-page">
        <div className="article-layout">
          <div className="article-main">
            <div className="title-section">
              <button className="back-btn" onClick={() => window.history.back()}>
                ← Back
              </button>
              <h1 className="article-title">{article.title}</h1>
              <div className="article-meta">
                <span>By {article.author || "Zubair.K"}</span>
                <span className="article-dot"> - </span>
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
                    aria-label="Share article"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenShare(!openShare);
                    }}
                  >
                    ↗ Share
                  </button>

                  {openShare && (
                    <div className="share-dropdown" role="menu">
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

            <div className="article-content">
              {paragraphs.map((para, index) => (
                <div key={index}>
                  <p dangerouslySetInnerHTML={{ __html: para }} />

                  {index === 0 && (
                    <div className="mid-article-ad">
                      <ins
                        className="adsbygoogle"
                        style={{ display: "block", width: "100%", height: "250px" }}
                        data-ad-client="ca-pub-xxxxxxxxxxxxx"
                        data-ad-slot="7777777777"
                        data-ad-format="rectangle"
                      ></ins>
                    </div>
                  )}

                  {index === paragraphs.length - 4 && (
                    <div className="mid-article-ad">
                      <ins
                        className="adsbygoogle"
                        style={{ display: "block", width: "100%", height: "250px" }}
                        data-ad-client="ca-pub-xxxxxxxxxxxxx"
                        data-ad-slot="8888888888"
                        data-ad-format="rectangle"
                      ></ins>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <aside className="article-sidebar">
            <div className="ad-300x600">
              <ins
                className="adsbygoogle"
                style={{ display: "block", width: "300px", height: "600px" }}
                data-ad-client="ca-pub-xxxxxxxxxxxxx"
                data-ad-slot="3333333333"
              ></ins>
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
}