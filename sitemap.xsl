<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>XML Sitemap | Future Leaders Parliament (FLP)</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=Montserrat:wght@600;700;800&amp;display=swap" rel="stylesheet" />
        <style type="text/css">
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            background-color: #011c0e;
            color: #FFFFFF;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            font-size: 14px;
            line-height: 1.6;
            padding: 40px 20px;
          }
          .container {
            max-width: 1100px;
            margin: 0 auto;
            background: #022F18;
            border: 1px solid rgba(210, 162, 60, 0.4);
            border-radius: 12px;
            padding: 32px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.5);
          }
          .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 20px;
            padding-bottom: 24px;
            border-bottom: 1px solid rgba(210, 162, 60, 0.3);
          }
          .brand {
            display: flex;
            align-items: center;
            gap: 14px;
          }
          .brand img {
            width: 48px;
            height: 48px;
            object-contain: fit;
          }
          .brand-title {
            font-family: 'Montserrat', sans-serif;
            font-size: 18px;
            font-weight: 800;
            color: #FFFFFF;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .brand-subtitle {
            font-size: 12px;
            font-weight: 700;
            color: #D2A23C;
            text-transform: uppercase;
            letter-spacing: 2px;
          }
          .btn-home {
            display: inline-flex;
            align-items: center;
            padding: 10px 20px;
            background: #D2A23C;
            color: #022F18;
            font-family: 'Montserrat', sans-serif;
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            text-decoration: none;
            border-radius: 4px;
            transition: all 0.2s ease;
          }
          .btn-home:hover {
            background: #FFFFFF;
          }
          .intro {
            margin: 24px 0;
            padding: 16px 20px;
            background: rgba(1, 28, 14, 0.6);
            border-left: 4px solid #D2A23C;
            border-radius: 4px;
          }
          .intro h1 {
            font-family: 'Montserrat', sans-serif;
            font-size: 20px;
            font-weight: 800;
            color: #D2A23C;
            margin-bottom: 6px;
            text-transform: uppercase;
          }
          .intro p {
            color: #CBD5E1;
            font-size: 13px;
          }
          .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 16px;
            margin-bottom: 24px;
          }
          .stat-card {
            background: #011c0e;
            border: 1px solid rgba(210, 162, 60, 0.25);
            padding: 16px;
            border-radius: 8px;
          }
          .stat-label {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #94A3B8;
            margin-bottom: 4px;
          }
          .stat-value {
            font-family: 'Montserrat', sans-serif;
            font-size: 18px;
            font-weight: 700;
            color: #D2A23C;
          }
          .table-wrapper {
            overflow-x: auto;
            border-radius: 8px;
            border: 1px solid rgba(210, 162, 60, 0.25);
          }
          table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
            font-size: 13px;
          }
          th {
            background: #01190D;
            color: #D2A23C;
            font-family: 'Montserrat', sans-serif;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            padding: 14px 16px;
            border-bottom: 1px solid rgba(210, 162, 60, 0.3);
          }
          td {
            padding: 12px 16px;
            border-bottom: 1px solid rgba(210, 162, 60, 0.12);
            color: #E2E8F0;
          }
          tr:hover td {
            background: rgba(210, 162, 60, 0.08);
          }
          a.url-link {
            color: #FFFFFF;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.15s;
          }
          a.url-link:hover {
            color: #D2A23C;
            text-decoration: underline;
          }
          .badge {
            display: inline-block;
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 600;
            background: rgba(210, 162, 60, 0.2);
            color: #D2A23C;
            border: 1px solid rgba(210, 162, 60, 0.35);
          }
          .footer {
            margin-top: 28px;
            text-align: center;
            font-size: 12px;
            color: #94A3B8;
            padding-top: 16px;
            border-top: 1px solid rgba(210, 162, 60, 0.2);
          }
          .footer a {
            color: #D2A23C;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          
          <div class="header">
            <div class="brand">
              <img src="logo.png" alt="FLP Logo" />
              <div>
                <div class="brand-title">Future Leaders Parliament</div>
                <div class="brand-subtitle">Voice of the Next Generation</div>
              </div>
            </div>
            <a href="index.html" class="btn-home">Return to Website &#8594;</a>
          </div>

          <div class="intro">
            <h1>XML Sitemap Index</h1>
            <p>
              This document is generated for search engine bots (Google, Bing, Yahoo) to discover and index all official pages. Below is an interactive, human-readable directory of all live URLs.
            </p>
          </div>

          <div class="stats">
            <div class="stat-card">
              <div class="stat-label">Total Indexed URLs</div>
              <div class="stat-value"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> Pages</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Primary Protocol</div>
              <div class="stat-value">HTTPS / TLS 1.3</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Domain Scope</div>
              <div class="stat-value">afeefulhussain.github.io</div>
            </div>
          </div>

          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th style="width: 50px;">#</th>
                  <th>URL Location</th>
                  <th>Priority</th>
                  <th>Change Frequency</th>
                  <th>Last Modified</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <tr>
                    <td style="color: #94A3B8; font-weight: 600;"><xsl:value-of select="position()"/></td>
                    <td>
                      <a class="url-link">
                        <xsl:attribute name="href">
                          <xsl:value-of select="sitemap:loc"/>
                        </xsl:attribute>
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <td>
                      <span class="badge">
                        <xsl:value-of select="sitemap:priority"/>
                      </span>
                    </td>
                    <td style="text-transform: capitalize; color: #CBD5E1;">
                      <xsl:value-of select="sitemap:changefreq"/>
                    </td>
                    <td style="color: #94A3B8;">
                      <xsl:value-of select="sitemap:lastmod"/>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>

          <div class="footer">
            &#169; 2026 <a href="index.html">Future Leaders Parliament (FLP)</a>. All rights reserved. | Contact: <a href="https://wa.me/923286444392">+92 328 6444392</a>
          </div>

        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
