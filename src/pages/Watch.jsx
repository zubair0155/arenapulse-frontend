import { useSearchParams, useNavigate } from "react-router-dom";
import "./watch.css";

export default function Watch() {
  const [params] = useSearchParams();
  const navigate = useNavigate(); // add useNavigate
  const src = params.get("src");

  if (!src) return <div className="watch-page">No channel selected</div>;

  // Extract YouTube video ID
  let videoId = null;
  try {
    const url = new URL(src);
    videoId = url.searchParams.get("v");
  } catch {
    return <div className="watch-page">Invalid stream</div>;
  }

  return (
    <div className="watch-page">
      <aside className="ad-right">
        {/* Small Back Button */}
        <button className="small-back-button" onClick={() => navigate(-1)}>
        ← Back
        </button>
        <div className="ad-box">Google Ad 300x600</div>
      </aside>

      <div className="player-container">
        <iframe
          className="video-player"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0`}
          title="Live Stream"
          frameBorder="0"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

    </div>
  );
}