import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL || "https://hitegkdaplzdbjgbggsz.supabase.co",
  process.env.SUPABASE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpdGVna2RhcGx6ZGJqZ2JnZ3N6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTc5ODQ1MiwiZXhwIjoyMDg3Mzc0NDUyfQ.yOXsvREtG09TAKETVSr0-QeAjL_De5yvV33QPVpSdCY"
);

export default async function handler(req, res) {
  try {
    const { data, error } = await supabase
      .from("articles")
      .select("id, slug, created_at")
      .order("created_at", { ascending: false });

    if (error) throw error;

    const baseUrl = "https://arenapulse.site";

    const urls = data.map(article => `
      <url>
        <loc>${baseUrl}/article/${article.slug || article.id}</loc>
        <lastmod>${new Date(article.created_at).toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>
    `).join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>${baseUrl}</loc>
          <changefreq>daily</changefreq>
          <priority>1.0</priority>
        </url>
        ${urls}
      </urlset>
    `;

    res.setHeader("Content-Type", "application/xml");
    res.status(200).send(sitemap);

  } catch (err) {
    console.error("Sitemap generation error:", err);
    res.status(500).send("Error generating sitemap");
  }
}