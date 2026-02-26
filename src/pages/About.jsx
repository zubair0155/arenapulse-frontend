import React from "react";
import "./about.css"; // You can create a CSS file for styling

export default function About() {
  return (
    <div className="about-page">
      <h1>About ArenaPulse</h1>

      <section className="about-info">
        <p>
          Welcome to <strong>ArenaPulse</strong>! We provide live news and sports channels directly on our website.
        </p>
        <p>
          Our channels include:
          <ul>
            <li>Live News Channel (YouTube embedded)</li>
            <li>Live Sports Channel (YouTube embedded)</li>
          </ul>
        </p>

        <h2>Contact</h2>
        <p>Email: <a href="https://mail.google.com/">yasir.k000777@gmail.com</a></p>
        <p>Phone: +123-456-7890</p>

        <h2>Articles</h2>
        <p>
          We also provide daily articles including:
          <ul>
            <li>Sports news (1–3 articles per day)</li>
            <li>Breaking news</li>
            <li>Stock market updates</li>
          </ul>
        </p>
      </section>
    </div>
  );
}