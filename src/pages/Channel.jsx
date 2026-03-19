import React from "react";
import { Link } from "react-router-dom";
import "./channels.css";

export default function Channels() {
const channels = [
    { name: "Al Jazeera English", id: "aljazeera", url: "https://www.youtube.com/watch?v=gCNeDWCI0vo" },
    { name: "Al Jazeera Arabic", id: "aljazeeraa", url: "https://www.youtube.com/watch?v=bNyUyrR0PHo" },
    { name: "DW News", id: "dw", url: "https://www.youtube.com/watch?v=LuKwFajn37U" },
    { name: "Sky News", id: "sky", url: "https://www.youtube.com/watch?v=YDvsBbKfLPA" },
    { name: "TRT News", id: "trt", url: "https://www.youtube.com/watch?v=ABfFhWzWs0s" },
    { name: "Euro News", id: "euro", url: "https://www.youtube.com/watch?v=pykpO5kQJ98" },
    { name: "France 24", id: "france24", url: "https://www.youtube.com/watch?v=Ap-UM1O9RBU" },
    { name: "NHK News", id: "nhk", url: "https://www.youtube.com/watch?v=f0lYkdA-Gtw" },
    { name: "ABC News (Aus)", id: "abc", url: "https://www.youtube.com/watch?v=vOTiJkg1voo" },
    { name: "Geo News", id: "geo", url: "https://www.youtube.com/watch?v=_FwympjOSNE" },
    { name: "Bloomberg", id: "bloomberg", url: "https://www.youtube.com/watch?v=iEpJwprxDdk" },
    { name: "Sport", id: "sport", url: "https://www.youtube.com/watch?v=SK2aBwz97pE" },
    
  ];

  return (
    <div className="channels-page">
      <div className="channels-wrapper">
        <div className="channels-main">

          <div className="channels-grid">
            {channels.map((c) => (
              <Link
                key={c.id}
                to={`/watch/${c.id}?src=${encodeURIComponent(c.url)}`}
                className="channel-card"
              >
                <div className="channel-thumb" style={{ backgroundImage: `url(${c.thumb})` }} />
                <div className="channel-body">
                  <div className="channel-title">{c.name}</div>
                  <div className="channel-desc">LIVE</div>
                </div>
              </Link>
            ))}
          </div>
          <aside className="channels-ad">
            <div className="ad-300x600">300 x 600 Ad</div>
          </aside>
        </div>
      </div>
    </div>
  );
}