import React from "react";
import "./about.css";

export default function About() {
  return (
    <div className="about-page">

      <section className="about-info">

        <p>
          Welcome to <strong>ArenaPulse</strong> — your modern digital destination for News, Technology, and Live coverage.
          We deliver timely, reliable, and engaging content to keep you informed in a fast-moving world.
        </p>

        <h2>📰 News Coverage</h2>
        <p>
          ArenaPulse provides daily news updates including breaking news,
          global events, stock market updates, and important national stories.
          Our goal is to present information clearly and responsibly.
        </p>

        <h2>💻 Technology Updates</h2>
        <p>
          Our Technology section covers the latest in innovation, gadgets,
          artificial intelligence, startups, cybersecurity, and digital trends.
          We simplify complex tech topics so everyone can understand and stay ahead.
        </p>

        <h2>📺 Live Channels</h2>
        <p>We provide live streaming directly on our platform, including:</p>
        <ul>
          <li>Live News Channel (YouTube embedded)</li>
          <li>Live Sports Channel (YouTube embedded)</li>
        </ul>

        <h2>📝 Articles We Publish</h2>
        <ul>
          <li>Sports news (1–3 articles per day)</li>
          <li>Breaking news updates</li>
          <li>Stock market insights</li>
          <li>Technology analysis and trends</li>
        </ul>

        <h2>🎯 Our Mission</h2>
        <p>
          At ArenaPulse, we aim to provide accessible, transparent,
          and valuable journalism that informs and empowers our readers.
        </p>

        <h2>📩 Contact</h2>
        <p>
          Email: <a href="mailto:yasir.k000777@gmail.com">
            yasir.k000777@gmail.com
          </a>
        </p>
        <p>Phone: +923355561247</p>

        <p style={{ marginTop: "20px", fontWeight: "bold" }}>
          ArenaPulse – Stay Ahead. Stay Informed.
        </p>

      </section>
    </div>
  );
}