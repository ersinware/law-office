import { formatDateToISOWithOffset, getDashedString } from "$lib/js/common/util.common.js";
import { getAllArticlesForSitemap } from "$lib/js/server/repository/articles.nedb.repository.js";

export async function GET() {
    const { articles, error } = await getAllArticlesForSitemap()

    return new Response(
        `<?xml version="1.0" encoding="UTF-8" ?>
        <urlset
          xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
          xmlns:xhtml="https://www.w3.org/1999/xhtml"
          xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
          xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
          xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
          xmlns:video="https://www.google.com/schemas/sitemap-video/1.1">
            <url>
                <loc>https://mirici.av.tr</loc>
                <lastmod>2024-09-19T17:18:05+03:00</lastmod>
            </url>

            <url>
                <loc>https://mirici.av.tr/hizmetlerimiz</loc>
                <lastmod>2024-09-19T17:18:05+03:00</lastmod>
            </url>

            <url>
                <loc>https://mirici.av.tr/ekibimiz</loc>
                <lastmod>2024-09-19T17:18:05+03:00</lastmod>
            </url>

             <url>
                <loc>https://mirici.av.tr/makaleler</loc>
                <lastmod>2024-09-19T17:18:05+03:00</lastmod>
            </url>

             <url>
                <loc>https://mirici.av.tr/hakkımızda</loc>
                <lastmod>2024-09-19T17:18:05+03:00</lastmod>
            </url>

             <url>
                <loc>https://mirici.av.tr/iletişim</loc>
                <lastmod>2024-09-19T17:18:05+03:00</lastmod>
            </url>

            ${!error ? getArticles(articles) : ''}
        </urlset>`.trim(),
        { headers: { 'Content-Type': 'application/xml' } }
    )
}

function getArticles(articles) {
    let all = ''

    for (const article of articles)
        all += `
            <url>
                <loc>https://mirici.av.tr/makale/${getDashedString(article.title)}</loc>
                <lastmod>${formatDateToISOWithOffset(article.updatedAt)}</lastmod>
            </url>
        `

    return all
}
