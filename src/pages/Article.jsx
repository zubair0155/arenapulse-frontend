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

  /* -------- LOAD ARTICLE -------- */
  useEffect(() => {

    const fetchArticle = async () => {

      const { data, error } = await supabase
         .from("articles")
         .select("id,title,summary,content,image,position,created_at,slug")
         .eq("slug", slug)   // ✅ query by slug
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

  }, [slug]); // ✅ use slug here

  /* -------- LOAD ADS -------- */
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


  /* -------- CLOSE SHARE -------- */
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


  /* -------- SPLIT PARAGRAPHS -------- */
  const paragraphs = article.content
    ? article.content.split("\n")
    : [];


  /* -------- SHARE -------- */
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
    await navigator.clipboard.writeText(url);
    alert("Link copied!");
  };


  return (
    <>
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

      </Helmet>

      {/* TOP AFFILIATE */}
      <div className="top-affiliate-banner">
        <a href="YOUR_AFFILIATE_LINK" target="_blank" rel="noopener noreferrer">
          <img src="YOUR_BANNER_IMAGE_URL" alt="Affiliate Banner" />
        </a>
      </div>

      <div className="news-article-page">

        <div className="article-layout">

          {/* MAIN ARTICLE */}
          <div className="article-main">

            <div className="title-section">

              <button
                className="back-btn"
                onClick={() => window.history.back()}
              >
                ← Back
              </button>

              <h1 className="article-title">{article.title}</h1>

            </div>

            {/* IMAGE */}
            {article.image && (

              <div className="image-wrapper">

                <img
                  src={article.image}
                  className="article-image"
                  alt={article.title}
                />

                {/* SHARE BUTTON */}
                <div className="share-corner" ref={shareRef}>

                  <button
                    className="share-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenShare(!openShare);
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

            {/* ARTICLE CONTENT */}
            <div className="article-content">

              {paragraphs.map((para, index) => (

                <div key={index}>

                  <p dangerouslySetInnerHTML={{ __html: para }} />

                  {/* MID ARTICLE AD AFTER HALF */}
                  {index === Math.floor(paragraphs.length / 2) && (
                    <div className="mid-article-ad">

                      <ins
                        className="adsbygoogle"
                        style={{ display: "block", width: "100%", height: "90px" }}
                        data-ad-client="ca-pub-xxxxxxxxxxxxx"
                        data-ad-slot="7777777777"
                        data-ad-format="horizontal"
                      ></ins>

                    </div>
                  )}

                  {/* LAST ARTICLE AD */}
                  {index === paragraphs.length - 1 && (
                    <div className="mid-article-ad">

                      <ins
                        className="adsbygoogle"
                        style={{ display: "block", width: "100%", height: "90px" }}
                        data-ad-client="ca-pub-xxxxxxxxxxxxx"
                        data-ad-slot="8888888888"
                        data-ad-format="horizontal"
                      ></ins>

                    </div>
                  )}

                </div>

              ))}

            </div>

          </div>

          {/* SIDEBAR AD */}
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

      </div>

    </>
  );
}