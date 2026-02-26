import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import "./watch.css";

export default function Watch() {
  const { id } = useParams();
  const videoRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const src = `http://localhost:5000/stream/${id}`;

    if (!id) {
      setError("No channel selected");
      return;
    }

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.ERROR, function (event, data) {
        setError("Stream error");
      });
    } else {
      video.src = src;
      video.addEventListener("error", () => setError("Stream error"));
    }
  }, [id]);

  if (error) {
    return <div className="watch-page">{error}</div>;
  }

  return (
    <div className="watch-page">
      <aside className="ad-right">
        <div className="ad-box">Google Ad 300x600</div>
      </aside>

      <div className="player-container">
        <video
          ref={videoRef}
          controls
          autoPlay
          playsInline
          className="video-player"
        />
      </div>
    </div>
  );
}
