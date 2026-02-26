import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("news");
  const [isHeadline, setIsHeadline] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const publishArticle = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("Publishing article...");

    try {
      const { error } = await supabase.from("articles").insert([
        {
          title,
          summary,
          image,
          category,
          is_headline: isHeadline
        }
      ]);

      if (error) throw error;

      setMsg("✅ Article published successfully!");

      setTitle("");
      setSummary("");
      setImage("");
      setIsHeadline(false);

      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      console.error(err);
      setMsg("❌ Failed to publish article");
    }

    setLoading(false);
  };

  return (
    <div style={{
      maxWidth: "800px",
      margin: "50px auto",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "12px",
      backgroundColor: "#fdfdfd"
    }}>
      <h1>Admin Dashboard – Publish Article</h1>

      <form onSubmit={publishArticle} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <input
          type="text"
          placeholder="Article Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Summary (homepage preview)"
          value={summary}
          onChange={e => setSummary(e.target.value)}
          rows={4}
          required
        />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={e => setImage(e.target.value)}
          required
        />

        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="news">News</option>
          <option value="sports">Sports</option>
        </select>

        <label style={{ fontWeight: 500 }}>
          <input
            type="checkbox"
            checked={isHeadline}
            onChange={(e) => setIsHeadline(e.target.checked)}
          />{" "}
          Mark as Headline (Top 3)
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Publishing..." : "Publish Article"}
        </button>
      </form>

      <p>{msg}</p>

      <p style={{ marginTop: "20px" }}>
        <a href="/">Go to Homepage</a>
      </p>
    </div>
  );
}