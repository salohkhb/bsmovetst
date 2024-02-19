// pages/api/sitemap.js

import fs from "fs";
import path from "path";
import Routes from "../../helpers/routes";

const generateSitemap = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_URL; // Replace with your website's base URL
  const currentDate = new Date().toISOString();

  const generateUrl = (path) => `
    <url>
      <loc>${baseUrl}${path}</loc>
      <lastmod>${currentDate}</lastmod>
    </url>
  `;

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${Object.values(Routes).map(generateUrl).join("")}
    </urlset>`;
  const filePath = path.resolve("./public/sitemap.xml");

  // Remove any existing file
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  fs.writeFileSync(filePath, sitemap);

  return filePath;
};

export default async (req, res) => {
  try {
    const filePath = await generateSitemap();

    // Use res.setHeader to set the appropriate content type
    res.setHeader("Content-Type", "application/xml");

    // Use fs.createReadStream to stream the file directly to the response
    fs.createReadStream(filePath).pipe(res);
  } catch (error) {
    console.error("Error generating sitemap:", error);
    res.status(500).end();
  }
};
