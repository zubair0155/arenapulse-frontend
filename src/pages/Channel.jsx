import React from "react";
import { Link } from "react-router-dom";
import "./channels.css";

export default function Channels() {
const channels = [
    { name: "BBC News", id: "bbc", thumb: "https://i.ytimg.com/vi/upYh1_Z4v7A/hqdefault.jpg" },
    { name: "CNN", id: "cnn", thumb: "https://i.ytimg.com/vi/tagc4rN6cUU/hqdefault.jpg" },
    { name: "Al Jazeera English", id: "aljazeera", url: "https://www.youtube.com/watch?v=gCNeDWCI0vo" },
    { name: "Sky News", id: "skyn", url: "hhttps://www.youtube.com/watch?v=YDvsBbKfLPA" },
    { name: "France 24", id: "france24", url: "https://www.youtube.com/watch?v=Ap-UM1O9RBU" },
    { name: "DW News", id: "dw", url: "https://www.youtube.com/watch?v=LuKwFajn37U" },
    { name: "NBC News", id: "nbc", url: "https://www.youtube.com/watch?v=XQC-jT94o0Y" },
    { name: "TRT News", id: "guardian", url: "https://www.youtube.com/watch?v=ABfFhWzWs0s" },
    { name: "NHK News", id: "rt", url: "https://www.youtube.com/watch?v=f0lYkdA-Gtw" },
    { name: "Euro news", id: "cna", url: "https://www.youtube.com/watch?v=pykpO5kQJ98" },
    { name: "Bloomberg", id: "bloomberg", url: "https://www.youtube.com/watch?v=iEpJwprxDdk" },
    { name: "Sport", id: "abc", url: "https://www.youtube.com/watch?v=SK2aBwz97pE" },
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