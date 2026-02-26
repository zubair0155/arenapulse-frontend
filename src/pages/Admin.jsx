import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function Admin() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("news");
  const [type, setType] = useState("normal");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // DELETE EXPIRED ARTICLES
  const cleanExpired = async () => {
    const now = Date.now();

    const { data, error } = await supabase
      .from("articles")
      .select("*");

    if (error) {
      console.error(error);
      return;
    }

    for (const article of data) {
      if (article.expires_at && article.expires_at < now) {
        await supabase
          .from("articles")
          .delete()
          .eq("id", article.id);
      }
    }
  };

  // PUBLISH ARTICLE
  const publish = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("Publishing...");

    try {
      await cleanExpired();

      const now = Date.now();

      const expiryTime =
        type === "headline"
          ? now + 12 * 60 * 60 * 1000
          : now + 24 * 60 * 60 * 1000;

      const { error } = await supabase
        .from("articles")
        .insert([
          {
            title,
            summary,
            content,
            image,
            category,
            position: type,
            created_at: new Date().toISOString(),
            expires_at: expiryTime
          }
        ]);

      if (error) throw error;

      setMsg("✅ Article published successfully");

      setTitle("");
      setSummary("");
      setContent("");
      setImage("");

    } catch (err) {
      console.error(err);
      setMsg("❌ Failed to publish");
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto" }}>
      <h1>ArenaPulse – Admin Panel</h1>

      <form
        onSubmit={publish}
        style={{ display: "flex", flexDirection: "column", gap: "14px" }}
      >

        <input
          placeholder="Article Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Short Summary (homepage text)"
          rows="4"
          value={summary}
          onChange={e => setSummary(e.target.value)}
          required
        />

        <textarea
          placeholder="Full Article Content"
          rows="10"
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />

        <input
          placeholder="Image URL (Unsplash link)"
          value={image}
          onChange={e => setImage(e.target.value)}
          required
        />

        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="news">News</option>
          <option value="sports">Sports</option>
          <option value="technology">Technology</option>
        </select>

        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="headline">Headline (12 Hours)</option>
          <option value="normal">Normal News (24 Hours)</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Publishing..." : "Publish Article"}
        </button>
      </form>

      <p>{msg}</p>
    </div>
  );
}