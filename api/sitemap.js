import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://hitegkdaplzdbjgbggsz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpdGVna2RhcGx6ZGJqZ2JnZ3N6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTc5ODQ1MiwiZXhwIjoyMDg3Mzc0NDUyfQ.yOXsvREtG09TAKETVSr0-QeAjL_De5yvV33QPVpSdCY"
);

export default async function handler(req, res) {

  const { data, error } = await supabase
    .from("articles")
    .select("id, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return res.status(500).send("Error generating sitemap");
  }

  const baseUrl = "https://yourdomain.com";

  const urls = data.map(article => {
    return `
      <url>
        <loc>${baseUrl}/article/${article.id}</loc>
        <lastmod>${new Date(article.created_at).toISOString()}</lastmod>
      </url>
    `;
  }).join("");

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${baseUrl}</loc>
      </url>
      ${urls}
    </urlset>
  `;

  res.setHeader("Content-Type", "application/xml");
  res.status(200).send(sitemap);
}