import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { supabase } from "../supabaseClient";
import { Helmet } from "react-helmet-async";
import "./technology-article.css";

export default function TechnologyArticle() {

  const { slug } = useParams();   // changed from id → slug

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openShare, setOpenShare] = useState(false);

  const shareRef = useRef(null);

  const url = window.location.href;

  /* ================= ARTICLE LOAD ================= */

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

  }, [slug]);  // changed from id → slug

  /* ================= ADS INIT ================= */

  useEffect(() => {

    if (!article) return;

    setTimeout(() => {

      try {

        if (window.adsbygoogle) {
          window.adsbygoogle.push({});
          window.adsbygoogle.push({});
          window.adsbygoogle.push({});
        }

      } catch (e) {
        console.log("Ad load error:", e);
      }

    }, 900);

  }, [article]);

  /* ================= SHARE CLOSE ================= */

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

  if (loading)
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  if (!article)
    return <h2 style={{ textAlign: "center" }}>Article not found</h2>;

  /* ================= SHARE ================= */

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

  /* ================= ARTICLE CONTENT ================= */

  const paragraphs = article.content
    ? article.content.split("\n")
    : [];

  return (
    <>
      <Helmet>

        <title>{article.title} | ArenaPulse</title>

        <meta name="description"
          content={article.summary || article.title}
        />

        <meta property="og:title" content={article.title}/>
        <meta property="og:description" content={article.summary}/>
        <meta property="og:image" content={article.image}/>
        <meta property="og:url" content={url}/>
        <meta property="og:type" content="article"/>

      </Helmet>

      <div className="technology-article-page">

        <div className="article-layout">

          {/* ========= MAIN ARTICLE ========= */}

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

            {/* IMAGE */}

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

                      <div onClick={()=>share("facebook")}>Facebook</div>
                      <div onClick={()=>share("twitter")}>Twitter</div>
                      <div onClick={()=>share("whatsapp")}>WhatsApp</div>
                      <div onClick={()=>share("email")}>Email</div>

                      <hr/>

                      <div onClick={copyLink}>Copy link</div>

                    </div>
                  )}

                </div>

              </div>
            )}

            {/* CONTENT WITH ADS */}

            <div className="article-content">

              {paragraphs.map((para,index)=>(
                <div key={index}>

                  <div
                    dangerouslySetInnerHTML={{__html: para}}
                  />

                  {/* MID ARTICLE AD */}
                  {index === 7 && (
                    <div className="mid-article-ad">
                      <ins
                        className="adsbygoogle"
                        style={{
                          display:"block",
                          width:"100%",
                          height:"90px"
                        }}
                        data-ad-client="ca-pub-xxxxxxxxxxxxx"
                        data-ad-slot="3333333333"
                        data-ad-format="horizontal"
                        data-full-width-responsive="true"
                      />
                    </div>
                  )}

                  {/* LAST ARTICLE AD */}
                  {index === paragraphs.length-1 && (
                    <div className="mid-article-ad">
                      <ins
                        className="adsbygoogle"
                        style={{
                          display:"block",
                          width:"100%",
                          height:"90px"
                        }}
                        data-ad-client="ca-pub-xxxxxxxxxxxxx"
                        data-ad-slot="4444444444"
                        data-ad-format="horizontal"
                        data-full-width-responsive="true"
                      />
                    </div>
                  )}

                </div>
              ))}

            </div>

          </div>

          {/* ========= SIDEBAR ========= */}

         <aside className="article-sidebar">
            <div className="ad-square-stack">

              <div className="ad-300x250">
                <ins className="adsbygoogle"
                  style={{ display: "block", width: "300px", height: "250px" }}
                  data-ad-client="ca-pub-xxxxxxxxxxxxx"
                  data-ad-slot="1111111111"
                  data-ad-format="rectangle"
                  data-full-width-responsive="false">
                </ins>
              </div>

              <div className="sidebar-affiliate-box">
                 <a href="YOUR_AFFILIATE_LINK" target="_blank" rel="noopener noreferrer">
                   <img
                     src="YOUR_AFFILIATE_IMAGE_URL"
                     alt="affiliate banner"
                     style={{ width: "100%", height: "100%", objectFit: "cover" }}
                   />
                 </a>
               </div>

            </div>
          </aside>
        </div>

      </div>
    </>
  );
}